import * as request from 'request';


//Callback must be -> callback(error, asm, ast)
export function compile(code, callback) {
    let options = {
        url: 'https://godbolt.org/api/compiler/cclang700/compile',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        json: true,
        body: {
            "source": code,
            "compiler": "cclang700",
            "options": {
                "userArguments": "-O3 -march=native",
                "compilerOptions": {
                    "produceGccDump": {},
                    "produceCfg": false,
                    "produceAst": true
                },
                "filters": {
                    "binary": false,
                    "execute": false,
                    "labels": true,
                    "directives": true,
                    "commentOnly": true,
                    "trim": true,
                    "intel": true,
                    "demangle": true
                }
            },
            "lang": "c"
        }
    };
    request(options, (error, response, body) => {
        console.log(body)
        callback(body.stderr, body.asm, body.astOutput)
    })
}