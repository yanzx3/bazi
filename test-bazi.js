const http = require('http');

const data = JSON.stringify({
  calendarType: 'solar',
  year: 1990,
  month: 5,
  day: 15,
  hour: 12,
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
  console.log(`Status: ${res.statusCode}`);
  
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const result = JSON.parse(responseData);
    console.log('八字排盘结果：');
    console.log('年柱:', result.data.yearPillar.stem + result.data.yearPillar.branch);
    console.log('月柱:', result.data.monthPillar.stem + result.data.monthPillar.branch);
    console.log('日柱:', result.data.dayPillar.stem + result.data.dayPillar.branch);
    console.log('时柱:', result.data.hourPillar.stem + result.data.hourPillar.branch);
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

req.write(data);
req.end();