/**
 * Gets the default language for the current user.
 * @param {string} navigatorLanguage - E.g: es-ES
 * @param {{code: string}[]} supportedLanguages - E.g: [{code: "es"}, {code: en}]
 * @param {string} valueOnError - Value to return if the language is not
 * supported, or in case of error, for example 'en'.
 * @return {string}
 */
export const getDefaultLanguage = ({
    navigatorLanguage, supportedLanguages, valueOnError
}) => {
    try {
        let language = navigatorLanguage;

        if (typeof language === 'string') {
            [language] = language.split('-');

            const isSupported = supportedLanguages.filter(
                supportedLanguage => supportedLanguage.code === language
            ).length;

            if (isSupported) {
                return language;
            }
        }
    } catch (err) {}

    return valueOnError;
};
