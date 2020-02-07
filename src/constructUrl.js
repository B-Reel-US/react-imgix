/*
Copyright © 2015 by Coursera
Licensed under the Apache License 2.0, seen https://github.com/coursera/react-imgix/blob/master/LICENSE

Minor syntax modifications have been made
*/

var Base64 = require("js-base64").Base64;
const PACKAGE_VERSION = require("../package.json").version;
import extractQueryParams from "./extractQueryParams";
import { config } from "./common";

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

  const keys = Object.keys(longOptions);
  const keysLength = keys.length;
  let url = src + "?";
  for (let i = 0; i < keysLength; i++) {
    let key = keys[i];
    let val = longOptions[key];

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

  if ( config.queryDelim ) {
    url = url.indexOf( config.queryDelim ) > -1
      ? url.replace( "?", "&" )
      : url.replace( "?", config.queryDelim );
  }

  if ( config.debugUrl ) {
    console.log( `[ react-imgix ] :: ${url.slice(0, -1)}${ext || ''}` );
  }

  return `${url.slice(0, -1)}${ext || ''}`;
}

function buildURLPublic(src, imgixParams = {}, options = {}) {
  const { disableLibraryParam } = options;

  const [rawSrc, params, ext] = extractQueryParams(src);

  return constructUrl(
    rawSrc,
    Object.assign(
      {},
      params,
      imgixParams,
      disableLibraryParam ? {} : { ixlib: `react-${PACKAGE_VERSION}` }
    ),
    ext
  );
}

export default constructUrl;

export { buildURLPublic };
