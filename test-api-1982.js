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
  res.on('data', (chunk) => {
    responseData += chunk;
  });
  
  res.on('end', () => {
    const result = JSON.parse(responseData);
    console.log('API返回结果:');
    console.log(JSON.stringify(result, null, 2));
  });
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.write(data);
req.end();