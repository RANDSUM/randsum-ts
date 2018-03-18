"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var RollLog_1 = require("./RollLog");
var RollModifier_1 = require("./RollModifier");
var D = /** @class */ (function () {
    function D(sides) {
        this.log = [];
        this.sides = sides;
    }
    D.prototype.roll = function (number, modifier) {
        var _this = this;
        if (number === void 0) { number = 1; }
        var results = Array.from(Array(number), function () { return _this.singleRoll; });
        var total = RollModifier_1.default(results, modifier);
        this.log.push(new RollLog_1.default(total, results, modifier));
        return total;
    };
    Object.defineProperty(D.prototype, "singleRoll", {
        get: function () {
            return lodash_1.random(1, this.sides);
        },
        enumerable: true,
        configurable: true
    });
    return D;
}());
exports.default = D;
//# sourceMappingURL=D.js.map