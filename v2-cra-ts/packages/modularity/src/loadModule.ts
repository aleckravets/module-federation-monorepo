import axios from "axios";

// TODO: factor out (10/25/2022, akravets)
const CDN = 'http://localhost:8080';

async function loadFromCDN(path: string) {
    const response = await axios.get(CDN + '/' + path);
    return response.data;
}

export const loadModule = async (moduleName: string, apiVersion: string, onInit?: () => void) => {
    const manifest = await loadFromCDN(`module-manifest.json`);
    const moduleEntry = manifest[moduleName][apiVersion];

    const remote = `${moduleName}-${apiVersion}`;

    const url = `${CDN}/${moduleEntry}`;
    const initialized = await getOrLoadRemote(remote, 'default', url);

    const container = window[remote] as any;
    const indexModule = await container.get('./index');
    const defaultExport = indexModule().default;

    if (!initialized && onInit) {
        onInit();
    }

    return defaultExport;
}

// https://gist.github.com/ScriptedAlchemy/3a24008ef60adc47fad1af7d3299a063
function getOrLoadRemote(remote: string, shareScope: string, remoteFallbackUrl: string) {
    return new Promise<boolean>((resolve, reject) => {
        // check if remote exists on window
        if (!window[remote]) {
            // search dom to see if remote tag exists, but might still be loading (async)
            const existingRemote = document.querySelector<HTMLScriptElement>(`[data-webpack="${remote}"]`);
            // when remote is loaded...
            const onload = (originOnload: any) => async () => {
                // check if it was initialized
                if (!window[remote].__initialized) {
                    await window[remote].init(__webpack_share_scopes__[shareScope]);
                    // mark remote as initialized
                    window[remote].__initialized = true;
                }
                // resolve promise so marking remote as loaded
                resolve(false);
                originOnload && originOnload();
            }
            if (existingRemote) {
                // if existing remote but not loaded, hook into its onload and wait for it to be ready
                existingRemote.onload = onload(existingRemote.onload);
                existingRemote.onerror = reject;
                // check if remote fallback exists as param passed to function
                // TODO: should scan public config for a matching key if no override exists
            } else if (remoteFallbackUrl) {
                // inject remote if a fallback exists and call the same onload function
                const script = document.createElement('script');
                script.type = 'text/javascript';
                // mark as data-webpack so runtime can track it internally
                script.setAttribute('data-webpack', remote);
                script.async = true;
                script.onerror = reject;
                script.onload = onload(null);
                script.src = remoteFallbackUrl;
                document.getElementsByTagName('head')[0].appendChild(script);
            } else {
                // no remote and no fallback exist, reject
                reject(`Cannot find remote ${remote} to inject`);
            }
        } else {
            // remote already instantiated, resolve
            resolve(true);
        }
    });
}