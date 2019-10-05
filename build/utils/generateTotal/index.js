"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
var parameterDigester_1 = require("./parameterDigester");
exports.generateTotal = function (results, modifier) {
    if (__1.isPlainObject(modifier)) {
        modifier = modifier;
        return parameterDigester_1.parameterDigester(results, modifier);
    }
    if (__1.isFunction(modifier)) {
        modifier = modifier;
        return modifier(results);
    }
    return __1.sum(results);
};
//# sourceMappingURL=index.js.map