// @scripts
import {
    copyObjExludingProps,
    copyObjInCamelCase,
    copyObjInPascalCase,
    copyObjIncludingProps,
    toEditableObject
} from '../../util';

test('copyObjIncludingProps', () => {
    const source = { a: 1, b: 2, c: 3 };
    const copy = copyObjIncludingProps(source, ['a', 'c']);
    const expected = { a: 1, c: 3 };
    expect(copy).toEqual(expected);
});

test('copyObjExludingProps', () => {
    const source = { a: 1, b: 2, c: 3 };
    const copy = copyObjExludingProps(source, ['a', 'c']);
    const expected = { b: 2 };
    expect(copy).toEqual(expected);
});

describe('copyObjInCamelCase', () => {
    test('copyObjInCamelCase (simple object)', () => {
        const source = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin'
        };
        const copy = copyObjInCamelCase(source);
        const expected = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        expect(copy).toEqual(expected);
    });

    test('copyObjInCamelCase (simple object already camelCase)', () => {
        const source = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        const copy = copyObjInCamelCase(source);
        const expected = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        expect(copy).toEqual(expected);
    });

    test('copyObjInCamelCase (simple array)', () => {
        const source = [{
            UserEmail: 'admin1@domain.com',
            UserName: 'Admin1'
        }, {
            UserEmail: 'admin2@domain.com',
            UserName: 'Admin2'
        }];
        const copy = copyObjInCamelCase(source);
        const expected = [{
            userEmail: 'admin1@domain.com',
            userName: 'Admin1'
        }, {
            userEmail: 'admin2@domain.com',
            userName: 'Admin2'
        }];
        expect(copy).toEqual(expected);
    });

    test('copyObjInCamelCase (complex object)', () => {
        const source = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin',
            Permissions: [
                'Permission1',
                'Permission2'
            ],
            RecentSearches: [
                { Id: 6, Description: 'Andes' },
                {
                    Id: 54,
                    Description: 'Gómez Plata',
                    MoreData: [{ Prop1: 1 }, { Prop2: 2 }]
                }
            ]
        };
        const copy = copyObjInCamelCase(source);
        const expected = {
            userEmail: 'admin@domain.com',
            userName: 'Admin',
            permissions: [
                'Permission1',
                'Permission2'
            ],
            recentSearches: [
                { id: 6, description: 'Andes' },
                {
                    id: 54,
                    description: 'Gómez Plata',
                    moreData: [{ prop1: 1 }, { prop2: 2 }]
                }
            ]
        };
        expect(copy).toEqual(expected);
    });
});

describe('copyObjInPascalCase', () => {
    test('copyObjInPascalCase (simple object)', () => {
        const source = {
            userEmail: 'admin@domain.com',
            userName: 'Admin'
        };
        const copy = copyObjInPascalCase(source);
        const expected = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin'
        };
        expect(copy).toEqual(expected);
    });

    test('copyObjInPascalCase (simple object already PascalCase)', () => {
        const source = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin'
        };
        const copy = copyObjInPascalCase(source);
        const expected = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin'
        };
        expect(copy).toEqual(expected);
    });

    test('copyObjInPascalCase (simple array)', () => {
        const source = [{
            userEmail: 'admin1@domain.com',
            userName: 'Admin1'
        }, {
            userEmail: 'admin2@domain.com',
            userName: 'Admin2'
        }];
        const copy = copyObjInPascalCase(source);
        const expected = [{
            UserEmail: 'admin1@domain.com',
            UserName: 'Admin1'
        }, {
            UserEmail: 'admin2@domain.com',
            UserName: 'Admin2'
        }];
        expect(copy).toEqual(expected);
    });

    test('copyObjInPascalCase (complex object)', () => {
        const source = {
            userEmail: 'admin@domain.com',
            userName: 'Admin',
            permissions: [
                'Permission1',
                'Permission2'
            ],
            recentSearches: [
                { id: 6, description: 'Andes' },
                {
                    id: 54,
                    description: 'Gómez Plata',
                    moreData: [{ prop1: 1 }, { prop2: 2 }]
                }
            ]
        };
        const copy = copyObjInPascalCase(source);
        const expected = {
            UserEmail: 'admin@domain.com',
            UserName: 'Admin',
            Permissions: [
                'Permission1',
                'Permission2'
            ],
            RecentSearches: [
                { Id: 6, Description: 'Andes' },
                {
                    Id: 54,
                    Description: 'Gómez Plata',
                    MoreData: [{ Prop1: 1 }, { Prop2: 2 }]
                }
            ]
        };
        expect(copy).toEqual(expected);
    });
});

describe('toEditableObject', () => {
    test('toEditableObject (simple object)', () => {
        const source = { a: 1, b: 2, c: 3 };
        const copy = toEditableObject(source);
        const expected = {
            a: { isValid: true, value: 1 },
            b: { isValid: true, value: 2 },
            c: { isValid: true, value: 3 }
        };
        expect(copy).toEqual(expected);
    });

    test('toEditableObject (object without properties)', () => {
        const source = {};
        const copy = toEditableObject(source);
        const expected = {};
        expect(copy).toEqual(expected);
    });

    test('toEditableObject (object is null)', () => {
        const source = null;
        const copy = toEditableObject(source);
        const expected = {};
        expect(copy).toEqual(expected);
    });

    test('toEditableObject (object is undefined)', () => {
        const source = undefined;
        const copy = toEditableObject(source);
        const expected = {};
        expect(copy).toEqual(expected);
    });
});
