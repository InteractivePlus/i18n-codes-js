import {LocaleCode} from './Lists/LocaleList';
import {CountryCode, allCountryCode} from './Lists/CountryList';

let loadedLocales : {
    [key in LocaleCode]?: {
        [cKey in CountryCode]: string
    }
} = {};

async function loadLocal(locale : LocaleCode) : Promise<void>{
    if(isLocaleLoaded(locale)){
        return;
    }
    loadedLocales[locale] = await import('../data/country-list/' + locale + '/country.json');
    return;
}

function isLocaleLoaded(locale : LocaleCode) : boolean{
    return (locale in loadedLocales && loadedLocales[locale] !== undefined);
}

async function getCountryName(countryCode : CountryCode, locale: LocaleCode) : Promise<string>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    //@ts-ignore
    return loadedLocales[locale][countryCode];
}

async function getCountryCode(nativeName : string, locale : LocaleCode) : Promise<CountryCode | undefined>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    for(let countryCode in loadedLocales[locale]){
        //@ts-ignore
        let countryName = loadedLocales[locale][countryCode];
        if(countryName === nativeName){
            return countryCode as CountryCode;
        }
    }
    return undefined;
}

export type {CountryCode};
export {allCountryCode};

export {loadLocal, isLocaleLoaded, loadedLocales, getCountryName, getCountryCode};