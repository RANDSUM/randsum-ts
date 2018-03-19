"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var generateModifiedTotal_1 = require("./generateModifiedTotal");
var RESULTS = [1, 2, 3];
var LOWEST_ROLL = RESULTS[0]; // 1
var MEDIAN_ROLL = RESULTS[1]; // 2
var HIGHEST_ROLL = RESULTS[2]; // 3
var TOTAL = lodash_1.sum(RESULTS); // 6
describe('generateModifiedTotal', function () {
    test('when not provided a modifier, sums the results and returns the total', function () {
        expect(generateModifiedTotal_1.default(RESULTS)).toEqual(TOTAL);
    });
    test('when provided a modifier function, passes in results to that fn and returns the return value of the fn', function () {
        var modifier = function (results) { return results.length; };
        expect(generateModifiedTotal_1.default(RESULTS, modifier)).toBe(RESULTS.length);
    });
    describe('when provided a modifier object', function () {
        test('with a plus property, adds the provided amount to the total', function () {
            var modifier = { plus: 2 };
            expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL + modifier.plus);
        });
        describe('with a drop.highest property', function () {
            test('with a boolean value, it removes the highest roll and sums the rest', function () {
                var modifier = { drop: { highest: true } };
                expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL - HIGHEST_ROLL);
            });
            test('with a number value n, it removes the n highest roll and sums the rest', function () {
                var modifier = { drop: { highest: 2 } };
                expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL - (MEDIAN_ROLL + HIGHEST_ROLL));
            });
        });
        describe('with a drop.lowest property', function () {
            test('with a boolean value, it removes the lowest roll and sums the rest', function () {
                var modifier = { drop: { lowest: true } };
                expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL - LOWEST_ROLL);
            });
            test('with a number value n, it removes the n highest roll and sums the rest', function () {
                var modifier = { drop: { lowest: 2 } };
                expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL - (MEDIAN_ROLL + LOWEST_ROLL));
            });
        });
        describe('with a minus property', function () {
            test('that is positive, subtracts the value', function () {
                var modifier = { minus: 2 };
                expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL - modifier.minus);
            });
            test('that is negative, adds the value', function () {
                var modifier = { minus: -2 };
                expect(generateModifiedTotal_1.default(RESULTS, modifier)).toEqual(TOTAL + modifier.minus);
            });
        });
    });
});
//# sourceMappingURL=parameter.test.js.map