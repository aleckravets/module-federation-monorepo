import React, {useState} from 'react';
import {loadModule} from '@smc/modularity';
import {resolveRenderer} from "@smc/rendering";

function App() {
  const [renderedContent, setRenderedContent] = useState<JSX.Element>();

  async function renderFromModule(moduleName: string, apiVersion: string, rendererName: string, props: any) {
    const {namespace} = await loadModule(`Systemorph.Charting`, apiVersion);
    const renderedContent = resolveRenderer(rendererName, props, namespace);
    setRenderedContent(renderedContent);
  }

  return (
      <div
          style={{
            fontFamily:
                '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          }}
      >
        <h1>Portal dynamic modularity</h1>
        <p>
          The dynamic modularity takes advantage of Module Federation. It will not load any components or modules that have been loaded
          already.
        </p>
        <button onClick={() => renderFromModule('Systemorph.Charting', '1', 'Chart', null)}>Render Chart v1</button>
        <button onClick={() => renderFromModule('Systemorph.Charting', '2', 'Chart', null)}>Render Chart v2</button>
        <div style={{marginTop: '2em'}}>
          {renderedContent}
        </div>
      </div>
  );
}

export default App;