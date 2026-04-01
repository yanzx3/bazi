# 八字排盘软件 API 接口文档

## 基础信息

- **API 地址**: `http://localhost:3002`
- **协议**: HTTP
- **数据格式**: JSON

## 接口列表

### 1. 健康检查

检测服务器是否正常运行。

**请求**
- **URL**: `/api/health`
- **方法**: GET
- **Content-Type**: application/json

**响应示例**
```json
{
  "status": "ok",
  "message": "BaZi Calculator API is running"
}
```

---

### 2. 计算八字

根据出生日期时间计算四柱八字。

**请求**
- **URL**: `/api/calculate`
- **方法**: POST
- **Content-Type**: application/json

**请求参数**

| 参数名 | 类型 | 必填 | 说明 | 示例 |
|--------|------|------|------|------|
| calendarType | string | 是 | 日历类型："solar"(阳历) 或 "lunar"(农历) | "solar" |
| year | number | 是 | 出生年份（1900-2100） | 1982 |
| month | number | 是 | 出生月份（1-12） | 4 |
| day | number | 是 | 出生日期（1-31） | 30 |
| hour | number | 是 | 出生小时（0-23） | 0 |
| gender | string | 是 | 性别："male"(男) 或 "female"(女) | "male" |

**请求示例**
```json
{
  "calendarType": "solar",
  "year": 1982,
  "month": 4,
  "day": 30,
  "hour": 0,
  "gender": "male"
}
```

**成功响应**

**Status**: 200 OK

```json
{
  "success": true,
  "data": {
    "yearPillar": {
      "stem": "壬",
      "branch": "戌",
      "element": "WATER"
    },
    "monthPillar": {
      "stem": "甲",
      "branch": "辰",
      "element": "WOOD"
    },
    "dayPillar": {
      "stem": "癸",
      "branch": "未",
      "element": "WATER"
    },
    "hourPillar": {
      "stem": "壬",
      "branch": "子",
      "element": "WATER"
    },
    "dayMaster": {
      "stem": "癸",
      "element": "WATER",
      "nature": "Yin"
    },
    "fiveElementsDistribution": {
      "WOOD": 1,
      "FIRE": 0,
      "EARTH": 3,
      "METAL": 0,
      "WATER": 4
    },
    "nobleman": ["子", "申"],
    "peachBlossom": "丑",
    "intelligenceStar": "亥",
    "skyHorse": "子"
  }
}
```

**失败响应**

**Status**: 400 Bad Request（参数错误）

```json
{
  "error": "Year must be between 1900 and 2100"
}
```

**Status**: 500 Internal Server Error（服务器错误）

```json
{
  "success": false,
  "error": "Failed to calculate BaZi chart",
  "message": "具体错误信息"
}
```

---

## 返回数据说明

### 四柱（Four Pillars）

#### yearPillar - 年柱
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| stem | string | 年干（天干） | "壬" |
| branch | string | 年支（地支） | "戌" |
| element | string | 五行属性：WOOD(木)/FIRE(火)/EARTH(土)/METAL(金)/WATER(水) | "WATER" |

#### monthPillar - 月柱
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| stem | string | 月干（天干） | "甲" |
| branch | string | 月支（地支） | "辰" |
| element | string | 五行属性 | "WOOD" |

#### dayPillar - 日柱
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| stem | string | 日干（日主天干） | "癸" |
| branch | string | 日支（地支） | "未" |
| element | string | 五行属性 | "WATER" |

#### hourPillar - 时柱
| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| stem | string | 时干（天干） | "壬" |
| branch | string | 时支（地支） | "子" |
| element | string | 五行属性 | "WATER" |

### 日主（Day Master）

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| stem | string | 日主天干（与 dayPillar.stem 相同） | "癸" |
| element | string | 五行属性 | "WATER" |
| nature | string | 阴阳属性："Yang"(阳) 或 "Yin"(阴) | "Yin" |

### 五行分布（Five Elements Distribution）

统计四柱中五行的数量分布：

| 字段 | 类型 | 说明 |
|------|------|------|
| WOOD | number | 木的数量（天干+地支） |
| FIRE | number | 火的数量 |
| EARTH | number | 土的数量 |
| METAL | number | 金的数量 |
| WATER | number | 水的数量 |

### 命理要素

