import { assert } from 'chai';
import { checkValueForColor } from '../lib/src/utils/color-utils';

describe('color-utils', () => {
    describe('checkValueForColor', () => {
        it('should return false if value is test', () => {
            assert.isFalse(checkValueForColor('test'));
        });
        it('should return {r:255, g:255, b:255, a:1} if value is #ffffff', () => {
            let res = checkValueForColor('#ffffff');
            assert.equal(JSON.stringify(res), JSON.stringify({r:255, g:255, b:255, a:1}));
        });
        it('should return {r:255, g:255, b:255, a:1} if value is { "r": 255, "g":255, "b":255, "a":1 }', () => {
            let res = checkValueForColor('{ "r": 255, "g":255, "b":255, "a":1 }');
            assert.equal(JSON.stringify(res), JSON.stringify({r:255, g:255, b:255, a:1}));
        });
        it('should return {r:255, g:255, b:255, a:1} if value is { r: 255, g:255, b:255, a:1 }', () => {
            let res = checkValueForColor('{ r: 255, g:255, b:255, a:1 }');
            assert.equal(JSON.stringify(res), JSON.stringify({r:255, g:255, b:255, a:1}));
        });
    });
});