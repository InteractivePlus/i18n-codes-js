import {LocaleCode, allLocaleCode} from './Lists/LocaleList';

let loadedLocales : {
    [key in LocaleCode]?: {
        [cKey in LocaleCode]: string
    }
} = {};

async function loadLocal(locale : LocaleCode) : Promise<void>{
    if(isLocaleLoaded(locale)){
        return;
    }
    loadedLocales[locale] = await import('../data/locale-list/' + locale + '/locale.json');
    return;
}

function isLocaleLoaded(locale : LocaleCode) : boolean{
    return (locale in loadedLocales && loadedLocales[locale] !== undefined);
}

async function getLocaleName(localeCode : LocaleCode, locale: LocaleCode) : Promise<string>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    //@ts-ignore
    return loadedLocales[locale][localeCode];
}

async function getLocaleCode(nativeName : string, locale : LocaleCode) : Promise<LocaleCode | undefined>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    for(let localeCode in loadedLocales[locale]){
        //@ts-ignore
        let localeName = loadedLocales[locale][localeCode];
        if(localeName === nativeName){
            return localeCode as LocaleCode;
        }
    }
    return undefined;
}

export type {LocaleCode};
export {allLocaleCode};

export {loadLocal, isLocaleLoaded, loadedLocales, getLocaleName, getLocaleCode};