"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFunction = function (functionProspect) {
    return functionProspect && {}.toString.call(functionProspect) === '[object Function]';
};
