import React from 'react';
import {version} from "../package.json";
import {resolveRenderer} from "@smc/rendering";

export const chartRenderer = () => {
  return resolveRenderer('text/html', {data: `<span>CHART <i>${version}</i></span>`})
}