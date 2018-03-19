"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ex = require("./index");
var d_1 = require("./d");
var constants_1 = require("./constants");
var rollLog_1 = require("./rollLog");
describe('Index Exports', function () {
    test('include d as named export', function () {
        expect(ex.d).toEqual(d_1.default);
    });
    test('includes rollLog as named export', function () {
        expect(ex.rollLog).toEqual(rollLog_1.default);
    });
    test('include premade Dice Constants as named exports', function () {
        expect(ex.D4).toEqual(constants_1.D4);
        expect(ex.D6).toEqual(constants_1.D6);
        expect(ex.D8).toEqual(constants_1.D8);
        expect(ex.D10).toEqual(constants_1.D10);
        expect(ex.D12).toEqual(constants_1.D12);
        expect(ex.D20).toEqual(constants_1.D20);
        expect(ex.D100).toEqual(constants_1.D100);
    });
});
//# sourceMappingURL=exports.test.js.map