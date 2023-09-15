"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
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

// src/codecs/json.js
var json_exports = {};
__export(json_exports, {
  code: () => code,
  decode: () => decode,
  encode: () => encode,
  name: () => name
});
module.exports = __toCommonJS(json_exports);
var textEncoder = new TextEncoder();
var textDecoder = new TextDecoder();
var name = "json";
var code = 512;
var encode = (node) => textEncoder.encode(JSON.stringify(node));
var decode = (data) => JSON.parse(textDecoder.decode(data));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  code,
  decode,
  encode,
  name
});
//# sourceMappingURL=json.cjs.map
