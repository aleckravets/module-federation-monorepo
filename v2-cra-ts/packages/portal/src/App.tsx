//@ts-nocheck
import React, {useState} from 'react';
import {loadModule} from './utils/loadModule';
import {resolveRenderer} from "@smc/rendering";

function App() {
  const [renderedContent, setRenderedContent] = useState();

  async function renderChart(version) {
    await loadModule(`charting`, version);
    const chart = resolveRenderer('Chart', null, `charting-${version}`);
    setRenderedContent(chart);
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
        <button onClick={() => renderChart('0.1.0')}>Render chart 0.1.0</button>
        <button onClick={() => renderChart('0.2.0')}>Render chart 0.2.0</button>
        <div style={{marginTop: '2em'}}>
          {renderedContent}
        </div>
      </div>
  );
}

export default App;