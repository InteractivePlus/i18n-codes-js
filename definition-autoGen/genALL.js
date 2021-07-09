import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const lists = [
    {
        source: '../data/country-list',
        target: '../src/Lists/CountryList.ts',
        varName: 'CountryCode',
        valueName: 'CountryName'
    },
    {
        source: '../data/currency-list',
        target: '../src/Lists/CurrencyList.ts',
        varName: 'CurrencyCode',
        valueName: 'CurrencyName'
    },
    {
        source: '../data/language-list',
        target: '../src/Lists/LanguageList.ts',
        varName: 'LanguageCode',
        valueName: 'LanguageName'
    },
    {
        source: '../data/locale-list',
        target: '../src/Lists/LocaleList.ts',
        varName: "LocaleCode",
        valueName: 'LocaleName'
    },
    {
        source: '../data/tld-list',
        target: '../src/Lists/TLDList.ts',
        varName: 'TLDCode',
        valueName: 'TLDName'
    },
];

let autoGenFileName = path.join(__dirname,'/','autogen.js');

for(let i=0; i<lists.length;i++){
    console.log('generating ' + (i+1).toString() + '/' + lists.length.toString());
    let currentItem = lists[i];
    let currentSrc = path.join(__dirname, '/', currentItem.source);
    let currentDist = path.join(__dirname,'/',currentItem.target);

    let command = 'node ' + autoGenFileName + ' ' + currentSrc + ' ' + currentDist + ' ' + currentItem.varName + ' ' + currentItem.valueName;
    console.log(execSync(command,{encoding: 'utf-8'}));
}

console.log('done!');

