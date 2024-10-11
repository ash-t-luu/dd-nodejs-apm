const tracer = require('dd-trace').init({
    profiling: true,
    env: 'prod',
    service: 'my-web-app',
    version: '1.0.3'
});
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});