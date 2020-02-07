"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildURLPublic = buildURLPublic;
exports.default = void 0;

var _extractQueryParams3 = _interopRequireDefault(require("./extractQueryParams"));

var _common = require("./common");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/*
Copyright © 2015 by Coursera
Licensed under the Apache License 2.0, seen https://github.com/coursera/react-imgix/blob/master/LICENSE

Minor syntax modifications have been made
*/
var Base64 = require("js-base64").Base64;

var PACKAGE_VERSION = "9.0.1";
// @see https://www.imgix.com/docs/reference
var PARAM_EXPANSION = Object.freeze({
  // Adjustment
  brightness: "bri",
  contrast: "con",
  exposure: "exp",
  gamma: "gam",
  highlights: "high",
  hue: "hue",
  invert: "invert",
  saturation: "sat",
  shaddows: "shad",
  sharpness: "sharp",
  "unsharp-mask": "usm",
  "unsharp-radius": "usmrad",
  vibrance: "vib",
  // Automatic
  "auto-features": "auto",
  // Background
  "background-color": "bg",
  // Blend
  blend: "blend",
  "blend-mode": "bm",
  "blend-align": "ba",
  "blend-alpha": "balph",
  "blend-padding": "bp",
  "blend-width": "bw",
  "blend-height": "bh",
  "blend-fit": "bf",
  "blend-crop": "bc",
  "blend-size": "bs",
  "blend-x": "bx",
  "blend-y": "by",
  // Border & Padding
  border: "border",
  padding: "pad",
  // Face Detection
  "face-index": "faceindex",
  "face-padding": "facepad",
  faces: "faces",
  // Format
  "chroma-subsampling": "chromasub",
  "color-quantization": "colorquant",
  download: "dl",
  DPI: "dpi",
  format: "fm",
  "lossless-compression": "lossless",
  quality: "q",
  // Mask
  "mask-image": "mask",
  // Mask
  "noise-blur": "nr",
  "noise-sharpen": "nrs",
  // Palette n/a
  // PDF n/a
  // Pixel Density n/a
  // Rotation
  "flip-direction": "flip",
  orientation: "or",
  "rotation-angle": "rot",
  // Size
  "crop-mode": "crop",
  "fit-mode": "fit",
  "image-height": "h",
  "image-width": "w",
  // Stylize
  blurring: "blur",
  halftone: "htn",
  monotone: "mono",
  pixelate: "px",
  "sepia-tone": "sepia",
  // Trim TODO
  // Watermark TODO
  // Extra
  height: "h",
  width: "w"
});
var DEFAULT_OPTIONS = Object.freeze({
  auto: "format" // http://www.imgix.com/docs/reference/automatic#param-auto

});
/**
 * Construct a URL for an image with an Imgix proxy, expanding image options
 * per the [API reference docs](https://www.imgix.com/docs/reference).
 * @param  {String} src         src of raw image
 * @param  {Object} longOptions map of image API options, in long or short form per expansion rules
 * @return {String}             URL of image src transformed by Imgix
 */

function constructUrl(src, longOptions, ext) {
  if (!src) {
    return "";
  }

  var keys = Object.keys(longOptions);
  var keysLength = keys.length;
  var url = src + "?";

  for (var i = 0; i < keysLength; i++) {
    var key = keys[i];
    var val = longOptions[key];

    if (PARAM_EXPANSION[key]) {
      key = PARAM_EXPANSION[key];
    } else {
      key = encodeURIComponent(key);
    }

    if (key.substr(-2) === "64") {
      val = Base64.encodeURI(val);
    }

    url += key + "=" + encodeURIComponent(val) + "&";
  }

  if (_common.config.queryDelim) {
    url = url.indexOf(_common.config.queryDelim) > -1 ? url.replace("?", "&") : url.replace("?", _common.config.queryDelim);
  }

  if (_common.config.debugUrl) {
    console.log("[ react-imgix ] :: ".concat(url.slice(0, -1)).concat(ext || ''));
  }

  return "".concat(url.slice(0, -1)).concat(ext || '');
}

function buildURLPublic(src) {
  var imgixParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var disableLibraryParam = options.disableLibraryParam;

  var _extractQueryParams = (0, _extractQueryParams3.default)(src),
      _extractQueryParams2 = _slicedToArray(_extractQueryParams, 3),
      rawSrc = _extractQueryParams2[0],
      params = _extractQueryParams2[1],
      ext = _extractQueryParams2[2];

  return constructUrl(rawSrc, _extends({}, params, imgixParams, disableLibraryParam ? {} : {
    ixlib: "react-".concat(PACKAGE_VERSION)
  }), ext);
}

var _default = constructUrl;
exports.default = _default;
//# sourceMappingURL=constructUrl.js.map