//import * as acorn from "acorn";


const testASR = `{"type": "Program",\n  "start": 0,\n  "end": 198,\n  "body": [\n    {\n      "type": "ImportDeclaration",\n      "start": 0,\n      "end": 20,\n      "specifiers": [],\n      "source": {\n        "type": "Literal",\n        "start": 7,\n        "end": 20,\n        "value": "x86intrin.h",\n        "raw": "\\"x86intrin.h\\""\n      }\n    },\n    {\n      "type": "FunctionDeclaration",\n      "start": 22,\n      "end": 198,\n      "id": {\n        "type": "Identifier",\n        "start": 31,\n        "end": 40,\n        "name": "PrefixSum"\n      },\n      "generator": false,\n      "expression": false,\n      "params": [\n        {\n          "type": "Identifier",\n          "start": 41,\n          "end": 45,\n          "name": "curr"\n        }\n      ],\n      "body": {\n        "type": "BlockStatement",\n        "start": 47,\n        "end": 198,\n        "body": [\n          {\n            "type": "VariableDeclaration",\n            "start": 53,\n            "end": 87,\n            "declarations": [\n              {\n                "type": "VariableDeclarator",\n                "start": 57,\n                "end": 86,\n                "id": {\n                  "type": "Identifier",\n                  "start": 57,\n                  "end": 60,\n                  "name": "Add"\n                },\n                "init": {\n                  "type": "CallExpression",\n                  "start": 63,\n                  "end": 86,\n                  "callee": {\n                    "type": "Identifier",\n                    "start": 63,\n                    "end": 77,\n                    "name": "_mm_slli_si128"\n                  },\n                  "arguments": [\n                    {\n                      "type": "Identifier",\n                      "start": 78,\n                      "end": 82,\n                      "name": "curr"\n                    },\n                    {\n                      "type": "Literal",\n                      "start": 84,\n                      "end": 85,\n                      "value": 4,\n                      "raw": "4"\n                    }\n                  ]\n                }\n              }\n            ],\n            "kind": "let"\n          },\n          {\n            "type": "ExpressionStatement",\n            "start": 92,\n            "end": 124,\n            "expression": {\n              "type": "AssignmentExpression",\n              "start": 92,\n              "end": 123,\n              "operator": "=",\n              "left": {\n                "type": "Identifier",\n                "start": 92,\n                "end": 96,\n                "name": "curr"\n              },\n              "right": {\n                "type": "CallExpression",\n                "start": 99,\n                "end": 123,\n                "callee": {\n                  "type": "Identifier",\n                  "start": 99,\n                  "end": 112,\n                  "name": "_mm_add_epi32"\n                },\n                "arguments": [\n                  {\n                    "type": "Identifier",\n                    "start": 113,\n                    "end": 117,\n                    "name": "curr"\n                  },\n                  {\n                    "type": "Identifier",\n                    "start": 119,\n                    "end": 122,\n                    "name": "Add"\n                  }\n                ]\n              }\n            }\n          },\n          {\n            "type": "ExpressionStatement",\n            "start": 129,\n            "end": 159,\n            "expression": {\n              "type": "AssignmentExpression",\n              "start": 129,\n              "end": 158,\n              "operator": "=",\n              "left": {\n                "type": "Identifier",\n                "start": 129,\n                "end": 132,\n                "name": "Add"\n              },\n              "right": {\n                "type": "CallExpression",\n                "start": 135,\n                "end": 158,\n                "callee": {\n                  "type": "Identifier",\n                  "start": 135,\n                  "end": 149,\n                  "name": "_mm_slli_si128"\n                },\n                "arguments": [\n                  {\n                    "type": "Identifier",\n                    "start": 150,\n                    "end": 154,\n                    "name": "curr"\n                  },\n                  {\n                    "type": "Literal",\n                    "start": 156,\n                    "end": 157,\n                    "value": 8,\n                    "raw": "8"\n                  }\n                ]\n              }\n            }\n          },\n          {\n            "type": "ReturnStatement",\n            "start": 164,\n            "end": 196,\n            "argument": {\n              "type": "CallExpression",\n              "start": 171,\n              "end": 195,\n              "callee": {\n                "type": "Identifier",\n                "start": 171,\n                "end": 184,\n                "name": "_mm_add_epi32"\n              },\n              "arguments": [\n                {\n                  "type": "Identifier",\n                  "start": 185,\n                  "end": 189,\n                  "name": "curr"\n                },\n                {\n                  "type": "Identifier",\n                  "start": 191,\n                  "end": 194,\n                  "name": "Add"\n                }\n              ]\n            }\n          }\n        ]\n      }\n    }\n  ],\n  "sourceType": "module"\n}`
class Node {
    constructor(type, name, line) {
        this.type = type;
        this.name = name;
        this.line = line;
    }
}

