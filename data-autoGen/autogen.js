import { exit } from 'process';
import {copyDir} from './FileUtil.js';

if(process.argv.length - 2 !== 2){
    console.log('usage: node autogen.js source_dir target_dir');
    exit(-10000);
}


let canCopyFilePreg = new RegExp('^.*\.json$','g');
let filterFunc = (isFile, srcFileName, distFileName) => {
    if(isFile){
        return canCopyFilePreg.test(srcFileName);
    }else{
        return true;
    }
}

try{
    copyDir(process.argv[2],process.argv[3],filterFunc);
    exit(0);
}catch(err){
    console.error(err);
    exit(-11000);
}