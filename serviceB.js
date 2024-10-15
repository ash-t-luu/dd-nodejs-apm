// serviceB.js
const express = require('express');
const tracer = require('dd-trace').init({
    profiling: true,
    env: 'prod',
    service: 'service-b',
    version: '1.0.0',
    logInjection: true,
    runtimeMetrics: true,
});

const appB = express();

appB.get('/', (_req, res) => {
  res.send('Service B Root Path');
});

appB.get('/serviceB', (_req, res) => {
  // Simulate some database access or processing
  setTimeout(() => res.send('Service B data'), 200);
});

appB.listen(3001, () => console.log('Service B running on port 3001'));
