import * as acorn from "acorn";


const testASR = `{\n    "type": "Program",\n    "start": 0,\n    "end": 38,\n    "body": [\n        {\n            "type": "VariableDeclaration",\n            "start": 0,\n            "end": 12,\n            "declarations": [\n                {\n                    "type": "VariableDeclarator",\n                    "start": 4,\n                    "end": 12,\n                    "id": {\n                        "type": "Identifier",\n                        "start": 4,\n                        "end": 5,\n                        "name": "a"\n                    },\n                    "init": {\n                        "type": "CallExpression",\n                        "start": 8,\n                        "end": 12,\n                        "callee": {\n                            "type": "Identifier",\n                            "start": 8,\n                            "end": 9,\n                            "name": "g"\n                        },\n                        "arguments": [\n                            {\n                                "type": "Identifier",\n                                "start": 10,\n                                "end": 11,\n                                "name": "k"\n                            }\n                        ]\n                    }\n                }\n            ],\n            "kind": "var"\n        },\n        {\n            "type": "VariableDeclaration",\n            "start": 13,\n            "end": 24,\n            "declarations": [\n                {\n                    "type": "VariableDeclarator",\n                    "start": 17,\n                    "end": 24,\n                    "id": {\n                        "type": "Identifier",\n                        "start": 17,\n                        "end": 18,\n                        "name": "b"\n                    },\n                    "init": {\n                        "type": "Literal",\n                        "start": 21,\n                        "end": 24,\n                        "value": 600,\n                        "raw": "600"\n                    }\n                }\n            ],\n            "kind": "var"\n        },\n        {\n            "type": "VariableDeclaration",\n            "start": 25,\n            "end": 38,\n            "declarations": [\n                {\n                    "type": "VariableDeclarator",\n                    "start": 29,\n                    "end": 38,\n                    "id": {\n                        "type": "Identifier",\n                        "start": 29,\n                        "end": 30,\n                        "name": "c"\n                    },\n                    "init": {\n                        "type": "BinaryExpression",\n                        "start": 33,\n                        "end": 38,\n                        "left": {\n                            "type": "Identifier",\n                            "start": 33,\n                            "end": 34,\n                            "name": "a"\n                        },\n                        "operator": "+",\n                        "right": {\n                            "type": "Identifier",\n                            "start": 37,\n                            "end": 38,\n                            "name": "b"\n                        }\n                    }\n                }\n            ],\n            "kind": "var"\n        }\n    ],\n    "sourceType": "module"\n}`;

class Node {
    constructor(type, start, end) {
        this.type = type;
        this.start = start;
        this.end = end;
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
