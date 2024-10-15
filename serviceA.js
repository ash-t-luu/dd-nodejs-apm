const express = require('express');
const tracer = require('dd-trace').init({
    profiling: true,
    env: 'prod',
    service: 'service-a',
    version: '1.0.0',
    logInjection: true,
    runtimeMetrics: true,
});
const http = require('http');
const appA = express();
const logger = require('./log');

appA.get('/', (_req, res) => {
    res.send('Service A Root Path');
  });

appA.get('/serviceA', async (_req, res) => {
    const options = {
        hostname: 'localhost',
        port: 3001,
        path: '/serviceB',
        method: 'GET'
    };

    const request = http.request(options, (response) => {
        let data = '';

        response.on(data, (chunk) => {
            logger.info('Generating data...');
            data += chunk;
        });

        response.on('end', () => {
            res.send(`Service A done with data from Service B: ${data}`);
        });
    });

request.on('error', (error) => {
    span.setTag('error', true);
    span.setTag('error.message', error.message);
    logger.error('An error occurred', { message: err.message, stack: err.stack });
    console.error('Error calling Service B:', error);
    res.status(500).send('Error calling Service B');
});

request.end();
});

appA.listen(3000, () => {
    logger.info('App has started');
    console.log('Server running on port 3000');
});