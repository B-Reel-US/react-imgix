"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicConfigAPI = exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var config = {
  warnings: {
    fallbackImage: true,
    sizesAttribute: true,
    invalidARFormat: true
  },
  queryDelim: null,
  debugUrl: false,
  mockFormat: false
};

var _setWarning = function _setWarning(name, value) {
  if (!name || !(name in config.warnings)) {
    return;
  }

  config.warnings[name] = value;
};

var _setQueryDelim = function _setQueryDelim(delim) {
  config.queryDelim = delim;
};

var _setDebugUrl = function _setDebugUrl(delim) {
  config.debugUrl = delim;
};

var _setMockFormat = function _setMockFormat(active) {
  config.mockFormat = active;
};

var PublicConfigAPI =
/*#__PURE__*/
function () {
  function PublicConfigAPI() {
    _classCallCheck(this, PublicConfigAPI);
  }

  _createClass(PublicConfigAPI, null, [{
    key: "disableWarning",
    value: function disableWarning(name) {
      _setWarning(name, false);
    }
  }, {
    key: "enableWarning",
    value: function enableWarning(name) {
      _setWarning(name, true);
    }
  }, {
    key: "setQueryDelim",
    value: function setQueryDelim(delim) {
      _setQueryDelim(delim);
    }
  }, {
    key: "setDebugUrl",
    value: function setDebugUrl(delim) {
      _setDebugUrl(delim);
    }
  }, {
    key: "setMockFormat",
    value: function setMockFormat(active) {
      _setMockFormat(active);
    }
  }]);

  return PublicConfigAPI;
}();

exports.PublicConfigAPI = PublicConfigAPI;
var _default = config;
exports.default = _default;
//# sourceMappingURL=config.js.map