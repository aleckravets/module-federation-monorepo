import React, { useState } from 'react';
import { Presenter, renderPresenter, resolveRenderer } from "@smc/rendering";
import { loadModule } from "@smc/modularity";

const chartV1: Presenter = {name: 'Chart', moduleName: 'Systemorph.Charting', apiVersion: '1'};
const chartV2: Presenter = {name: 'Chart', moduleName: 'Systemorph.Charting', apiVersion: '2'};
const html: Presenter = {name: 'text/html', data: '<span>Hello, <b>World</b>!</span>'};

function App() {
    const [content, setContent] = useState<JSX.Element>();

    function setPresenter(presenter: Presenter) {
        if (presenter.moduleName) {
            const content = renderPresenter(presenter);
            setContent(content);
        } else {
            const {name, ...props} = presenter;
            const content = resolveRenderer(name, props);
            setContent(content);
        }
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
                <React.Suspense fallback={<div>Loading...</div>}>
                    {content}
                </React.Suspense>
            </div>
        </div>
    );
}

export default App;