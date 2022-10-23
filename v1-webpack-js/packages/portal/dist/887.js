"use strict";
(self["webpackChunk_smc_portal"] = self["webpackChunk_smc_portal"] || []).push([[887],{

/***/ 887:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: consume shared module (default) react@^16.13.0 (singleton) (fallback: ../../node_modules/react/index.js)
var index_js_ = __webpack_require__(131);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
;// CONCATENATED MODULE: ./src/utils/getOrLoadRemote.js
/**
 * The Right Way to Load Dynamic Remotes
 * @author ScriptedAlchemy <zackary.l.jackson@gmail.com>
 * @see {@link https://gist.github.com/ScriptedAlchemy/3a24008ef60adc47fad1af7d3299a063}
 *
 * @param {string} remote - the remote global name
 * @param {object | string} shareScope - the shareScope Object OR scope key
 * @param {string} remoteFallbackUrl - fallback url for remote module
 * @returns {Promise<object>} - Federated Module Container
 */
const getOrLoadRemote = (remote, shareScope, remoteFallbackUrl = undefined) => new Promise((resolve, reject) => {
  // check if remote exists on window
  if (!window[remote]) {
    // search dom to see if remote tag exists, but might still be loading (async)
    const existingRemote = document.querySelector(`[data-webpack="${remote}"]`);
    // when remote is loaded..
    const onload = originOnload => async () => {
      // check if it was initialized
      if (!window[remote].__initialized) {
        // if share scope doesnt exist (like in webpack 4) then expect shareScope to be a manual object
        if (false) {} else {
          // otherwise, init share scope as usual
          await window[remote].init(__webpack_require__.S[shareScope]);
        }
        // mark remote as initialized
        window[remote].__initialized = true;
      }
      // resolve promise so marking remote as loaded
      resolve();
      originOnload && originOnload();
    };
    if (existingRemote) {
      // if existing remote but not loaded, hook into its onload and wait for it to be ready
      existingRemote.onload = onload(existingRemote.onload);
      existingRemote.onerror = reject;
      // check if remote fallback exists as param passed to function
      // TODO: should scan public config for a matching key if no override exists
    } else if (remoteFallbackUrl) {
      // inject remote if a fallback exists and call the same onload function
      var d = document,
        script = d.createElement('script');
      script.type = 'text/javascript';
      // mark as data-webpack so runtime can track it internally
      script.setAttribute('data-webpack', `${remote}`);
      script.async = true;
      script.onerror = reject;
      script.onload = onload(null);
      script.src = remoteFallbackUrl;
      d.getElementsByTagName('head')[0].appendChild(script);
    } else {
      // no remote and no fallback exist, reject
      reject(`Cannot Find Remote ${remote} to inject`);
    }
  } else {
    // remote already instantiated, resolve
    resolve();
  }
});
;// CONCATENATED MODULE: ./src/utils/loadModule.js

const loadModule = async (remote, sharedScope, module, url) => {
  await getOrLoadRemote(remote, sharedScope, url);
  const container = window[remote];
  const factory = await container.get(module);
  const Module = factory();
  return Module;
};
// EXTERNAL MODULE: consume shared module (default) @smc/rendering@* (singleton) (fallback: ../rendering/src/index.js)
var src_index_js_ = __webpack_require__(818);
;// CONCATENATED MODULE: ./src/App.js



function App() {
  const [renderedContent, setRenderedContent] = (0,index_js_.useState)();
  async function renderChart() {
    await loadModule('charting', 'default', './index', 'http://localhost:3002/remoteEntry.js');
    const chart = (0,src_index_js_.resolveRenderer)('Chart');
    setRenderedContent(chart);
  }
  return /*#__PURE__*/index_js_default().createElement("div", {
    style: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
    }
  }, /*#__PURE__*/index_js_default().createElement("h1", null, "Dynamic System Host"), /*#__PURE__*/index_js_default().createElement("h2", null, "App 1"), /*#__PURE__*/index_js_default().createElement("p", null, "The Dynamic System will take advantage Module Federation ", /*#__PURE__*/index_js_default().createElement("strong", null, "remotes"), " and", ' ', /*#__PURE__*/index_js_default().createElement("strong", null, "exposes"), ". It will not load any components or modules that have been loaded already."), /*#__PURE__*/index_js_default().createElement("button", {
    onClick: renderChart
  }, "Render chart"), /*#__PURE__*/index_js_default().createElement("div", {
    style: {
      marginTop: '2em'
    }
  }, renderedContent));
}
/* harmony default export */ const src_App = (App);
// EXTERNAL MODULE: consume shared module (default) react-dom@^16.13.0 (singleton) (fallback: ../../node_modules/react-dom/index.js)
var react_dom_index_js_ = __webpack_require__(4);
var react_dom_index_js_default = /*#__PURE__*/__webpack_require__.n(react_dom_index_js_);
;// CONCATENATED MODULE: ./src/bootstrap.js



react_dom_index_js_default().render( /*#__PURE__*/index_js_default().createElement(src_App, null), document.getElementById('root'));

/***/ })

}]);
//# sourceMappingURL=887.js.map