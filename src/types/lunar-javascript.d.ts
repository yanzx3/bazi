// Types declaration for lunar-javascript

declare module 'lunar-javascript' {
  export class Solar {
    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Solar;
    static fromYmd(year: number, month: number, day: number): Solar;
    static fromJulianDay(julianDay: number): Solar;
    
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
    getLunar(): Lunar;
    getJulianDay(): number;
    toYmd(): string;
    toYmdHms(): string;
    toString(): string;
  }

  export class Lunar {
    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Lunar;
    static fromYmd(year: number, month: number, day: number): Lunar;
    
    getYear(): number;
    getMonth(): number;
    getDay(): number;
    getHour(): number;
    getMinute(): number;
    getSecond(): number;
    getSolar(): Solar;
    getYearInGanZhi(): string;
    getMonthInGanZhi(): string;
    getDayInGanZhi(): string;
    getEightChar(): EightChar;
    getYearShengXiao(): string;
    getYearZhi(): string;
    getMonthShengXiao(): string;
    getDayShengXiao(): string;
    getTimeShengXiao(): string;
    getDayYi(): string[];
    getDayJi(): string[];
    getPengZuGan(): string;
    getPengZuZhi(): string;
    getZhiXing(): string;
    getDayXiongSha(): string[];
    getDayJiShen(): string[];
    getTimeYi(): string[];
    getTimeJi(): string[];
    getTimeTianShenLuck(hourZhi: string): string;
    getCurrentJieQi(): JieQi | null;
    getCurrentJie(): JieQi | null;
    getCurrentQi(): JieQi | null;
    getJieQi(name: string): JieQi | null;
    getJieQiList(): string[];
    getJieQiTable(): any;
    getFestivals(): string[];
    getOtherFestivals(): string[];
    getYearInChinese(): string;
    getMonthInChinese(): string;
    getDayInChinese(): string;
  }

  export class EightChar {
    getYear(): string;
    getMonth(): string;
    getDay(): string;
    getTime(): string;
  }

  export class JieQi {
    getName(): string;
    getSolar(): Solar;
    isJie(): boolean;
    isQi(): boolean;
  }
}
