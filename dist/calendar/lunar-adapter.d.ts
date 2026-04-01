export interface SolarDate {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
}
export interface LunarDate {
    year: number;
    month: number;
    day: number;
    isLeap: boolean;
    yearInGanZhi: string;
    monthInGanZhi: string;
    dayInGanZhi: string;
}
export interface BaZiPillar {
    gan: string;
    zhi: string;
    ganElement: string;
    zhiElement: string;
}
export interface BaZiResult {
    year: BaZiPillar;
    month: BaZiPillar;
    day: BaZiPillar;
    hour: BaZiPillar;
    dayMaster: string;
    dayMasterElement: string;
}
export interface SolarTerm {
    name: string;
    date: Date;
}
export interface HuangliData {
    yi: string[];
    ji: string[];
    pengZu: string[];
    jianChu: string;
    xiongShen: string[];
    jiShen: string[];
    hourFortune: HourFortune[];
}
export interface HourFortune {
    hour: string;
    timeRange: string;
    fortune: '吉' | '凶';
}
export interface ZodiacInfo {
    chineseZodiac: string;
    chineseZodiacElement: string;
    westernZodiac: string;
}
export declare class LunarAdapter {
    private solar;
    private lunar;
    private eightChar;
    constructor(year: number, month: number, day: number, hour?: number, minute?: number);
    getLunarDate(): LunarDate;
    getSolarDate(): SolarDate;
    getBaZi(): BaZiResult;
    getCurrentSolarTerm(): SolarTerm | null;
    getSolarTerms(year: number): SolarTerm[];
    getHuangli(): HuangliData;
    private getHourFortune;
    getZodiac(): ZodiacInfo;
    private getZodiacElement;
    private getWesternZodiac;
    private getGanElement;
    private getZhiElement;
    getHoliday(): string | null;
    static fromLunar(year: number, month: number, day: number, hour?: number, isLeap?: boolean): LunarAdapter;
}
export default LunarAdapter;
