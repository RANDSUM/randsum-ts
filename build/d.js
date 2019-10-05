"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var utils_1 = require("./utils");
// tslint:disable-next-line: class-name
var D = /** @class */ (function () {
    function D(sides) {
        this.log = [];
        this.sides = sides;
    }
    D.prototype.roll = function (num, modifier) {
        var _this = this;
        if (num === void 0) { num = 1; }
        var results = Array(num).map(function () { return _this.singleRoll; });
        var total = utils_1.generateTotal(results, modifier);
        this.log.push(new _1.RollLog(total, results, modifier));
        return total;
    };
    Object.defineProperty(D.prototype, "singleRoll", {
        get: function () {
            return utils_1.random(this.sides);
        },
        enumerable: true,
        configurable: true
    });
    return D;
}());
exports.D = D;
//# sourceMappingURL=d.js.map