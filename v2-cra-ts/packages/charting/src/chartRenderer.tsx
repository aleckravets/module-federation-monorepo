import { resolveRenderer } from "@smc/rendering";
import React from 'react';
const {apiVersion} = require('../package.json');

export const chartRenderer = () => {
  // module can render stuff from other modules e.g. renderPresenter({name: 'Scope', moduleName: 'Scopes'});
  return resolveRenderer('text/html', {data: `<span>CHART <i>${apiVersion}</i></span>`})
}