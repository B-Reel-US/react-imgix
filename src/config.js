const config = {
  warnings: {
    fallbackImage: true,
    sizesAttribute: true,
    invalidARFormat: true
  },
  queryDelim: null,
  debugUrl: false,
};

const _setWarning = (name, value) => {
  if (!name || !(name in config.warnings)) {
    return;
  }
  config.warnings[name] = value;
};

const _setQueryDelim = (delim) => {
  config.queryDelim = delim;
}

const _setDebugUrl = (delim) => {
  config.debugUrl = delim;
}

class PublicConfigAPI {
  static disableWarning(name) {
    _setWarning(name, false);
  }
  static enableWarning(name) {
    _setWarning(name, true);
  }
  static setQueryDelim(delim) {
    _setQueryDelim(delim);
  }
  static setDebugUrl(delim) {
    _setDebugUrl(delim);
  }
}

export default config;
export { PublicConfigAPI };
