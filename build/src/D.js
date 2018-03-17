"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var RollLog_1 = require("./RollLog");
var D = /** @class */ (function () {
    function D(sides) {
        this.log = [];
        this.sides = sides;
    }
    D.prototype.roll = function (number) {
        var _this = this;
        this.results = Array(number).map(function () { return _this.singleRoll(); });
        this.total = _.sum(this.results);
        this.log.push(new RollLog_1.default(this.total, this.results));
        return this;
    };
    D.prototype.singleRoll = function () {
        return _.random(1, this.sides);
    };
    return D;
}());
exports.default = D;
//# sourceMappingURL=D.js.map