"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RollLog = /** @class */ (function () {
    function RollLog(total, results, modifier) {
        if (modifier === void 0) { modifier = {}; }
        this.total = total;
        this.results = results;
        this.modifier = modifier;
        this.dateRolled = new Date(Date.now());
    }
    return RollLog;
}());
exports.default = RollLog;
//# sourceMappingURL=RollLog.js.map