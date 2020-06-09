// @scripts
import { format, removeAccents, toMoneyString } from '../../util';

describe('format', () => {
    test('format (no args)', () => {
        expect(format('Hello World {0}')).toEqual('Hello World {0}');
    });

    test('format (1 string arg)', () => {
        expect(format('Hello World {0}', 'Pepitp')).toEqual('Hello World Pepitp');
    });

    test('format (2 string args)', () => {
        expect(format('Hello World {0} {1}', 'Pepito', 'Perez')).toEqual('Hello World Pepito Perez');
    });

    test('format (complex scenario)', () => {
        expect(format('...{0}...{1}...{0}...', 1, 2, 3)).toEqual('...1...2...1...');
    });
});

test('removeAccents', () => {
    expect(removeAccents('Itagüí')).toEqual('Itagui');
});

test('toMoneyString', () => {
    expect(toMoneyString({ number: 89.346, decimals: 2 })).toEqual('$ 89.35');
});
