import React from 'react';
import {registerRenderer} from "@smc/rendering";

const version = require('../package.json').version;

console.log(`Charting module initialization ${version}`);

registerRenderer('Chart', () => `CHART ${version}`);