// test-simple-calculator.ts
import { BaziCalculator } from './src/engine';

const calculator = new BaziCalculator(1990, 5, 15, 12, 'male');
const result = calculator.calculatePillars();

console.log('Simple BaZi Calculation Result:');
console.log(JSON.stringify(result, null, 2));