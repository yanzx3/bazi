"use strict";
// src/calendar/lunar-adapter.ts
// Adapter for lunar-javascript library
// Provides BaZi calculation and Huangli (黄历) data
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunarAdapter = void 0;
const lunar_javascript_1 = require("lunar-javascript");
class LunarAdapter {
    constructor(year, month, day, hour = 12, minute = 0) {
        this.solar = lunar_javascript_1.Solar.fromYmdHms(year, month, day, hour, minute, 0);
        this.lunar = this.solar.getLunar();
        this.eightChar = this.lunar.getEightChar();
    }
    // 获取农历日期
    getLunarDate() {
        return {
            year: this.lunar.getYear(),
            month: this.lunar.getMonth(),
            day: this.lunar.getDay(),
            isLeap: this.lunar.getMonth() < 0,
            yearInGanZhi: this.lunar.getYearInGanZhi(),
            monthInGanZhi: this.lunar.getMonthInGanZhi(),
            dayInGanZhi: this.lunar.getDayInGanZhi()
        };
    }
    // 获取公历日期
    getSolarDate() {
        return {
            year: this.solar.getYear(),
            month: this.solar.getMonth(),
            day: this.solar.getDay(),
            hour: this.solar.getHour(),
            minute: this.solar.getMinute()
        };
    }
    // 获取八字四柱
    getBaZi() {
        const yearGZ = this.eightChar.getYear();
        const monthGZ = this.eightChar.getMonth();
        const dayGZ = this.eightChar.getDay();
        const hourGZ = this.eightChar.getTime();
        return {
            year: {
                gan: yearGZ.substring(0, 1),
                zhi: yearGZ.substring(1, 2),
                ganElement: this.getGanElement(yearGZ.substring(0, 1)),
                zhiElement: this.getZhiElement(yearGZ.substring(1, 2))
            },
            month: {
                gan: monthGZ.substring(0, 1),
                zhi: monthGZ.substring(1, 2),
                ganElement: this.getGanElement(monthGZ.substring(0, 1)),
                zhiElement: this.getZhiElement(monthGZ.substring(1, 2))
            },
            day: {
                gan: dayGZ.substring(0, 1),
                zhi: dayGZ.substring(1, 2),
                ganElement: this.getGanElement(dayGZ.substring(0, 1)),
                zhiElement: this.getZhiElement(dayGZ.substring(1, 2))
            },
            hour: {
                gan: hourGZ.substring(0, 1),
                zhi: hourGZ.substring(1, 2),
                ganElement: this.getGanElement(hourGZ.substring(0, 1)),
                zhiElement: this.getZhiElement(hourGZ.substring(1, 2))
            },
            dayMaster: dayGZ.substring(0, 1),
            dayMasterElement: this.getGanElement(dayGZ.substring(0, 1))
        };
    }
    // 获取当前节气
    getCurrentSolarTerm() {
        try {
            const term = this.lunar.getCurrentJieQi();
            if (term) {
                const termSolar = term.getSolar();
                return {
                    name: term.getName(),
                    date: new Date(termSolar.getYear(), termSolar.getMonth() - 1, termSolar.getDay())
                };
            }
            return null;
        }
        catch (error) {
            console.error('Error getting current solar term:', error);
            return null;
        }
    }
    // 获取所有节气（当年）
    getSolarTerms(year) {
        try {
            const terms = [];
            const solarTerms = ['立春', '雨水', '惊蛰', '春分', '清明', '谷雨',
                '立夏', '小满', '芒种', '夏至', '小暑', '大暑',
                '立秋', '处暑', '白露', '秋分', '寒露', '霜降',
                '立冬', '小雪', '大雪', '冬至', '小寒', '大寒'];
            // 遍历全年每一天查找节气
            for (let month = 1; month <= 12; month++) {
                for (let day = 1; day <= 31; day++) {
                    try {
                        const solar = lunar_javascript_1.Solar.fromYmd(year, month, day);
                        const lunar = solar.getLunar();
                        const current = lunar.getCurrentJieQi();
                        if (current) {
                            const termName = current.getName();
                            const termSolar = current.getSolar();
                            // 检查是否是当前这一天
                            if (termSolar.getYear() === year &&
                                termSolar.getMonth() === month &&
                                termSolar.getDay() === day &&
                                solarTerms.includes(termName)) {
                                terms.push({
                                    name: termName,
                                    date: new Date(year, month - 1, day)
                                });
                            }
                        }
                    }
                    catch (e) {
                        // 跳过无效的日期
                    }
                }
            }
            // 按日期排序
            terms.sort((a, b) => a.date.getTime() - b.date.getTime());
            return terms;
        }
        catch (error) {
            console.error('Error getting solar terms:', error);
            return [];
        }
    }
    // 获取黄历宜忌
    getHuangli() {
        try {
            const yi = this.lunar.getDayYi() || [];
            const ji = this.lunar.getDayJi() || [];
            const pengZuGan = this.lunar.getPengZuGan() || '';
            const pengZuZhi = this.lunar.getPengZuZhi() || '';
            const pengZu = [];
            if (pengZuGan)
                pengZu.push(pengZuGan);
            if (pengZuZhi)
                pengZu.push(pengZuZhi);
            const jianChu = this.lunar.getZhiXing() || '';
            const xiongShen = this.lunar.getDayXiongSha() || [];
            const jiShen = this.lunar.getDayJiShen() || [];
            return {
                yi,
                ji,
                pengZu,
                jianChu,
                xiongShen,
                jiShen,
                hourFortune: this.getHourFortune()
            };
        }
        catch (error) {
            console.error('Error getting Huangli data:', error);
            return {
                yi: [],
                ji: [],
                pengZu: [],
                jianChu: '',
                xiongShen: [],
                jiShen: [],
                hourFortune: this.getHourFortune()
            };
        }
    }
    // 获取时辰吉凶（使用传统建除十二神算法）
    getHourFortune() {
        const hours = [
            { zhi: '子', range: '23:00-01:00', index: 0 },
            { zhi: '丑', range: '01:00-03:00', index: 1 },
            { zhi: '寅', range: '03:00-05:00', index: 2 },
            { zhi: '卯', range: '05:00-07:00', index: 3 },
            { zhi: '辰', range: '07:00-09:00', index: 4 },
            { zhi: '巳', range: '09:00-11:00', index: 5 },
            { zhi: '午', range: '11:00-13:00', index: 6 },
            { zhi: '未', range: '13:00-15:00', index: 7 },
            { zhi: '申', range: '15:00-17:00', index: 8 },
            { zhi: '酉', range: '17:00-19:00', index: 9 },
            { zhi: '戌', range: '19:00-21:00', index: 10 },
            { zhi: '亥', range: '21:00-23:00', index: 11 }
        ];
        const zhiList = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        const jianChuList = ['建', '除', '满', '平', '定', '执', '破', '危', '成', '收', '开', '闭'];
        // 吉日：除、危、定、执、成、开
        const goodJianChu = ['除', '危', '定', '执', '成', '开'];
        // 获取日支
        const dayZhi = this.lunar.getDayZhi();
        const dayIndex = zhiList.indexOf(dayZhi);
        return hours.map(h => {
            const hourIndex = h.index;
            // 计算建除（以日支为建，顺行）
            let offset = hourIndex - dayIndex;
            if (offset < 0)
                offset += 12;
            const jianChu = jianChuList[offset];
            // 判断吉凶
            const isGood = goodJianChu.includes(jianChu);
            return {
                hour: h.zhi,
                timeRange: h.range,
                fortune: isGood ? '吉' : '凶'
            };
        });
    }
    // 获取生肖信息
    getZodiac() {
        return {
            chineseZodiac: this.lunar.getYearShengXiao(),
            chineseZodiacElement: this.getZodiacElement(this.lunar.getYearZhi()),
            westernZodiac: this.getWesternZodiac(this.solar.getMonth(), this.solar.getDay())
        };
    }
    // 根据地支获取生肖五行
    getZodiacElement(zhi) {
        const elementMap = {
            '子': '水', '丑': '土', '寅': '木', '卯': '木',
            '辰': '土', '巳': '火', '午': '火', '未': '土',
            '申': '金', '酉': '金', '戌': '土', '亥': '水'
        };
        return elementMap[zhi] || '';
    }
    // 获取西方星座
    getWesternZodiac(month, day) {
        const zodiacDates = [
            { name: '摩羯座', start: [1, 1], end: [1, 19] },
            { name: '水瓶座', start: [1, 20], end: [2, 18] },
            { name: '双鱼座', start: [2, 19], end: [3, 20] },
            { name: '白羊座', start: [3, 21], end: [4, 19] },
            { name: '金牛座', start: [4, 20], end: [5, 20] },
            { name: '双子座', start: [5, 21], end: [6, 21] },
            { name: '巨蟹座', start: [6, 22], end: [7, 22] },
            { name: '狮子座', start: [7, 23], end: [8, 22] },
            { name: '处女座', start: [8, 23], end: [9, 22] },
            { name: '天秤座', start: [9, 23], end: [10, 23] },
            { name: '天蝎座', start: [10, 24], end: [11, 22] },
            { name: '射手座', start: [11, 23], end: [12, 21] },
            { name: '摩羯座', start: [12, 22], end: [12, 31] }
        ];
        for (const zodiac of zodiacDates) {
            const startMonth = zodiac.start[0];
            const startDay = zodiac.start[1];
            const endMonth = zodiac.end[0];
            const endDay = zodiac.end[1];
            if ((month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay)) {
                return zodiac.name;
            }
        }
        return '摩羯座';
    }
    // 天干五行
    getGanElement(gan) {
        const elementMap = {
            '甲': '木', '乙': '木',
            '丙': '火', '丁': '火',
            '戊': '土', '己': '土',
            '庚': '金', '辛': '金',
            '壬': '水', '癸': '水'
        };
        return elementMap[gan] || '';
    }
    // 地支五行
    getZhiElement(zhi) {
        const elementMap = {
            '子': '水', '丑': '土', '寅': '木', '卯': '木',
            '辰': '土', '巳': '火', '午': '火', '未': '土',
            '申': '金', '酉': '金', '戌': '土', '亥': '水'
        };
        return elementMap[zhi] || '';
    }
    // 判断是否为节日
    getHoliday() {
        try {
            const festivals = this.lunar.getFestivals();
            const otherFestivals = this.lunar.getOtherFestivals();
            if (festivals && festivals.length > 0) {
                return festivals[0];
            }
            if (otherFestivals && otherFestivals.length > 0) {
                return otherFestivals[0];
            }
            return null;
        }
        catch (error) {
            return null;
        }
    }
    // 静态方法：从农历创建
    static fromLunar(year, month, day, hour = 12, isLeap = false) {
        const lunarMonth = isLeap ? -month : month;
        const lunar = lunar_javascript_1.Lunar.fromYmdHms(year, lunarMonth, day, hour, 0, 0);
        const solar = lunar.getSolar();
        return new LunarAdapter(solar.getYear(), solar.getMonth(), solar.getDay(), solar.getHour(), 0);
    }
}
exports.LunarAdapter = LunarAdapter;
// 导出类型和类
exports.default = LunarAdapter;
//# sourceMappingURL=lunar-adapter.js.map