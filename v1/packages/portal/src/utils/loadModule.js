import { getOrLoadRemote } from './getOrLoadRemote';

export const loadModule = async (remote, sharedScope, module, url) => {
  await getOrLoadRemote(remote, sharedScope, url);
  const container = window[remote];
  const factory = await container.get(module);
  return factory();
};
