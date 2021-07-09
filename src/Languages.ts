import {LocaleCode} from './Lists/LocaleList';
import {LanguageCode, allLanguageCode} from './Lists/LanguageList';

let loadedLocales : {
    [key in LocaleCode]?: {
        [cKey in LanguageCode]: string
    }
} = {};

async function loadLocal(locale : LocaleCode) : Promise<void>{
    if(isLocaleLoaded(locale)){
        return;
    }
    loadedLocales[locale] = await import('../data/language-list/' + locale + '/language.json');
    return;
}

function isLocaleLoaded(locale : LocaleCode) : boolean{
    return (locale in loadedLocales && loadedLocales[locale] !== undefined);
}

async function getLanguageName(languageCode : LanguageCode, locale: LocaleCode) : Promise<string>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    //@ts-ignore
    return loadedLocales[locale][languageCode];
}

async function getLanguageCode(nativeName : string, locale : LocaleCode) : Promise<LanguageCode | undefined>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    for(let languageCode in loadedLocales[locale]){
        //@ts-ignore
        let languageName = loadedLocales[locale][languageCode];
        if(languageName === nativeName){
            return languageCode as LanguageCode;
        }
    }
    return undefined;
}

export type {LanguageCode};
export {allLanguageCode};

export {loadLocal, isLocaleLoaded, loadedLocales, getLanguageName, getLanguageCode};