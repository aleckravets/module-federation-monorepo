import React, {useState} from 'react';
import {loadModule} from './utils/loadModule';
import {resolveRenderer} from "@smc/rendering";

function App() {
  const [renderedContent, setRenderedContent] = useState();

  async function renderChart(version) {
    await loadModule(`charting-${version}`.replaceAll(/[-\\.]/g, '_'), 'default', './index', `http://localhost:3002/charting/${version}/remoteEntry.js`);
    const chart = resolveRenderer('Chart');
    setRenderedContent(chart);
  }

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and{' '}
        <strong>exposes</strong>. It will not load any components or modules that have been loaded
        already.
      </p>
      <button onClick={() => renderChart('1.1.0')}>Render chart 1.1.0</button>
      <button onClick={() => renderChart('1.2.0')}>Render chart 1.2.0</button>
      <div style={{marginTop: '2em'}}>
        {renderedContent}
      </div>
    </div>
  );
}

export default App;
