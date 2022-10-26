import {chartRenderer} from "./chartRenderer";
const {apiVersion} = require('../package.json');

console.log(`Charting module initialization ${apiVersion}`);

export default {
  renderers: {
    Chart: chartRenderer
  }
}