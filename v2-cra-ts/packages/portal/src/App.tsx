import React, { useState } from 'react';
import { Presenter, renderPresenter } from "@smc/rendering";

const chartV1: Presenter = {name: 'Chart', moduleName: 'Systemorph.Charting', apiVersion: '1'};
const chartV2: Presenter = {name: 'Chart', moduleName: 'Systemorph.Charting', apiVersion: '2'};
const html: Presenter = {name: 'text/html', data: '<span>Hello, <b>World</b>!</span>'};

function App() {
    const [content, setContent] = useState<JSX.Element>();

    async function setPresenter(presenter: Presenter) {
        const content = await renderPresenter(presenter);
        setContent(content);
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
                The dynamic modularity takes advantage of Module Federation. It will not load any components or modules
                that have been loaded
                already.
            </p>
            <button onClick={() => setPresenter(chartV1)}>Render Chart v1</button>
            <button onClick={() => setPresenter(html)}>Render Html</button>
            <div style={{marginTop: '2em'}}>
                {content}
            </div>
        </div>
    );
}

export default App;