"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
describe('D objects', function () {
    test('can be created when provided a side', function () {
        expect(new index_1.default(6)).not.toThrowError;
    });
});
var RollCoreTests = function (_a) {
    var _b = _a === void 0 ? {} : _a, n = _b.n, modifier = _b.modifier;
    var D6 = new index_1.default(6);
    var initialLogLength = D6.log.length;
    var total;
    if (n && modifier) {
        total = D6.roll(n, modifier);
    }
    else if (n) {
        total = D6.roll(n);
    }
    else {
        total = D6.roll();
    }
    var latestRollLog = D6.log[0];
    test('returns a number', function () {
        expect(Number.isInteger(total)).toBe(true);
    });
    test('adds a log of the roll', function () {
        expect(D6.log.length - initialLogLength).toEqual(1);
    });
    test('logs a results array equal in length to the number of die rolled', function () {
        expect(latestRollLog.results.length).toEqual(n || 1);
    });
    test('logs the total', function () {
        expect(latestRollLog.total).toEqual(total);
    });
    test('logs the date time of the roll', function () {
        expect(latestRollLog.dateRolled).toBeInstanceOf(Date);
    });
    if (modifier) {
        test('logs the modifier used in the total calculation', function () {
            expect(latestRollLog.modifier).toEqual(modifier);
        });
    }
};
describe('D methods:', function () {
    describe('#roll', function () {
        describe('(n)', function () {
            describe('with a modifier', function () {
                RollCoreTests({ n: 3, modifier: function () { return 4; } });
            });
            describe('without a modifier', function () {
                RollCoreTests({ n: 3 });
            });
        });
        describe('()', function () {
            RollCoreTests();
        });
    });
});
//# sourceMappingURL=index.test.js.map