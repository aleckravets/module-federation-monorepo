import React from 'react';

const rendererRegistry = {};

export function registerRenderer(name, renderer) {
  rendererRegistry[name] = renderer;
}

export function getRenderer(name) {
  const renderer = rendererRegistry[name];

  if (!renderer)
    throw `${name} renderer is not available.`;

  return renderer;
}

export function resolveRenderer(name, props) {
  const Renderer = getRenderer(name);
  return <Renderer {...props}/>;
}