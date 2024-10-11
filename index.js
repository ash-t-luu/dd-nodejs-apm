const tracer = require('dd-trace').init({
    profiling: true,
    env: 'prod',
    service: 'dd-nodejs-apm',
    version: '1.0.0',
    logInjection: true,
    debug: true,
    hostname: 'localhost',
    port: 8136
});
const express = require('express');
const app = express();

const quotes = [
  "Strive not to be a success, but rather to be of value. - Albert Einstein",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt"
];

app.get('/', (req, res) => {
  const span = tracer.startSpan('get_quote');

  try {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    span.setTag('quote', randomQuote);
    res.send(randomQuote + '\n'); 
  } catch (error) {
    span.setTag('error', true);
    span.setTag('error.message', error.message);
    res.status(500).send('An error occurred in generating quote');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});