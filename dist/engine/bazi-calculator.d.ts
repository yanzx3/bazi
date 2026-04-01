import { HuangliData, SolarTerm, ZodiacInfo } from '../calendar/lunar-adapter';
export interface CalculationResult {
    success: boolean;
    data?: CompleteBaZiData;
    error?: string;
}
export interface CompleteBaZiData {
    solarDate: {
        year: number;
        month: number;
        day: number;
        hour: number;
        formatted: string;
    };
    lunarDate: {
        year: number;
        month: number;
        day: number;
        isLeap: boolean;
        formatted: string;
    };
    yearPillar: PillarData;
    monthPillar: PillarData;
    dayPillar: PillarData;
    hourPillar: PillarData;
    dayMaster: {
        gan: string;
        element: string;
        nature: '阳' | '阴';
    };
    fiveElementsDistribution: Record<string, number>;
    nobleman: string[];
    peachBlossom: string;
    intelligenceStar: string;
    skyHorse: string;
    huangli: HuangliData;
    currentSolarTerm: SolarTerm | null;
    solarTerms: SolarTerm[];
    zodiac: ZodiacInfo;
    holiday: string | null;
}
export interface PillarData {
    stem: string;
    branch: string;
    element: string;
    full: string;
}
export declare class BaziCalculator {
    private year;
    private month;
    private day;
    private hour;
    private calendarType;
    private gender;
    private isLeapMonth;
    private static readonly HEAVENLY_STEMS;
    private static readonly EARTHLY_BRANCHES;
    private static readonly STEM_ELEMENTS;
    private static readonly BRANCH_ELEMENTS;
    constructor(year: number, month: number, day: number, hour: number, calendarType: 'solar' | 'lunar', gender?: 'male' | 'female', isLeapMonth?: boolean);
    calculatePillars(): CalculationResult;
    private calculateFiveElementsDistribution;
    private calculateNobleman;
    private calculatePeachBlossom;
    private calculateIntelligenceStar;
    private calculateSkyHorse;
}
export default BaziCalculator;
