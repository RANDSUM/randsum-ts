"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPlainObject = function (objProspect) {
    return typeof objProspect === 'object'
        && objProspect !== null
        && objProspect.constructor === Object
        && Object.prototype.toString.call(objProspect) === '[object Object]';
};
