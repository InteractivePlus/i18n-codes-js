import {LocaleCode} from './Lists/LocaleList';
import {TLDCode, allTLDCode} from './Lists/TLDList';

let loadedLocales : {
    [key in LocaleCode]?: {
        [cKey in TLDCode]: string
    }
} = {};

async function loadLocal(locale : LocaleCode) : Promise<void>{
    if(isLocaleLoaded(locale)){
        return;
    }
    loadedLocales[locale] = await import('../data/tld-list/' + locale + '/tld.json');
    return;
}

function isLocaleLoaded(locale : LocaleCode) : boolean{
    return (locale in loadedLocales && loadedLocales[locale] !== undefined);
}

async function getTLDName(tldCode : TLDCode, locale: LocaleCode) : Promise<string>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    //@ts-ignore
    return loadedLocales[locale][tldCode];
}

async function getTLDCode(nativeName : string, locale : LocaleCode) : Promise<TLDCode | undefined>{
    if(!isLocaleLoaded(locale)){
        await loadLocal(locale);
    }
    for(let tldCode in loadedLocales[locale]){
        //@ts-ignore
        let tldName = loadedLocales[locale][tldCode];
        if(tldName === nativeName){
            return tldCode as TLDCode;
        }
    }
    return undefined;
}

export type {TLDCode};
export {allTLDCode};

export {loadLocal, isLocaleLoaded, loadedLocales, getTLDName, getTLDCode};