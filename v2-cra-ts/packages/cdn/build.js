const path = require('path');
const fs = require('fs');

const buildDir = './build';
const modulesDirName = 'modules';

// cleanup
fs.rmSync(buildDir, {recursive: true, force: true});

function getModule(name) {
  const modulePackageDir = path.join('..', name);
  const {version, moduleName, apiVersion, main} = require(`${modulePackageDir}/package.json`);
  return {name, moduleName, version, apiVersion, modulePackageDir, main};
}

const modules = ['charting'].map(getModule);

// symlinks
modules.forEach(({name, modulePackageDir, version}) => {
  // create top level dir, e.g. modules/charting
  fs.mkdirSync(path.join(buildDir, modulesDirName, name), {recursive: true});
  // create symlink e.g. modules/charting/0.1.0 <=> charting/build
  fs.symlinkSync(path.resolve(modulePackageDir), path.join(buildDir, modulesDirName, name, version), 'junction');
});

// manifest
const manifest = modules.reduce((manifest, {moduleName, name, version, apiVersion, main}) => {
  manifest[moduleName] = {
      [apiVersion]: {
        version,
        main: `./${modulesDirName}/${name}/${version}/${main || 'index.js'}`
      }

  }
  return manifest;
}, {});

const manifestString = JSON.stringify(manifest, null, 4);

fs.writeFileSync(`${buildDir}/module-manifest.json`, manifestString, 'utf8');