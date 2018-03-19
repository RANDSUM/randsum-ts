"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
function ParameterDigester(results, parameters) {
    var modifiedResults = results.slice().sort();
    if (parameters.drop) {
        if (parameters.drop.highest) {
            lodash_1.isNumber(parameters.drop.highest)
                ? lodash_1.times(parameters.drop.highest, function () { return modifiedResults.pop(); })
                : modifiedResults.pop();
        }
        if (parameters.drop.lowest) {
            lodash_1.isNumber(parameters.drop.lowest)
                ? lodash_1.times(parameters.drop.lowest, function () { return modifiedResults.shift(); })
                : modifiedResults.shift();
        }
    }
    var total = lodash_1.sum(modifiedResults);
    if (parameters.plus) {
        total = total + parameters.plus;
    }
    if (parameters.minus) {
        parameters.minus < 0
            ? total = total + parameters.minus
            : total = total - parameters.minus;
    }
    return total;
}
exports.default = ParameterDigester;
//# sourceMappingURL=parameterDigester.js.map