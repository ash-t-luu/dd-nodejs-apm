const tracer = require("dd-trace").init({
  profiling: true,
  env: "prod",
  service: "dd-nodejs-apm",
  version: "1.0.0",
  logInjection: true,
  runtimeMetrics: true
});

const express = require("express");
const logger = require("./log");

const app = express();

const quotes = [
  "Strive not to be a success, but rather to be of value. - Albert Einstein",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "The best way to predict the future is to invent it. - Alan Kay",
  "Passion is energy. Feel the power that comes from focusing on what excites you. - Oprah Winfrey"
];

app.get("/", (_req, res) => {
  const span = tracer.scope().active();

  try {
    logger.info("Generating quote...");
    tracer.trace('generate.quote', (generateSpan) => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      generateSpan.setTag('quote', randomQuote);    
      res.status(200).send(randomQuote + "\n");
    });
  } catch (error) {
    logger.error("An error occurred", {
      message: error.message,
      stack: error.stack,
    });
    span.setTag('error.message', error.message);
    res.status(500).send("An error occurred in generating quote");
  }
});

app.listen(3000, () => {
  logger.info("App has started");
  console.log("Server running on port 3000");
});
