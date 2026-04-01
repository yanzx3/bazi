const { BaziCalculator } = require('./dist/engine');

// 测试1982年4月30日
const calc = new BaziCalculator(1982, 4, 30, 0, 'solar', 'male');
const result = calc.calculatePillars();

console.log('1982年4月30日 八字排盘结果：');
console.log('年柱:', result.data.yearPillar.stem + result.data.yearPillar.branch);
console.log('月柱:', result.data.monthPillar.stem + result.data.monthPillar.branch);
console.log('日柱:', result.data.dayPillar.stem + result.data.dayPillar.branch);
console.log('时柱:', result.data.hourPillar.stem + result.data.hourPillar.branch);