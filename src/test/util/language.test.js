// @scripts
import { getDefaultLanguage } from '../../util';

describe('getDefaultLanguage', () => {
    const supportedLanguages = [{ code: 'es' }, { code: 'en' }, { code: 'fr' }];
    const valueOnError = supportedLanguages[2].code;

    test('getDefaultLanguage (navigatorLanguage is undefined)', () => {
        const defaultLanguage = getDefaultLanguage({
            navigatorLanguage: undefined, supportedLanguages, valueOnError
        });
        expect(defaultLanguage).toEqual(valueOnError);
    });

    test('getDefaultLanguage (navigatorLanguage is defined but invalid)', () => {
        const defaultLanguage = getDefaultLanguage({
            navigatorLanguage: 'english', supportedLanguages, valueOnError
        });
        expect(defaultLanguage).toEqual(valueOnError);
    });

    test('getDefaultLanguage (navigatorLanguage is valid but not supported)', () => {
        const defaultLanguage = getDefaultLanguage({
            navigatorLanguage: 'de-CH', supportedLanguages, valueOnError
        });
        expect(defaultLanguage).toEqual(valueOnError);
    });

    test('getDefaultLanguage (navigatorLanguage is valid and supported)', () => {
        const defaultLanguage = getDefaultLanguage({
            navigatorLanguage: 'en-US', supportedLanguages, valueOnError
        });
        expect(defaultLanguage).toEqual('en');
    });
});