export function generateAST(editor) {
    //let code = editor.doc.getValue();
    // code = cleanExpression(code);
    // let ast = new Node("Program", 0, code.length);
    // ast.body = recursiveASTBuilder(code, 0, 0);

    //code = code.replace(new RegExp('int', 'g'), 'let');

    //return acorn.parse(code)

    //Temporary.. We disable AST parsing.. We"ll come back to AST later.
    return JSON.parse(testASR)
}

const getBitWidth = (type) => {
    switch (type.replace(/unsigned /g, '')) {
        case "long":
        case "long long":
        case "double":
            return 64;
        case "float":
        case "int":
            return 32;
        case "short":
            return 16;
        case "char":
            return 8;
        default:
            console.log(`hmm... I don't know this type: ${type}...`);
            return null;
    }
};

const simplifyType = (complexType) => {
    if (complexType === 'double' || complexType === 'float')
        return 'float';
    else
        return 'int'
};

const functionName = /([\w]+)\(.* # @.*/;
const functionParams = /\b[^()]+\((.*)\)$/;
const vectorParam = /(.*)[ ](__vector\(([0-9]+)\))/;

export function generateASM(rawAsm) {
    let asm = [];
    let currentFunction = {
        body: []
    };
    rawAsm.forEach(line => {
        if (functionName.test(line.text)) {
            let name = functionName.exec(line.text)[1];
            let func = rawAsm[0].text.replace(/:.*/g, '');
            let params = functionParams.exec(func)[1].split(", ");
            let parsedParams = [];
            params.forEach((p) => {
                if (vectorParam.test(p)) {
                    const parsedParam = vectorParam.exec(p);
                    parsedParams.push({
                        lanes: +parsedParam[3],
                        type: simplifyType(parsedParam[1]),
                        bitWidth: getBitWidth(parsedParam[1]),
                        base: 10 //decimal
                    })
                }
                else {
                    parsedParams.push({
                        lanes: 1,
                        type: simplifyType(p),
                        bitWidth: getBitWidth(p),
                        base: 10 //decimal
                    })
                }
            });
            currentFunction = new Node("Function", name, 0);
            currentFunction.body = [];
            currentFunction.params = parsedParams;
            asm.push(currentFunction);
        }
        else if (line.text.length > 0 && line.source) {
            // Remove comments, commas, trim it and then split
            let command = line.text.trim().replace(/,| #.*/g, '').split(" ");
            let name = command[0];
            let params = command.slice(1, command.length);

            let node = new Node("Command", name, line.source.line);
            node.params = params;
            currentFunction.body.push(node);
        }
    });
    return asm
}


// function recursiveASTBuilder(code, start) {
//     let ast = [];
//
//     if (isAssignExpr(code)) {
//         let tokens = getAssignExpr(code);
//         let end = start + code.length;
//         let node = new Node("VariableDeclaration", start, end)
//         node.kind = tokens[1];
//         console.log(tokens);
//         ast.push(node)
//     }
//     if (isFuncDeclaration(code)) {
//         let tokens = getFuncDeclaration(code);
//         let end = start + code.length;
//         let node = new Node("FunctionDeclaration", start, end)
//         ast.push(node)
//     }
//     if (isFuncCall(code)) {
//         let tokens = getFuncCall(code);
//         let end = start + code.length;
//         let node = new Node("FunctionCall", start, end)
//         ast.push(node)
//     }
//     if (isReturnExpr(code)) {
//         let tokens = getReturnExpr(code);
//         let end = start + code.length;
//         let node = new Node("ReturnExpression", start, end)
//         ast.push(node)
//     }
//
//
//     return ast;
// }
//
// function cleanExpression(s){ //just supress superfluous space and other invisible characters
//     return (s.replace(/\s{1,}/g, ' ')).trim();
// }
//
// function extractExpression(s){     //this function extract the different expressions of a given c code, by expression we mean a piece of code situated after a ';' or a '{' and ended either by ';' or by '}'.This extract the expressions at the "same level"
//     s=cleanExpression(s);
//     var accoladeIndication=0;
//     var expresions=[];
//     const delimiters=new Set([';', '}']);
//     var i=s.indexOf('{')+1,lengthS=s.lastIndexOf('}'); // we first determine the begining and the ending of the piece of c code
//     var  semicolonPosition=i;
//     while(i<lengthS){
//         if (s[i]==='{'){
//             accoladeIndication++; //indicates if we are not inside an expression
//         }
//         if (s[i]==='}'){
//             accoladeIndication--;
//         }
//
//         if(delimiters.has(s[i]) && accoladeIndication === 0){ // if the caracter is a delimiter of expression and if we are not inside an expression
//             expresions.push((s.slice(semicolonPosition+1, i)).trim()) //we extract the expression begining from the last delimiter to this delimiter
//             semicolonPosition=i; // we save the position of this delimiter
//         }
//         i++;
//     }
//     return expresions;
// }
//
// function extractParameter(s){     //this function extract the different effective parameter of a c function (call function)
//     s=cleanExpression(s);
//     var semicolonIndication=0;
//     var expresions=[];
//     const delimiters=new Set([',']);
//     var i=0,lengthS=s.length; // we first determine the begining and the ending of the parameter previously extracted
//     var  semicolonPosition=i;
//     while(i<lengthS){
//         if (s[i]==='('){
//             semicolonIndication++; //indicates if we are not inside an expression
//         }
//         if (s[i]===')'){
//             semicolonIndication--;
//         }
//
//         if(delimiters.has(s[i]) && semicolonIndication === 0){ // if the caracter is a delimiter of expression and if we are not inside an expression
//             expresions.push((s.slice(semicolonPosition, i)).trim()) //we extract the expression begining from the last delimiter to this delimiter
//             semicolonPosition=i+1; // we save the position of this delimiter
//         }
//         i++;
//         if(i===lengthS){
//             expresions.push((s.slice(semicolonPosition, i)).trim()) //to take the last string
//         }
//     }
//     return expresions;
// }
//
// function processCCode(cCode){
//     var tab=[];
//     if(isSimpleExpression(cCode)){
//         tab=Array.of(cCode);
//         return tab;
//     }
//     if(regexFunctionDeclar.test(cCode)){
//         var t=extractExpression(cCode);
//         t.push('body');
//         tab=Array.of(regexFunctionDeclar.exec(cCode)[2], ['returntype',[regexFunctionDeclar.exec(cCode)[1]]],t.reverse());
//         for(var j=1; j<tab[2].length; j++){
//             if (isSimpleExpression(tab[2][j])){
//                 tab[2][j]=Array.of(tab[2][j]);
//                 continue;
//             }
//             else{
//                 tab[2][j]=processCCode(tab[2][j]);
//             }
//
//         }
//         return tab;
//     }
//
//     if(regexFunctionCall.test(cCode)){
//         var paramString = regexFunctionCall.exec(cCode)[2]
//         var t=extractParameter(paramString);
//         t.push('parameters');
//         tab=Array.of(regexFunctionCall.exec(cCode)[1], t.reverse());
//         for(var j=1; j<tab[1].length; j++){
//             if (isSimpleExpression(tab[1][j])){
//                 tab[1][j]=Array.of(tab[1][j]);
//                 continue;
//             }
//             else{
//                 tab[1][j]=processCCode(tab[1][j]);
//             }
//
//         }
//         return tab;
//     }
//     if(regexAssignExpr.test(cCode)){
//         var regArray = regexAssignExpr.exec(cCode)
//         tab=Array.of('=',[regArray[2],[regArray[1]]], [regArray[3]]);
//         if (isSimpleExpression(tab[2][0])){
//             tab[2][0]=Array.of(tab[2][0]);
//         }
//         else
//         {
//             tab[2][0]=processCCode(tab[2][0]);
//         }
//
//
//         return tab;
//     }
//     if(regexReturnExpr.test(cCode)){
//         tab=Array.of('return',[regexReturnExpr.exec(cCode)[1]]);
//         if (isSimpleExpression(tab[1][0])){
//             tab[1][0]=Array.of(tab[1][0]);
//         }
//         else
//         {
//             tab[1][0]=processCCode(tab[1][0]);
//         }
//
//
//         return tab;
//     }
//
//
// }
//
// function isSimpleExpression(s){
//     return !(isFuncDeclaration(s)||isFuncCall(s)||isAssignExpr(s)||isReturnExpr(s));
// }
//
// function identifyNatureOfExpr(s){
//     var regex=/^\s*(?:void|char|uint8_t|short|int|long|float|double|signed|unsigned|Bool|Complex|__m128|__m128d|__m128i|__m256|__m256d|__m256i|__m512|__m512d|__m512i)\s+(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s*\(\s*(?:void|char|uint8_t|short|int|long|float|double|signed|unsigned|Bool|Complex|__m128|__m128d|__m128i|__m256|__m256d|__m256i|__m512|__m512d|__m512i)\s+(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s*(?:,(?:void|char|uint8_t|short|int|long|float|double|signed|unsigned|Bool|Complex|__m128|__m128d|__m128i|__m256|__m256d|__m256i|__m512|__m512d|__m512i)\s+(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s*)*\s*(?:\)\s*(?=\{))/;
// }
//
// const regexFunctionDeclar=/^\s*([_$a-zA-Z][_$a-zA-Z0-9]*)\s+([_$a-zA-Z][_$a-zA-Z0-9]*)\s*\(\s*(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s+\*?(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s*(?:,(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s+\*?(?:[_$a-zA-Z][_$a-zA-Z0-9]*)\s*)*\s*(?:\)\s*(?=\{))/;
// const regexFunctionCall=/^\s*([_$a-zA-Z][_$a-zA-Z0-9]*)\s*\((.*)(?=\)$|\)(?=;))/;
// const regexReturnExpr=/^\s*return\s+(.*)/;
// const regexAssignExpr=/^\s*(?:([_a-zA-Z][\._a-zA-Z0-9]*)\s+)?([\*_$a-zA-Z][\._a-zA-Z0-9]*)\s*=\s*(.*)/;
//
// function isFuncDeclaration(code) {
//     return regexFunctionDeclar.test(code)
// }
// function isFuncCall(code) {
//     return regexFunctionCall.test(code)
// }
// function isReturnExpr(code) {
//     return regexReturnExpr.test(code)
// }
// function isAssignExpr(code) {
//     return regexAssignExpr.test(code)
// }
// function getFuncDeclaration(code) {
//     return regexFunctionDeclar.exec(code);
// }
// function getFuncCall(code) {
//     return regexFunctionCall.exec(code);
// }
// function getReturnExpr(code) {
//     return regexReturnExpr.exec(code);
// }
// function getAssignExpr(code) {
//     return regexAssignExpr.exec(code);
// }
