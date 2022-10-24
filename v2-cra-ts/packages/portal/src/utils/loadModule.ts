//@ts-nocheck
import { getOrLoadRemote } from './getOrLoadRemote';
import {registerRenderer} from "@smc/rendering";
import axios from "axios";
import {keys} from 'lodash';

const CDN_URL = 'http://localhost:8080';

async function getFromCDN(path) {
  const response = await axios.get(CDN_URL + '/' + path);
  return response.data;
}

export const loadModule = async (moduleName, apiVersion) => {
  const manifest = await getFromCDN(`module-manifest.json`);
  const {version, main} = manifest[moduleName][apiVersion];
  const remote = `${moduleName}-${version}`;
  const url = `${CDN_URL}/${main}`;
  const initialized = await getOrLoadRemote(remote, 'default', url);

  const renderingNamespace = `${moduleName}-${apiVersion}`;

  const container = window[remote as any] as any;
  const indexModule = await container.get('./index');
  const {renderers} = indexModule().default;

  if (!initialized) {
    if (renderers) {
      Object.keys(renderers).forEach(k => {
        registerRenderer(k, renderers[k], renderingNamespace);
      })
    }
  }

  return {renderingNamespace, renderers: keys(renderers)};
};
