"use strict";
// src/engine/bazi-calculator.ts
// Complete BaZi calculator using lunar-javascript library
// Provides accurate BaZi calculation and full Huangli data
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaziCalculator = void 0;
const lunar_adapter_1 = require("../calendar/lunar-adapter");
class BaziCalculator {
    constructor(year, month, day, hour, calendarType, gender = 'male', isLeapMonth = false) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.hour = hour;
        this.calendarType = calendarType;
        this.gender = gender;
        this.isLeapMonth = isLeapMonth;
    }
    calculatePillars() {
        try {
            // 创建适配器实例
            let adapter;
            if (this.calendarType === 'solar') {
                adapter = new lunar_adapter_1.LunarAdapter(this.year, this.month, this.day, this.hour, 0);
            }
            else {
                adapter = lunar_adapter_1.LunarAdapter.fromLunar(this.year, this.month, this.day, this.hour, this.isLeapMonth);
            }
            // 获取农历日期
            const lunarDate = adapter.getLunarDate();
            // 获取公历日期
            const solarDate = adapter.getSolarDate();
            // 获取八字
            const bazi = adapter.getBaZi();
            // 获取黄历信息
            const huangli = adapter.getHuangli();
            // 获取节气信息
            const currentSolarTerm = adapter.getCurrentSolarTerm();
            const solarTerms = adapter.getSolarTerms(solarDate.year);
            // 获取生肖星座
            const zodiac = adapter.getZodiac();
            // 获取节日
            const holiday = adapter.getHoliday();
            // 计算命理要素
            const nobleman = this.calculateNobleman(bazi.dayMaster);
            const peachBlossom = this.calculatePeachBlossom(bazi.day.zhi);
            const intelligenceStar = this.calculateIntelligenceStar(bazi.day.zhi);
            const skyHorse = this.calculateSkyHorse(bazi.month.zhi);
            // 计算五行分布
            const fiveElementsDistribution = this.calculateFiveElementsDistribution([
                { gan: bazi.year.gan, zhi: bazi.year.zhi },
                { gan: bazi.month.gan, zhi: bazi.month.zhi },
                { gan: bazi.day.gan, zhi: bazi.day.zhi },
                { gan: bazi.hour.gan, zhi: bazi.hour.zhi }
            ]);
            // 确定日主阴阳属性
            const yangStems = ['甲', '丙', '戊', '庚', '壬'];
            const dayMasterNature = yangStems.includes(bazi.dayMaster) ? '阳' : '阴';
            const result = {
                solarDate: {
                    year: solarDate.year,
                    month: solarDate.month,
                    day: solarDate.day,
                    hour: solarDate.hour,
                    formatted: `${solarDate.year}年${solarDate.month}月${solarDate.day}日 ${String(solarDate.hour).padStart(2, '0')}:00`
                },
                lunarDate: {
                    year: lunarDate.year,
                    month: Math.abs(lunarDate.month),
                    day: lunarDate.day,
                    isLeap: lunarDate.isLeap,
                    formatted: `${lunarDate.year}年${lunarDate.isLeap ? '闰' : ''}${Math.abs(lunarDate.month)}月${lunarDate.day}日`
                },
                yearPillar: {
                    stem: bazi.year.gan,
                    branch: bazi.year.zhi,
                    element: bazi.year.ganElement,
                    full: bazi.year.gan + bazi.year.zhi
                },
                monthPillar: {
                    stem: bazi.month.gan,
                    branch: bazi.month.zhi,
                    element: bazi.month.ganElement,
                    full: bazi.month.gan + bazi.month.zhi
                },
                dayPillar: {
                    stem: bazi.day.gan,
                    branch: bazi.day.zhi,
                    element: bazi.day.ganElement,
                    full: bazi.day.gan + bazi.day.zhi
                },
                hourPillar: {
                    stem: bazi.hour.gan,
                    branch: bazi.hour.zhi,
                    element: bazi.hour.ganElement,
                    full: bazi.hour.gan + bazi.hour.zhi
                },
                dayMaster: {
                    gan: bazi.dayMaster,
                    element: bazi.dayMasterElement,
                    nature: dayMasterNature
                },
                fiveElementsDistribution,
                nobleman,
                peachBlossom,
                intelligenceStar,
                skyHorse,
                huangli,
                currentSolarTerm,
                solarTerms,
                zodiac,
                holiday
            };
            return {
                success: true,
                data: result
            };
        }
        catch (error) {
            console.error('八字计算错误:', error);
            return {
                success: false,
                error: '八字计算失败: ' + (error instanceof Error ? error.message : '未知错误')
            };
        }
    }
    // 计算五行分布
    calculateFiveElementsDistribution(pillars) {
        const distribution = {
            '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
        };
        pillars.forEach(pillar => {
            distribution[BaziCalculator.STEM_ELEMENTS[pillar.gan]] += 1;
            distribution[BaziCalculator.BRANCH_ELEMENTS[pillar.zhi]] += 1;
        });
        return distribution;
    }
    // 计算贵人
    calculateNobleman(dayStem) {
        const yangStems = ['甲', '丙', '戊', '庚', '壬'];
        return yangStems.includes(dayStem) ? ['丑', '未'] : ['子', '申'];
    }
    // 计算桃花
    calculatePeachBlossom(dayBranch) {
        const peachMap = {
            '寅': '卯', '申': '卯', '巳': '午', '亥': '午',
            '子': '酉', '午': '酉', '卯': '子', '酉': '子',
            '辰': '戌', '戌': '辰', '丑': '未', '未': '丑'
        };
        return peachMap[dayBranch] || '卯';
    }
    // 计算文昌
    calculateIntelligenceStar(dayBranch) {
        const wenChangMap = {
            '子': '巳', '午': '巳', '丑': '亥', '未': '亥',
            '寅': '卯', '申': '卯', '卯': '酉', '酉': '酉',
            '辰': '子', '戌': '子', '巳': '午', '亥': '午'
        };
        return wenChangMap[dayBranch] || '巳';
    }
    // 计算天马
    calculateSkyHorse(monthBranch) {
        const tianMaMap = {
            '寅': '申', '申': '寅', '巳': '亥', '亥': '巳',
            '丑': '酉', '未': '酉', '辰': '子', '戌': '子'
        };
        return tianMaMap[monthBranch] || '寅';
    }
}
exports.BaziCalculator = BaziCalculator;
// 天干数组
BaziCalculator.HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
// 地支数组
BaziCalculator.EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
// 天干对应的五行
BaziCalculator.STEM_ELEMENTS = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
};
// 地支对应的五行
BaziCalculator.BRANCH_ELEMENTS = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木',
    '辰': '土', '巳': '火', '午': '火', '未': '土',
    '申': '金', '酉': '金', '戌': '土', '亥': '水'
};
exports.default = BaziCalculator;
//# sourceMappingURL=bazi-calculator.js.map