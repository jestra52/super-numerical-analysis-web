// @scripts
import {
    filterArray,
    getMaxFromArray,
    getMinFromArray,
    groupArray,
    paginateArray,
    sortArray
} from '../../util';

describe('sortArray', () => {
    const source = [
        { name: 'Andrés' },
        { name: 'León' },
        { name: 'Ana' },
        { name: 'Ámeno' }
    ];

    test('filterArray (default ascending)', () => {
        const copy = sortArray({
            sortKey: 'name',
            source
        });
        const expected = [source[3], source[2], source[0], source[1]];
        expect(copy).toEqual(expected);
    });

    test('filterArray (descending)', () => {
        const copy = sortArray({
            sortDirection: 'desc',
            sortKey: 'name',
            source
        });
        const expected = [source[1], source[0], source[2], source[3]];
        expect(copy).toEqual(expected);
    });
});

describe('filterArray', () => {
    const source = [
        { name: 'Andrés' },
        { name: 'León' },
        { name: 'Ana' },
        { name: 'Juan' }
    ];

    test('filterArray (simple filter)', () => {
        const copy = filterArray({
            filterKey: 'name',
            filterValue: 'J',
            source
        });
        const expected = [source[3]];
        expect(copy).toEqual(expected);
    });

    test('filterArray (case insensitive)', () => {
        const copy = filterArray({
            filterKey: 'name',
            filterValue: 'a',
            source
        });
        const expected = [source[0], source[2], source[3]];
        expect(copy).toEqual(expected);
    });

    test('filterArray (acent insensitive)', () => {
        const copy = filterArray({
            filterKey: 'name',
            filterValue: 'é',
            source
        });
        const expected = [source[0], source[1]];
        expect(copy).toEqual(expected);
    });

    test('filterArray (null filter)', () => {
        const copy = filterArray({
            filterKey: 'name',
            filterValue: null,
            source
        });
        const expected = source;
        expect(copy).toEqual(expected);
    });
});

describe('paginateArray', () => {
    const source = [
        { a: 1, b: 'A' },
        { a: 2, b: 'BA' },
        { a: 3, b: 'CBA' },
        { a: 4, b: 'DCBA' },
        { a: 5, b: 'EDCBA' }
    ];

    test('paginateArray (default sortDirection=asc and pageNumber = 1)', () => {
        const copy = paginateArray({
            pageSize: 3,
            sortKey: 'a',
            source
        });
        const expected = [source[0], source[1], source[2]];
        expect(copy).toEqual(expected);
    });

    test('paginateArray (unexisting sortKey)', () => {
        const copy = paginateArray({
            pageSize: 2,
            sortKey: 'c',
            source
        });
        const expected = [source[0], source[1]];
        expect(copy).toEqual(expected);
    });

    test('paginateArray (sort descending and complex page number)', () => {
        const copy = paginateArray({
            pageNumber: 2,
            pageSize: 2,
            sortDirection: 'desc',
            sortKey: 'b',
            source
        });
        const expected = [source[2], source[1]];
        expect(copy).toEqual(expected);
    });

    test('paginateArray (without sortKey)', () => {
        const copy = paginateArray({
            pageNumber: 2,
            pageSize: 2,
            source
        });
        const expected = [source[2], source[3]];
        expect(copy).toEqual(expected);
    });
});

describe('getMinFromArray', () => {
    test('getMinFromArray (empty array, no passing defaultValue )', () => {
        const min = getMinFromArray({
            minKey: 'a',
            source: []
        });
        const expected = null;
        expect(min).toEqual(expected);
    });
    test('getMinFromArray (empty array, passing defaultValue )', () => {
        const min = getMinFromArray({
            defaultValue: 0,
            minKey: 'a',
            source: []
        });
        const expected = 0;
        expect(min).toEqual(expected);
    });
    test('getMinFromArray (no empty array)', () => {
        const min = getMinFromArray({
            minKey: 'a',
            source: [
                { a: 100 },
                { a: 255 },
                { a: 200 },
                { a: 50 },
                { a: 201 }
            ]
        });
        const expected = 50;
        expect(min).toEqual(expected);
    });
});

describe('getMaxFromArray', () => {
    test('getMaxFromArray (empty array, no passing defaultValue )', () => {
        const max = getMaxFromArray({
            maxKey: 'a',
            source: []
        });
        const expected = null;
        expect(max).toEqual(expected);
    });
    test('getMaxFromArray (empty array, passing defaultValue )', () => {
        const max = getMaxFromArray({
            defaultValue: 0,
            maxKey: 'a',
            source: []
        });
        const expected = 0;
        expect(max).toEqual(expected);
    });
    test('getMaxFromArray (no empty array)', () => {
        const max = getMaxFromArray({
            maxKey: 'a',
            source: [
                { a: 100 },
                { a: 255 },
                { a: 200 },
                { a: 50 },
                { a: 201 }
            ]
        });
        const expected = 255;
        expect(max).toEqual(expected);
    });
});

describe('groupArray', () => {
    test('groupArray (empty array)', () => {
        const grouping = groupArray({
            key: 'a',
            source: []
        });
        const expected = [];
        expect(grouping).toEqual(expected);
    });
    test('groupArray (no empty array)', () => {
        const source = [
            { a: 'uno', b: 'A' },
            { a: 'uno', b: 'BA' },
            { a: 'dos', b: 'CBA' },
            { a: 'dos', b: 'DCBA' },
            { a: 'dos', b: 'EDCBA' }
        ];

        const grouping = groupArray({
            key: 'a',
            source
        });
        const expected = [{
            key: 'uno',
            items: [
                { a: 'uno', b: 'A' },
                { a: 'uno', b: 'BA' }
            ]
        }, {
            key: 'dos',
            items: [
                { a: 'dos', b: 'CBA' },
                { a: 'dos', b: 'DCBA' },
                { a: 'dos', b: 'EDCBA' }
            ]
        }];
        expect(grouping).toEqual(expected);
    });
});
