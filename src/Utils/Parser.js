import * as acorn from "acorn";

const testASR = `{
    "type": "Program",
    "start": 0,
    "end": 38,
    "body": [
        {
            "type": "VariableDeclaration",
            "start": 0,
            "end": 12,
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "start": 4,
                    "end": 12,
                    "id": {
                        "type": "Identifier",
                        "start": 4,
                        "end": 5,
                        "name": "a"
                    },
                    "init": {
                        "type": "CallExpression",
                        "start": 8,
                        "end": 12,
                        "callee": {
                            "type": "Identifier",
                            "start": 8,
                            "end": 9,
                            "name": "g"
                        },
                        "arguments": [
                            {
                                "type": "Identifier",
                                "start": 10,
                                "end": 11,
                                "name": "k"
                            }
                        ]
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "start": 13,
            "end": 24,
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "start": 17,
                    "end": 24,
                    "id": {
                        "type": "Identifier",
                        "start": 17,
                        "end": 18,
                        "name": "b"
                    },
                    "init": {
                        "type": "Literal",
                        "start": 21,
                        "end": 24,
                        "value": 600,
                        "raw": "600"
                    }
                }
            ],
            "kind": "var"
        },
        {
            "type": "VariableDeclaration",
            "start": 25,
            "end": 38,
            "declarations": [
                {
                    "type": "VariableDeclarator",
                    "start": 29,
                    "end": 38,
                    "id": {
                        "type": "Identifier",
                        "start": 29,
                        "end": 30,
                        "name": "c"
                    },
                    "init": {
                        "type": "BinaryExpression",
                        "start": 33,
                        "end": 38,
                        "left": {
                            "type": "Identifier",
                            "start": 33,
                            "end": 34,
                            "name": "a"
                        },
                        "operator": "+",
                        "right": {
                            "type": "Identifier",
                            "start": 37,
                            "end": 38,
                            "name": "b"
                        }
                    }
                }
            ],
            "kind": "var"
        }
    ],
    "sourceType": "module"
}`;

export function generateAST(editor) {
    let lineCount = editor.lineCount();
    for (let i = 0; i < lineCount; i++) {
        let tokens = editor.getLineTokens(i);
        //console.log(tokens);
    }
    //console.log(acorn.parse(editor.getValue()));
    return JSON.parse(testASR);
}