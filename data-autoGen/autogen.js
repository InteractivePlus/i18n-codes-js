import {copyDir} from './FileUtil.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

if(process.argv.length - 2 !== 2){
    console.log('usage: node autogen.js source_dir target_dir');
    process.exit(-1);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
}catch(err){
    console.log(err);
}