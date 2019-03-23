"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var parameterDigester_1 = __importDefault(require("./parameterDigester"));
function total(results, modifier) {
    if (utils_1.isPlainObject(modifier)) {
        modifier = modifier;
        return parameterDigester_1.default(results, modifier);
    }
    if (utils_1.isFunction(modifier)) {
        modifier = modifier;
        return modifier(results);
    }
    return utils_1.sum(results);
}
exports.default = total;
