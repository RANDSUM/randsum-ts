"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
var parameterDigester_1 = require("./parameterDigester");
exports.generateTotal = function (results, modifier) {
    if (utils_1.isPlainObject(modifier)) {
        modifier = modifier;
        return parameterDigester_1.parameterDigester(results, modifier);
    }
    if (utils_1.isFunction(modifier)) {
        modifier = modifier;
        return modifier(results);
    }
    return utils_1.sum(results);
};
//# sourceMappingURL=index.js.map