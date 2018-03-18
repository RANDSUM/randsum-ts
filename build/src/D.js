"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var rollLog_1 = require("./rollLog");
var generateModifiedTotal_1 = require("./generateModifiedTotal");
var d = /** @class */ (function () {
    function d(sides) {
        this.log = [];
        this.sides = sides;
    }
    d.prototype.roll = function (number, modifier) {
        var _this = this;
        if (number === void 0) { number = 1; }
        var results = Array.from(Array(number), function () { return _this.singleRoll; });
        var total = generateModifiedTotal_1.default(results, modifier);
        this.log.push(new rollLog_1.default(total, results, modifier));
        return total;
    };
    Object.defineProperty(d.prototype, "singleRoll", {
        get: function () {
            return lodash_1.random(1, this.sides);
        },
        enumerable: true,
        configurable: true
    });
    return d;
}());
exports.default = d;
//# sourceMappingURL=d.js.map