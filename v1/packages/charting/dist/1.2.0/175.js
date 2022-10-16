"use strict";
(self["webpackChunk_smc_charting"] = self["webpackChunk_smc_charting"] || []).push([[175,109],{

/***/ 109:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "registerRenderer": () => (/* reexport */ registerRenderer),
  "resolveRenderer": () => (/* reexport */ resolveRenderer)
});

// EXTERNAL MODULE: consume shared module (default) react@^16.13.0 (singleton) (fallback: ../../node_modules/react/index.js)
var index_js_ = __webpack_require__(131);
var index_js_default = /*#__PURE__*/__webpack_require__.n(index_js_);
;// CONCATENATED MODULE: ../rendering/src/rendererRegistry.jsx

const rendererRegistry = {};
function registerRenderer(name, renderer) {
  rendererRegistry[name] = renderer;
}
function getRenderer(name) {
  const renderer = rendererRegistry[name];
  if (!renderer) throw `${name} renderer is not available.`;
  return renderer;
}
function resolveRenderer(name, props) {
  const Renderer = getRenderer(name);
  return /*#__PURE__*/index_js_default().createElement(Renderer, props);
}
;// CONCATENATED MODULE: ../rendering/src/index.js


/***/ })

}]);
//# sourceMappingURL=175.js.map