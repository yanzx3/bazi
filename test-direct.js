const { BaziCalculator } = require('./dist/engine');

const calc = new BaziCalculator(1982, 4, 30, 0, 'solar', 'male');
const result = calc.calculatePillars();

console.log('直接调用结果:');
console.log('YearPillar:', JSON.stringify(result.data.yearPillar, null, 2));