'use client'

import React, { useEffect, useState } from "react";
import Editor from "react-simple-code-editor";
import {highlight, languages} from "prismjs"
import json2php from "json2php";
import { fromString } from 'php-array-reader';

// Load php and json language
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-php';
import 'prismjs/themes/prism-dark.css'; //Example style, you can use another

export default function Uuid() {

    const printer = json2php.make({linebreak:'\n', indent:'\t', shortArraySyntax: true})
    const [json, setJson] = useState(JSON.stringify({"hello": "world"}, null, 4)
    );
    const [phpArray, setPhpArray] = useState(printer(JSON.parse(json)));

    return <>
        <h1 className="text-3xl md:text-5xl mb-4 font-extrabold text-white" id="home">JSON to/from PHP conversions</h1>
        {/* TextArea */}
        <h2 className="text-2xl md:text-4xl mb-4 font-extrabold text-white">JSON</h2>
        <Editor
            className="bg-gray-700"
            value={json}            
            onValueChange={code => 
                {
                    setJson(code);
                    try{
                        setPhpArray(printer(JSON.parse(code)));
                    } catch (_) { }
                }
            }
            highlight={code => highlight(code, languages.json, 'json')}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />

        <h2 className="text-2xl md:text-4xl mb-4 font-extrabold text-white">PHP Array</h2>

        <Editor
            className="bg-gray-700"
            value={phpArray}
            onValueChange={code => 
                {
                    setPhpArray(code);
                    try {
                        setJson(JSON.stringify(fromString(code), null, 4));
                    } catch (_) {}
                }
            }
            highlight={code => highlight(code, languages.php, 'php')}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />

    </>
}