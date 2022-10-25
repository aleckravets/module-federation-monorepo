import {resolveRenderer} from "@smc/rendering";
import React from 'react';
const version = require('../package.json').version;

export const chartRenderer = () => {
  return resolveRenderer('text/html', {data: `<span>CHART <i>${version}</i></span>`})
}