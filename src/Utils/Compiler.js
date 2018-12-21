import * as request from 'request';


//Callback must be -> callback(error, asm, ast)
export function compile(code, callback) {
    let options = {
        url: 'https://godbolt.org/api/compiler/clang700/compile',
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        json: true,
        body: {
            "source": code,
            "compiler": "clang700",
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
                },
                "tools": []
            },
            "lang": "c++"
        }
    };
    request(options, (error, response, body) => {
        if (error) {
            alert("oops! https://godbolt.org/ seems to be down! \n You will have to wait my friend.")
            callback({}, [], "")
        }
        else {
            callback(body.stderr, body.asm, body.astOutput)
        }
    })
}