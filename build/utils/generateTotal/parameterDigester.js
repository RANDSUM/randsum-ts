"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var __1 = require("..");
exports.parameterDigester = function (results, parameters) {
    var sortedResults = results.slice().sort();
    if (parameters.drop) {
        if (parameters.drop.highest) {
            __1.isNumber(parameters.drop.highest)
                ? __1.times(parameters.drop.highest)(function () { return sortedResults.pop(); })
                : sortedResults.pop();
        }
        if (parameters.drop.lowest) {
            __1.isNumber(parameters.drop.lowest)
                ? __1.times(parameters.drop.lowest)(function () { return sortedResults.shift(); })
                : sortedResults.shift();
        }
    }
    var total = __1.sum(sortedResults);
    if (parameters.plus) {
        total = total + parameters.plus;
    }
    if (parameters.minus) {
        parameters.minus < 0
            ? (total = total + parameters.minus)
            : (total = total - parameters.minus);
    }
    return total;
};
//# sourceMappingURL=parameterDigester.js.map