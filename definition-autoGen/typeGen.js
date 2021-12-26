function generateTSTypeDef(typeName, possibleValues){
    let newPossibleValues = [];
    possibleValues.forEach(function(value){
        newPossibleValues.push(
            '"' + value.replace('"','\\"') + '"'
        );
    });
    return 'type ' + typeName + ' = ' + newPossibleValues.join(' | ') + ';';
}

function generateJSConstArrayDef(variableName, possibleValues){
    let newPossibleValues = [];
    possibleValues.forEach(function(value){
        newPossibleValues.push(
            '"' + value.replace('"','\\"') + '"'
        );
    });
    return (
        'const ' + variableName + ' = [\r\n'
        + '\t' + newPossibleValues.join(',\r\n\t') + '\r\n'
        + '];'
    );
}

function generateTSConstArrayDef(variableType, variableName, possibleValues){
    let newPossibleValues = [];
    possibleValues.forEach(function(value){
        newPossibleValues.push(
            '"' + value.replace('"','\\"') + '"'
        );
    });
    return (
        'const ' + variableName + ' : ' + variableType + '[] = [\r\n'
        + '\t' + newPossibleValues.join(',\r\n\t') + '\r\n'
        + '];'
    );
}

export {generateJSConstArrayDef, generateTSConstArrayDef, generateTSTypeDef};
