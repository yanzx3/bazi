// 验证日柱计算
// 已知：1900年1月1日是甲戌日

function calculateDaysFrom1900(year, month, day) {
  const startDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffTime = targetDate.getTime() - startDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// 1982年4月30日
days = calculateDaysFrom1900(1982, 4, 30);
console.log('从1900年1月1日到1982年4月30日的天数:', days);

// 1900年1月1日是甲戌日（甲=0, 戌=10）
const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

const stemIndex = (0 + days) % 10;
const branchIndex = (10 + days) % 12;

console.log('日柱:', stems[stemIndex] + branches[branchIndex]);

// 验证1990年5月15日
days2 = calculateDaysFrom1900(1990, 5, 15);
console.log('\n从1900年1月1日到1990年5月15日的天数:', days2);
const stemIndex2 = (0 + days2) % 10;
const branchIndex2 = (10 + days2) % 12;
console.log('1990年5月15日日柱:', stems[stemIndex2] + branches[branchIndex2]);