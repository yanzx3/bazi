# 八字排盘 API (BaZi Calculator)

AI专用API对接平台 - 八字排盘与小工具

## 功能特性

- **八字排盘**：完整的四柱八字计算（年柱、月柱、日柱、时柱）
- **农历/公历转换**：支持阳历和农历输入，支持闰月
- **黄历数据**：包含宜忌、节气、时辰吉凶、吉神凶煞、彭祖百忌等
- **生肖星座**：中国生肖和西方星座
- **五行分析**：五行分布和日主属性

## 技术栈

- **后端**: Node.js + TypeScript + Express
- **农历计算**: lunar-javascript (MIT License)
- **前端**: HTML + CSS + JavaScript (SPA)

## 在线演示

- **Web界面**: http://223.4.250.128/
- **API端点**: http://223.4.250.128/api/calculate

## API 文档

### POST /api/calculate

计算八字命盘

**请求参数**:
```json
{
  "calendarType": "solar",    // 日历类型: solar(阳历) | lunar(农历)
  "year": 2000,               // 年份: 1900-2100
  "month": 1,                 // 月份: 1-12
  "day": 1,                   // 日期: 1-31
  "hour": 12,                 // 小时: 0-23
  "gender": "male",           // 性别: male | female (可选, 默认male)
  "isLeapMonth": false        // 是否闰月 (农历时可选, 默认false)
}
```

**响应示例**:
```json
{
  "success": true,
  "data": {
    "solarDate": { "year": 2000, "month": 1, "day": 1, "hour": 12, "formatted": "2000年1月1日 12:00" },
    "lunarDate": { "year": 1999, "month": 11, "day": 25, "isLeap": false, "formatted": "1999年11月25日" },
    "yearPillar": { "stem": "己", "branch": "卯", "element": "土", "full": "己卯" },
    "monthPillar": { "stem": "丙", "branch": "子", "element": "火", "full": "丙子" },
    "dayPillar": { "stem": "戊", "branch": "午", "element": "土", "full": "戊午" },
    "hourPillar": { "stem": "戊", "branch": "午", "element": "土", "full": "戊午" },
    "dayMaster": { "gan": "戊", "element": "土", "nature": "阳" },
    "zodiac": { "chineseZodiac": "兔", "westernZodiac": "摩羯座" },
    "huangli": { "yi": [...], "ji": [...], "jianChu": "满", ... }
  }
}
```

### GET /api/solar-terms/{year}

获取指定年份的24节气

**响应**:
```json
{
  "success": true,
  "data": [
    { "name": "立春", "date": "2000-02-04T16:00:00.000Z" },
    ...
  ]
}
```

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建生产版本
npm run build

# 启动服务
npm start
```

## 部署

### 使用 Docker

```bash
docker build -t bazi-api .
docker run -p 3002:3002 bazi-api
```

### 使用 PM2

```bash
npm install -g pm2
pm2 start dist/index.js --name bazi-api
pm2 save
pm2 startup
```

## License

MIT License
