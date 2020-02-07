import { config } from "./common";

export default function extractQueryParams(src) {
  let ext = '';

  const splitSrc = config.queryDelim
    ? src.split( config.queryDelim )
    : src.split("?");

  if ( config.mockFormat && splitSrc[1] ) {
    ext = splitSrc[1].match( /\.[\d\w]+$/ )[0];
    splitSrc[1] = splitSrc[1].replace( ext, '' );
  }

  const url = splitSrc[0];
  const query = splitSrc[1];
  if (!query) {
    return [url, {}];
  }
  const paramsPairs = query.split("&");
  const params = {};
  const len = paramsPairs.length;
  for (let i = 0; i < len; i++) {
    const param = paramsPairs[i];
    const splitParam = param.split("=");
    const key = splitParam[0];
    const val = splitParam[1];
    params[key] = decodeURIComponent(val);
  }
  return [url, params, ext];
}
