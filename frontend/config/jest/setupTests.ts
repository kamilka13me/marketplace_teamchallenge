import '@testing-library/jest-dom';
import 'regenerator-runtime/runtime';
import 'whatwg-fetch';
/**
 * fix: `matchMedia` not present, legacy browsers require a polyfill
 */
// global.matchMedia =
//   global.matchMedia ||
//   function () {
//     return {
//       matches: false,
//       addListener() {},
//       removeListener() {},
//     };
//   };
