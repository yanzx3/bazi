console.log('Testing Simple Calculator directly');
import { BaziCalculator } from './src/engine';

try {
  const calc = new BaziCalculator(1990, 5, 15, 12);
  const result = calc.calculatePillars();
  console.log('Success:', result.yearPillar.heavenlyStem);
} catch (error) {
  console.error('Error:', error);
}