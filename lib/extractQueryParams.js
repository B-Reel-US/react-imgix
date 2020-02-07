"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = extractQueryParams;

var _common = require("./common");

function extractQueryParams(src) {
  var ext = '';
  var splitSrc = _common.config.queryDelim ? src.split(_common.config.queryDelim) : src.split("?");

  if (_common.config.mockFormat && splitSrc[1]) {
    ext = splitSrc[1].match(/\.[\d\w]+$/)[0];
    splitSrc[1] = splitSrc[1].replace(ext, '');
  }

  var url = splitSrc[0];
  var query = splitSrc[1];

  if (!query) {
    return [url, {}];
  }

  var paramsPairs = query.split("&");
  var params = {};
  var len = paramsPairs.length;

  for (var i = 0; i < len; i++) {
    var param = paramsPairs[i];
    var splitParam = param.split("=");
    var key = splitParam[0];
    var val = splitParam[1];
    params[key] = decodeURIComponent(val);
  }

  return [url, params, ext];
}
//# sourceMappingURL=extractQueryParams.js.map