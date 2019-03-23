"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = function (max) {
    var zeroIndexedMax = max - 1;
    return Math.floor(Math.random() * zeroIndexedMax) + 1;
};
