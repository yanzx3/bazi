const { BaziCalculator } = require('./dist/engine');

// 测试多个年份
const testCases = [
  { year: 1982, month: 4, day: 30, hour: 0, desc: '1982年4月30日' },
  { year: 1990, month: 5, day: 15, hour: 12, desc: '1990年5月15日' },
  { year: 2000, month: 1, day: 1, hour: 0, desc: '2000年1月1日' },
  { year: 2024, month: 6, day: 15, hour: 10, desc: '2024年6月15日' },
];

testCases.forEach(tc => {
  const calc = new BaziCalculator(tc.year, tc.month, tc.day, tc.hour, 'solar', 'male');
  const result = calc.calculatePillars();
  
  console.log(`\n${tc.desc}:`);
  console.log(`  年柱: ${result.data.yearPillar.stem}${result.data.yearPillar.branch}`);
  console.log(`  月柱: ${result.data.monthPillar.stem}${result.data.monthPillar.branch}`);
  console.log(`  日柱: ${result.data.dayPillar.stem}${result.data.dayPillar.branch}`);
  console.log(`  时柱: ${result.data.hourPillar.stem}${result.data.hourPillar.branch}`);
});