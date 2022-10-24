const path = require('path');
const fs = require('fs');
const express = require('express');
const server = express();
const serveIndex = require('serve-index');

const buildDir = './build';

function getModule(name) {
  const packageDir = path.resolve('..', name);
  const {version, moduleName, apiVersion, moduleEntry} = require(`${packageDir}/package.json`);
  const publicPath = `/modules/${name}/${version}`;
  const entry = `${publicPath}/${moduleEntry}`;
  const manifest = {[apiVersion]: entry};
  const dir = path.join(packageDir, 'build');
  return {moduleName, manifest, publicPath, dir};
}

const modules = ['charting'].map(getModule);

modules.forEach(({publicPath, dir}) => {
  server.use(publicPath, express.static(dir));
  server.use(publicPath, serveIndex(dir));
});

const manifest = modules.reduce((result, module) => {
  const {moduleName, manifest} = module;
  result[moduleName] = manifest;
  return result;
}, {});

const manifestString = JSON.stringify(manifest, null, 4);

fs.mkdirSync(buildDir, {recursive: true});

fs.writeFileSync(`${buildDir}/module-manifest.json`, manifestString, 'utf8');

server.use('/', express.static(buildDir));
server.use('/', serveIndex(buildDir));

server.listen(8080);