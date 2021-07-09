import fs from 'fs';
import pathUtil from 'path';

const jsonFilter = new RegExp('^.*\.json$','g');

function readDirectoryJSON(src){
    let allKeys = [];
    let allValues = [];
    _readDirectoryJSON(src);
    return {keys:allKeys, values:allValues};
    function _readDirectoryJSON(src){
        let paths = fs.readdirSync(src);
        paths.forEach(function(path){
            let _src = pathUtil.join(src,'/',path);
            let stat = fs.statSync(_src);
            if(stat.isFile()){
                if(jsonFilter.test(_src)){
                    _readJSON(_src);
                }
            }else if(stat.isDirectory()){
                _readDirectoryJSON(_src);
            }
        })
    }
    function _readJSON(src){
        let fileContent = fs.readFileSync(src,{encoding:'utf-8'});
        let objContent = JSON.parse(fileContent);
        for(let cKey in objContent){
            let cValue = objContent[cKey];
            if(!allKeys.includes(cKey)){
                allKeys.push(cKey);
            }
            if(!allValues.includes(cValue)){
                allValues.push(cValue);
            }
        }
    }
}

export {readDirectoryJSON};