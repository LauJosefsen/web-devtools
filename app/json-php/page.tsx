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
    const [json, setJson] = useState('');
    const [phpArray, setPhpArray] = useState('');

    return <>
        <h1 className="text-3xl md:text-5xl mb-4 font-extrabold text-white" id="home">JSON to/from PHP conversions</h1>
        {/* TextArea */}
        <Editor
            value={json}            
            onValueChange={code => 
                {
                    setJson(code);
                    setPhpArray(printer(JSON.parse(code)));
                }
            }
            highlight={code => highlight(code, languages.json, 'json')}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />

        <Editor
            value={phpArray}
            onValueChange={code => 
                {
                    setPhpArray(code);
                    console.log(fromString(code))
                    console.log(JSON.stringify(fromString(code)));
                    setJson(JSON.stringify(fromString(code), null, 4));
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