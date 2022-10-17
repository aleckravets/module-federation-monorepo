import {chartRenderer} from "./chartRenderer";

const version = require('../package.json').version;

console.log(`Charting module initialization ${version}`);

export default {
  renderers: {
    Chart: chartRenderer
  }
}