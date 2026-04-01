const { BaziCalculator } = require('./dist/engine');

// 测试1990年5月15日
const calc = new BaziCalculator(1990, 5, 15, 12, 'solar', 'male');
const result = calc.calculatePillars();

console.log('1990年5月15日 八字排盘结果：');
console.log('年柱:', result.data.yearPillar.stem + result.data.yearPillar.branch);
console.log('月柱:', result.data.monthPillar.stem + result.data.monthPillar.branch);
console.log('日柱:', result.data.dayPillar.stem + result.data.dayPillar.branch);
console.log('时柱:', result.data.hourPillar.stem + result.data.hourPillar.branch);