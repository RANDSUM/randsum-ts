"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.times = function (iterator) { return function (callback) {
    if (iterator > 0) {
        callback(iterator);
        exports.times(iterator - 1)(callback);
    }
}; };
//# sourceMappingURL=times.js.map