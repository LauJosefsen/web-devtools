'use client'

import React, { useEffect, useState } from "react";
import { parse, v1, v3, v4, v5, v6, v7, validate, version } from 'uuid';

function bigIntPow(base: bigint, exp: number): bigint {
    let result = BigInt(1);
    for (let i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

const uuidVersions: Record<string, {
    description: string,
    generator: () => string,
    parts: (uuid: Uint8Array) => { label: string, description: string, value: string }[]
}>
    = {
    'v1': {
        'description': 'Time-based',
        generator: v1,
        parts(uuid: Uint8Array) {
            return [];
        }
    },
    'v3': {
        'description': 'Name-based (MD5)',
        generator: () => v3('hello', v3.DNS),
        parts(uuid: Uint8Array) {
            return [];
        }
    },
    'v4': {
        'description': 'Random',
        generator: v4,
        parts(uuid: Uint8Array) {
            return [];
        }
    },
    'v5': {
        'description': 'Name-based (SHA-1)',
        generator: () => v5('hello', v5.DNS),
        parts(uuid: Uint8Array) {
            return [];
        }
    },
    'v6': {
        description: 'Time-based, ordered',
        generator: v6,
        parts(uuid: Uint8Array) {
            return [];
        }
    },
    'v7': {
        'description': 'Timestamp and random',
        generator: v7,
        parts: (uuid: Uint8Array) => {
            // Input is a 16 byte array

            // unix_ts_ms 48 bits, 6 bytes
            const unix_ts_ms = uuid.slice(0, 6).reduce((acc, byte, i) => acc + byte * Math.pow(256, 5 - i), 0);

            // rand_a is 12 bits from the 7 ½th byte, i.e the last 4 bits of the 7th byte and all of the 8th byte
            const rand_a = uuid[6] % 16 * 256 + uuid[7];

            // variant is the 2 bits after rand_a
            const variant = uuid[8] >> 6;

            // rand_b is the final 62 bits
            const rand_b = BigInt(uuid[8] % 64) * bigIntPow(BigInt(256), 5) + uuid.slice(9).reduce((acc, byte, i) => acc + BigInt(byte) * bigIntPow(BigInt(256), 5 - i), BigInt(0));
            // const rand_b = uuid[8] % 64 * Math.pow(256, 5) + uuid.slice(9).reduce((acc, byte, i) => acc + byte * Math.pow(256, 5 - i), 0);

            return [
                {
                    label: 'Unix timestamp',
                    description: '48 bits, milliseconds since epoch',
                    value: `${unix_ts_ms} (${new Date(unix_ts_ms).toISOString()})`,
                },
                {
                    label: 'Random A',
                    description: '12 bits, pseudo-random',
                    value: rand_a.toString(10),
                },
                {
                    label: 'Variant',
                    description: '2 bits, 0b10',
                    value: variant.toString(10),
                },
                {
                    label: 'Random B',
                    description: '62 bits, pseudo-random',
                    value: rand_b.toString(10),
                },
                {
                    label: 'MariaDB binary literal',
                    description: 'MariaDB binary literal',
                    value: `x'${Buffer.from(uuid).toString('hex')}'`,
                }
            ]
        }
    },
    // 'v8': {
    //     'description': 'Custom',
    //     generator: () => '00000000-0000-8000-0000-000000000000',
    //     parts(uuid: Uint8Array) {
    //         return [];
    //     }
    // },
}

const defaultVersion = 'v7';

export default function Uuid() {

    // uuid state
    const [uuid, setUuid] = useState('');
    const [selectedUuidVerison, setSelectedUuidVersion] = useState(defaultVersion);

    // Detect the version of the uuid
    const uuidVersion = validate(uuid) ? version(uuid) : null;

    return <>
        <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">UUID</h1>

        <p>Paste UUID below</p>
        <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Paste UUID here" value={uuid} onChange={(e) => setUuid(e.target.value)} />

        <p>
            Or generate a new one
        </p>
        <div className="flex flex-col">
            <select className="col-span-2 p-2 border border-gray-300 rounded mt-4" value={selectedUuidVerison} onChange={(e) => setSelectedUuidVersion(e.target.value)}>
                {Object.entries(uuidVersions).map(([version, { description }]) => (
                    <option key={version} value={version}>{version} - {description}</option>
                ))}
            </select>
            <button className="p-2 bg-indigo-500 text-white rounded mt-4" onClick={() => {
                const generator = uuidVersions[selectedUuidVerison].generator;
                setUuid(generator());
            }}>Generate</button>
        </div>

        <dl class="divide-y divide-gray-100">

            {uuidVersion &&
                <div key={i} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Version</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{uuidVersion}</dd>
                </div>
            }

            {uuidVersion && uuidVersions[`v${uuidVersion}`].parts(parse(uuid)).map((part, i) => (
                <div key={i} className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                    <dt className="text-sm font-medium leading-6 text-gray-900">{part.label}</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{part.value}</dd>
                </div>
            ))}
        </dl>






    </>
}