import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const lists = [
    {
        source: '../data-orig/country-list/data',
        target: '../data/country-list'
    },
    {
        source: '../data-orig/currency-list/data',
        target: '../data/currency-list'
    },
    {
        source: '../data-orig/language-list/data',
        target: '../data/language-list'
    },
    {
        source: '../data-orig/locale-list/data',
        target: '../data/locale-list'
    },
    {
        source: '../data-orig/tld-list/data',
        target: '../data/tld-list'
    }
];

let autoGenFileName = path.join(__dirname,'/','autogen.js');

for(let i=0; i<lists.length;i++){
    console.log('generating ' + (i+1).toString() + '/' + lists.length.toString());
    let currentItem = lists[i];
    let currentSrc = path.join(__dirname, '/', currentItem.source);
    let currentDist = path.join(__dirname,'/',currentItem.target);
    console.log(execSync('node ' + autoGenFileName + ' ' + currentSrc + ' ' + currentDist,{encoding: 'utf-8'}));
}

console.log('done!');

