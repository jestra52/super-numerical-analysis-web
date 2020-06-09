// @scripts
import {
    isAllPropsValid,
    isDate,
    isEmail,
    isName,
    isNumber,
    isPhone,
    isZip
} from '../../util';

describe('isAllPropsValid', () => {
    test('isAllPropsValid (true)', () => {
        const obj = { a: 1, usr: { isValid: true }, pwd: { isValid: true } };
        expect(isAllPropsValid(obj)).toEqual(true);
    });

    test('isAllPropsValid, with hidden props (true)', () => {
        const obj = { a: 1, usr: { isValid: true }, pwd: { isValid: false, visible: false } };
        expect(isAllPropsValid(obj)).toEqual(true);
    });

    test('isAllPropsValid (false)', () => {
        const obj = { a: 1, usr: { isValid: true }, pwd: { isValid: false } };
        expect(isAllPropsValid(obj)).toEqual(false);
    });
});

describe('isNumber', () => {
    test('isNumber (empty)', () => {
        expect(isNumber('')).toEqual(false);
    });

    test('isNumber (null)', () => {
        expect(isNumber(null)).toEqual(false);
    });

    test('isNumber (undefined)', () => {
        expect(isNumber(undefined)).toEqual(false);
    });

    test('isNumber (invalid integer)', () => {
        expect(isNumber('abc')).toEqual(false);
    });

    test('isNumber (invalid decimal)', () => {
        expect(isNumber('abc.de', 2)).toEqual(false);
    });

    test('isNumber (valid integer)', () => {
        expect(isNumber('45')).toEqual(true);
    });

    test('isNumber (valid decimal)', () => {
        expect(isNumber('456.23', 2)).toEqual(true);
    });

    test('isNumber (valid negative integer)', () => {
        expect(isNumber('-45', 0, true)).toEqual(true);
    });

    test('isNumber (valid negative decimal)', () => {
        expect(isNumber('-456.23', 2, true)).toEqual(true);
    });
});

describe('isDate', () => {
    test('isEmail (null)', () => {
        expect(isDate(null)).toEqual(false);
    });

    test('isDate (empty)', () => {
        expect(isDate('')).toEqual(false);
    });

    test('isDate (invalid string)', () => {
        expect(isDate('<fvb sfjbbvbf')).toEqual(false);
    });

    test('isDate (invalid day)', () => {
        expect(isDate('60/01/2000', 'DD/MM/YYYY')).toEqual(false);
    });

    test('isDate (invalid month)', () => {
        expect(isDate('01/60/2000', 'DD/MM/YYYY')).toEqual(false);
    });

    test('isDate (invalid year)', () => {
        expect(isDate('01/01/XXXX', 'DD/MM/YYYY')).toEqual(false);
    });

    test('isDate (a valid one)', () => {
        expect(isDate('01/01/2000', 'DD/MM/YYYY')).toEqual(true);
    });
});

describe('isEmail', () => {
    test('isEmail (null)', () => {
        expect(isEmail(null)).toEqual(false);
    });

    test('isEmail (empty)', () => {
        expect(isEmail('')).toEqual(false);
    });

    test('isEmail (invalid string)', () => {
        expect(isEmail('<fvb sfjbbvbf')).toEqual(false);
    });

    test('isEmail (almost valid)', () => {
        expect(isEmail('admin@domain.')).toEqual(false);
    });

    test('isEmail (valid email)', () => {
        expect(isEmail('admin@domain.com')).toEqual(true);
    });
});

describe('isName', () => {
    test('isName (null)', () => {
        expect(isName(null)).toEqual(true);
    });

    test('isName (empty)', () => {
        expect(isName('')).toEqual(false);
    });

    test('isName (invalid string)', () => {
        expect(isName('<fvb sfjbbvbf')).toEqual(false);
    });

    test('isName (valid name)', () => {
        expect(isName('Jim Morrison')).toEqual(true);
    });
});

describe('isPhone', () => {
    test('isPhone (null)', () => {
        expect(isPhone(null)).toEqual(false);
    });

    test('isPhone (empty)', () => {
        expect(isPhone('')).toEqual(false);
    });

    test('isPhone (invalid string)', () => {
        expect(isPhone('<fvb sfjbbvbf')).toEqual(false);
    });

    test('isPhone (valid phone)', () => {
        expect(isPhone('3043499162')).toEqual(true);
    });
});

describe('isZip', () => {
    test('isZip (null)', () => {
        expect(isZip(null)).toEqual(false);
    });

    test('isZip (empty)', () => {
        expect(isZip('')).toEqual(false);
    });

    test('isZip (invalid string)', () => {
        expect(isZip('<fvb sfjbbvbf')).toEqual(false);
    });

    test('isZip (valid short zip)', () => {
        expect(isZip('12345')).toEqual(true);
    });

    test('isZip (valid long zip)', () => {
        expect(isZip('12345-6789')).toEqual(true);
    });
});
