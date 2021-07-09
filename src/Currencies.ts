import {LocaleCode} from './Lists/LocaleList';
import {CurrencyCode, allCurrencyCode} from './Lists/CurrencyList';

let loadedLocales : {
    [key in LocaleCode]?: {
        [cKey in CurrencyCode]: string
    }
} = {};

async function loadLocal(locale : LocaleCode) : Promise<void>{
    if(isLocaleLoaded(locale)){
        return;
    }
    loadedLocales[locale] = await import('../data/currency-list/' + locale + '/currency.json');
    return;
}

function isLocaleLoaded(locale : LocaleCode) : boolean{
    return (locale in loadedLocales && loadedLocales[locale] !== undefined);
}

async function getCurrencyName(currencyCode : CurrencyCode, locale: LocaleCode) : Promise<string>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    //@ts-ignore
    return loadedLocales[locale][currencyCode];
}

async function getCurrencyCode(nativeName : string, locale : LocaleCode) : Promise<CurrencyCode | undefined>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    for(let currencyCode in loadedLocales[locale]){
        //@ts-ignore
        let currencyName = loadedLocales[locale][currencyCode];
        if(currencyName === nativeName){
            return currencyCode as CurrencyCode;
        }
    }
    return undefined;
}

export type {CurrencyCode};
export {allCurrencyCode};
export {loadLocal, isLocaleLoaded, loadedLocales, getCurrencyName, getCurrencyCode};