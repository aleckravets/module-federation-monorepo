import React from 'react';

const rendererRegistry = {};

export function registerRenderer(name, renderer, namespace = 'default') {
  const registry = rendererRegistry[namespace] = rendererRegistry[namespace] || {};

  if (registry[name])
    throw `${name} renderer already registered`;

  registry[name] = renderer;
}

export function getRenderer(name, namespace = 'default') {
  const registry = rendererRegistry[namespace] = rendererRegistry[namespace] || {};

  const renderer = registry[name];

  if (!renderer)
    throw `${name} renderer is not available.`;

  return renderer;
}

export function resolveRenderer(name, props, namespace = 'default') {
  const Renderer = getRenderer(name, namespace);
  return <Renderer {...props}/>;
}


////////////////////
function Html({html, ...props}) {
  return <div dangerouslySetInnerHTML={{__html: html}} {...props}/>;
}

registerRenderer('text/html', ({data}) => <Html html={data}/>);