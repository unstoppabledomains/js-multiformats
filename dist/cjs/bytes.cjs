"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/bytes.js
var bytes_exports = {};
__export(bytes_exports, {
  coerce: () => coerce,
  empty: () => empty,
  equals: () => equals,
  fromHex: () => fromHex,
  fromString: () => fromString,
  isBinary: () => isBinary,
  toHex: () => toHex,
  toString: () => toString
});
module.exports = __toCommonJS(bytes_exports);
var empty = new Uint8Array(0);
var toHex = (d) => d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
var fromHex = (hex) => {
  const hexes = hex.match(/../g);
  return hexes ? new Uint8Array(hexes.map((b) => parseInt(b, 16))) : empty;
};
var equals = (aa, bb) => {
  if (aa === bb)
    return true;
  if (aa.byteLength !== bb.byteLength) {
    return false;
  }
  for (let ii = 0; ii < aa.byteLength; ii++) {
    if (aa[ii] !== bb[ii]) {
      return false;
    }
  }
  return true;
};
var coerce = (o) => {
  if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
    return o;
  if (o instanceof ArrayBuffer)
    return new Uint8Array(o);
  if (ArrayBuffer.isView(o)) {
    return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
  }
  throw new Error("Unknown type, must be binary type");
};
var isBinary = (o) => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
var fromString = (str) => new TextEncoder().encode(str);
var toString = (b) => new TextDecoder().decode(b);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  coerce,
  empty,
  equals,
  fromHex,
  fromString,
  isBinary,
  toHex,
  toString
});
//# sourceMappingURL=bytes.cjs.map
