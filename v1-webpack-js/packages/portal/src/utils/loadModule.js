import { getOrLoadRemote } from './getOrLoadRemote';
import {registerRenderer} from "@smc/rendering";

export const loadModule = async (name, version) => {
  const remote = `${name}-${version}`;
  const url = `http://localhost:3002/${name}/${version}/remoteEntry.js`
  const initialized = await getOrLoadRemote(remote, 'default', url);
  if (!initialized) {
    const container = window[remote];
    const indexModule = await container.get('./index');
    const {renderers} = indexModule().default;
    if (renderers) {
      Object.keys(renderers).forEach(k => {
        registerRenderer(k, renderers[k], `${name}-${version}`);
      })
    }
  }
};
