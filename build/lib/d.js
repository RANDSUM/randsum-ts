"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rollLog_1 = __importDefault(require("./rollLog"));
var utils_1 = require("./utils");
var d = /** @class */ (function () {
    function d(sides) {
        this.log = [];
        this.sides = sides;
    }
    d.prototype.roll = function (number, modifier) {
        var _this = this;
        if (number === void 0) { number = 1; }
        var results = Array.from(Array(number), function () { return _this.singleRoll; });
        var total = utils_1.generateTotal(results, modifier);
        this.log.push(new rollLog_1.default(total, results, modifier));
        return total;
    };
    Object.defineProperty(d.prototype, "singleRoll", {
        get: function () {
            return utils_1.random(this.sides);
        },
        enumerable: true,
        configurable: true
    });
    return d;
}());
exports.default = d;
