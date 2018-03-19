"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var parameterDigester_1 = require("./parameterDigester");
function total(results, modifier) {
    if (lodash_1.isPlainObject(modifier)) {
        modifier = modifier;
        return parameterDigester_1.default(results, modifier);
    }
    if (lodash_1.isFunction(modifier)) {
        modifier = modifier;
        return modifier(results);
    }
    return lodash_1.sum(results);
}
exports.default = total;
//# sourceMappingURL=total.js.map