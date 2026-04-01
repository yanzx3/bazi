// 调试年柱计算
const year = 1982;
const baseYear = 1984;
const yearDiff = year - baseYear;

console.log('Year:', year);
console.log('BaseYear:', baseYear);
console.log('YearDiff:', yearDiff);

const stemIndex = ((yearDiff % 10) + 10) % 10;
const branchIndex = ((yearDiff % 12) + 12) % 12;

console.log('StemIndex:', stemIndex);
console.log('BranchIndex:', branchIndex);
console.log('Is NaN?:', isNaN(stemIndex), isNaN(branchIndex));

const stems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
const branches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

console.log('Year Pillar:', stems[stemIndex] + branches[branchIndex]);