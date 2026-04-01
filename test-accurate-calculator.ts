// test-accurate-calculator.ts
import { BaziCalculator } from './src/engine';

try {
  const calculator = new BaziCalculator(1990, 5, 15, 12, 'male');
  const result = calculator.calculatePillars();
  
  console.log('Accurate BaZi Calculation Result:');
  console.log('Year Pillar:', result.yearPillar.heavenlyStem + result.yearPillar.earthlyBranch);
  console.log('Month Pillar:', result.monthPillar.heavenlyStem + result.monthPillar.earthlyBranch);
  console.log('Day Pillar:', result.dayPillar.heavenlyStem + result.dayPillar.earthlyBranch);
  console.log('Hour Pillar:', result.hourPillar.heavenlyStem + result.hourPillar.earthlyBranch);
  console.log('Day Master:', result.dayMaster.stem, result.dayMaster.element, result.dayMaster.nature);
} catch (error) {
  console.error('Calculation failed:', error);
}