| 字段 | 类型 | 说明 | 示例 |
|------|------|------|------|
| nobleman | array | 贵人（天乙贵人） | ["子", "申"] |
| peachBlossom | string | 桃花（咸池） | "丑" |
| intelligenceStar | string | 文昌星 | "亥" |
| skyHorse | string | 天马（驿马） | "子" |

---

## 调用示例

### cURL

```bash
# 计算1982年4月30日子时出生的男性八字
curl -X POST http://localhost:3002/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "calendarType": "solar",
    "year": 1982,
    "month": 4,
    "day": 30,
    "hour": 0,
    "gender": "male"
  }'
```

### PowerShell

```powershell
Invoke-WebRequest -Uri "http://localhost:3002/api/calculate" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{
    "calendarType": "solar",
    "year": 1982,
    "month": 4,
    "day": 30,
    "hour": 0,
    "gender": "male"
  }' | Select-Object -ExpandProperty Content
```

### JavaScript (Node.js)

```javascript
const http = require('http');

const data = JSON.stringify({
  calendarType: 'solar',
  year: 1982,
  month: 4,
  day: 30,
  hour: 0,
  gender: 'male'
});

const options = {
  hostname: 'localhost',
  port: 3002,
  path: '/api/calculate',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let responseData = '';
  res.on('data', (chunk) => { responseData += chunk; });
  res.on('end', () => {
    const result = JSON.parse(responseData);
    console.log('八字:', 
      result.data.yearPillar.stem + result.data.yearPillar.branch, // 年柱
      result.data.monthPillar.stem + result.data.monthPillar.branch, // 月柱
      result.data.dayPillar.stem + result.data.dayPillar.branch, // 日柱
      result.data.hourPillar.stem + result.data.hourPillar.branch // 时柱
    );
  });
});

req.on('error', (e) => { console.error('Error:', e.message); });
req.write(data);
req.end();
```

### Python

```python
import requests
import json

url = "http://localhost:3002/api/calculate"
headers = {"Content-Type": "application/json"}
data = {
    "calendarType": "solar",
    "year": 1982,
    "month": 4,
    "day": 30,
    "hour": 0,
    "gender": "male"
}

response = requests.post(url, headers=headers, json=data)
result = response.json()

print(f"年柱: {result['data']['yearPillar']['stem']}{result['data']['yearPillar']['branch']}")
print(f"月柱: {result['data']['monthPillar']['stem']}{result['data']['monthPillar']['branch']}")
print(f"日柱: {result['data']['dayPillar']['stem']}{result['data']['dayPillar']['branch']}")
print(f"时柱: {result['data']['hourPillar']['stem']}{result['data']['hourPillar']['branch']}")
```

---

## 天干地支对照表

### 天干（Heavenly Stems）
| 序号 | 天干 | 五行 | 阴阳 |
|------|------|------|------|
| 0 | 甲 | 木 | 阳 |
| 1 | 乙 | 木 | 阴 |
| 2 | 丙 | 火 | 阳 |
| 3 | 丁 | 火 | 阴 |
| 4 | 戊 | 土 | 阳 |
| 5 | 己 | 土 | 阴 |
| 6 | 庚 | 金 | 阳 |
| 7 | 辛 | 金 | 阴 |
| 8 | 壬 | 水 | 阳 |
| 9 | 癸 | 水 | 阴 |

### 地支（Earthly Branches）
| 序号 | 地支 | 五行 | 阴阳 |
|------|------|------|------|
| 0 | 子 | 水 | 阳 |
| 1 | 丑 | 土 | 阴 |
| 2 | 寅 | 木 | 阳 |
| 3 | 卯 | 木 | 阴 |
| 4 | 辰 | 土 | 阳 |
| 5 | 巳 | 火 | 阴 |
| 6 | 午 | 火 | 阳 |
| 7 | 未 | 土 | 阴 |
| 8 | 申 | 金 | 阳 |
| 9 | 酉 | 金 | 阴 |
| 10 | 戌 | 土 | 阳 |
| 11 | 亥 | 水 | 阴 |

---

## 注意事项

1. **节气影响**：八字月份以节气为界，不是简单的公历月份。例如：
   - 4月5日前（清明前）属于卯月（二月）
   - 4月5日后（清明后）属于辰月（三月）
   - API会自动根据日期判断节气

2. **时辰范围**：
   - 子时：23:00 - 01:00
   - 丑时：01:00 - 03:00
   - ...以此类推

3. **年份范围**：支持 1900-2100 年的计算

4. **农历功能**：目前农历转换功能尚未完全实现，建议使用阳历