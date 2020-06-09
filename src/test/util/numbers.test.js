// @scripts
import { round, toExponentialString } from '../../util';

test('round 1', () => {
    const number = 1.199999;
    const roundedNumber = round(number, 2);
    const expectedNumber = 1.20;
    expect(roundedNumber).toEqual(expectedNumber);
});

test('round 2', () => {
    const number = 1.999999;
    const roundedNumber = round(number, 2);
    const expectedNumber = 2;
    expect(roundedNumber).toEqual(expectedNumber);
});

test('toExponentialString 1', () => {
    const number = 0.00001;
    const numberInExponentialNotation = toExponentialString(number, 4);
    const expectedString = '1.0000e-5';
    expect(numberInExponentialNotation).toEqual(expectedString);
});
