// test-specific.ts
import { BaziCalculator } from './src/engine';

const calculator = new BaziCalculator(1990, 5, 15, 12, 'solar', 'male');
const result = calculator.calculatePillars();

console.log('1990年5月15日12点 八字计算结果:');
console.log('Year:', result.data.yearPillar.stem + result.data.yearPillar.branch);
console.log('Month:', result.data.monthPillar.stem + result.data.monthPillar.branch);
console.log('Day:', result.data.dayPillar.stem + result.data.dayPillar.branch);
console.log('Hour:', result.data.hourPillar.stem + result.data.hourPillar.branch);