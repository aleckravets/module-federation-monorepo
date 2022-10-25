import { getOrLoadRemote } from './getOrLoadRemote';
import { registerRenderer } from "@smc/rendering";
import axios from "axios";

const CDN = 'http://localhost:8080';

async function loadFromCDN(path: string) {
    const response = await axios.get(CDN + '/' + path);
    return response.data;
}

export const loadModule = async (moduleName: string, apiVersion: number) => {
    const manifest = await loadFromCDN(`module-manifest.json`);
    const moduleEntry = manifest[moduleName][apiVersion];

    // TODO: factor out and export
    const remote = `${moduleName}-${apiVersion}`;

    const url = `${CDN}/${moduleEntry}`;
    const initialized = await getOrLoadRemote(remote, 'default', url);

    const container = window[remote] as any;
    const indexModule = await container.get('./index');
    const {renderers} = indexModule().default;

    const namespace = remote;

    if (!initialized) {
        if (renderers) {
            Object.keys(renderers).forEach(k => {
                registerRenderer(k, renderers[k], namespace);
            })
        }
    }

    return {namespace, renderers: Object.keys(renderers)};
}
