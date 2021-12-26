import fs from 'fs';
import { exit } from 'process';
import {readDirectoryJSON} from './directoryJSONReader.js';
import {generateTSConstArrayDef, generateTSTypeDef} from './typeGen.js'

if(process.argv.length - 2 !== 4){
    console.log('usage: node autogen.js source_dir target_file keyVarName valueVarName');
    exit(-10000);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

try{
    let readRst = readDirectoryJSON(process.argv[2]);
    let keyStoreVarName = capitalizeFirstLetter(process.argv[4]);
    let keyArrayVarName = 'all' + keyStoreVarName;

    let writeContent = (
        '/** \r\n' +
        '  * Content Created By AutoGen\r\n' +
        '  * AutoGen Code by Yunhao Cao(Github @ ToiletCommander), Copyright 2021-2022 Interactiveplus.org \r\n' +
        '  * We use MIT license, please give credit to the original author\r\n' +
        '  * See LICENSE in the project root\r\n' +
        '*/\r\n'+
        generateTSTypeDef(keyStoreVarName,readRst.keys) + '\r\n'+
        generateTSConstArrayDef(keyStoreVarName,keyArrayVarName,readRst.keys) + '\r\n'+
        '' + //generateTSTypeDef(capitalizeFirstLetter(process.argv[5]),readRst.values) + '\r\n'
        'export type { ' + keyStoreVarName + ' };\r\n' +
        'export { ' + keyArrayVarName + ' };'
    );
    fs.writeFileSync(process.argv[3],writeContent);
}catch(err){
    console.error(err);
    exit(-11000);
}

