"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var RESULTS = [1, 2, 3];
describe('Parameter Digester,', function () {
    describe('when provided a modifier object', function () {
        test('with a plus property adds the provided amount', function () {
            var modifier = { plus: 2 };
            expect(index_1.default(RESULTS, modifier)).toEqual(8);
        });
        describe('with a minus property', function () {
            test('that is positive, subtracts that amount', function () {
                var modifier = { minus: 2 };
                expect(index_1.default(RESULTS, modifier)).toEqual(4);
            });
            test('that is negative, subtracts the absolute value', function () {
                var modifier = { minus: -2 };
                expect(index_1.default(RESULTS, modifier)).toEqual(4);
            });
        });
    });
    test('when provided a modifier function, returns the return value of the modifier', function () {
        var modifier = function (results) { return results.length; };
        expect(index_1.default(RESULTS, modifier)).toBe(3);
    });
});
3;
//# sourceMappingURL=index.test.js.map