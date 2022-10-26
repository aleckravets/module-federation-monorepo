import React from 'react';
import { loadModule } from "@smc/modularity";

export interface Presenter<TData = any, TOptions = any> {
    readonly name: string;
    readonly data?: TData;
    readonly options?: TOptions;
    readonly moduleName?: string;
    readonly apiVersion?: string;
}

const rendererRegistry: any = {};

export function registerRenderer(name: string, renderer: any, namespace = 'default') {
    const registry = rendererRegistry[namespace] = rendererRegistry[namespace] || {};

    if (registry[name])
        throw `${name} renderer already registered`;

    registry[name] = renderer;
}

export function getRenderer(name: string, namespace = 'default') {
    const registry = rendererRegistry[namespace] = rendererRegistry[namespace] || {};

    const renderer = registry[name];

    if (!renderer)
        throw `${name} renderer is not available.`;

    return renderer;
}

export function resolveRenderer(name: string, props: any, namespace = 'default') {
    const Renderer = getRenderer(name, namespace);
    return <Renderer {...props}/>;
}

export function renderPresenter(presenter: Presenter) {
    const {name, moduleName, apiVersion, ...props} = presenter;

    const Component = React.lazy(() => loadModule(moduleName!, apiVersion!, `./presenters/${name}`));

    return <Component {...props}/>;
}


////////////////////
function Html({html, ...props}: any) {
    return <div dangerouslySetInnerHTML={{__html: html}} {...props}/>;
}

registerRenderer('text/html', ({data}: any) => <Html html={data}/>);