"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils");
function ParameterDigester(results, parameters) {
    var sortedResults = results.slice().sort();
    if (parameters.drop) {
        if (parameters.drop.highest) {
            utils_1.isNumber(parameters.drop.highest)
                ? utils_1.times(parameters.drop.highest)(function () { return sortedResults.pop(); })
                : sortedResults.pop();
        }
        if (parameters.drop.lowest) {
            utils_1.isNumber(parameters.drop.lowest)
                ? utils_1.times(parameters.drop.lowest)(function () { return sortedResults.shift(); })
                : sortedResults.shift();
        }
    }
    var total = utils_1.sum(sortedResults);
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
