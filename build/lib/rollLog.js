"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rollLog = /** @class */ (function () {
    function rollLog(total, results, modifier) {
        this.total = total;
        this.results = results;
        this.modifier = modifier;
        this.dateRolled = new Date(Date.now());
    }
    return rollLog;
}());
exports.default = rollLog;
