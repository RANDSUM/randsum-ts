"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ex = require("./index");
var d_1 = require("./d");
var dConstants_1 = require("./dConstants");
var rollLog_1 = require("./rollLog");
describe('Index Exports', function () {
    test('include d as default', function () {
        expect(ex.default).toEqual(d_1.default);
    });
    test('include d as named export', function () {
        expect(ex.d).toEqual(d_1.default);
    });
    test('includes rollLog', function () {
        expect(ex.rollLog).toEqual(rollLog_1.default);
    });
    test('include premade Dice Constants', function () {
        expect(ex.D4).toEqual(dConstants_1.D4);
        expect(ex.D6).toEqual(dConstants_1.D6);
        expect(ex.D8).toEqual(dConstants_1.D8);
        expect(ex.D10).toEqual(dConstants_1.D10);
        expect(ex.D12).toEqual(dConstants_1.D12);
        expect(ex.D20).toEqual(dConstants_1.D20);
        expect(ex.D100).toEqual(dConstants_1.D100);
    });
});
//# sourceMappingURL=exports.test.js.map