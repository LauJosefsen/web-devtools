'use client'

import { access } from "fs";
import React, { useEffect, useState } from "react";
import { parse, v1, v3, v4, v5, v6, v7, validate, version } from 'uuid';

function bigIntPow(base: bigint, exp: number): bigint {
    let result = BigInt(1);
    for (let i = 0; i < exp; i++) {
        result *= base;
    }
    return result;
}

const globalParts = (uuid: Uint8Array) => {
    const version = uuid[6] >> 4;
    const variant = uuid[8] >> 6;

    return [
        {
            label: 'Version',
            description: '4 bits, version',
            value: version.toString(10),
        },
        {
            label: 'Variant',
            description: '2 bits, variant',
            value: variant.toString(10),
        },
        {
            label: 'MariaDB binary literal',
            description: 'MariaDB binary literal',
            value: `x'${Buffer.from(uuid).toString('hex')}'`,
        }
    ]
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
            // The timestamp is a 60-bit value.  For UUID version 1, this is
            //    represented by Coordinated Universal Time (UTC) as a count of 100-
            //    nanosecond intervals since 00:00:00.00, 15 October 1582 (the date of
            //    Gregorian reform to the Christian calendar).

            // First 4 bytes
            const timeLow = uuid.slice(0, 4).reduce((acc, byte, i) => acc + BigInt(byte) * bigIntPow(BigInt(256), 3 - i), BigInt(0));

            const timeMid = uuid.slice(4, 6).reduce((acc, byte, i) => acc + BigInt(byte) * bigIntPow(BigInt(256), 1 - i), BigInt(0));

            const timeHigh = BigInt(uuid[6] % 16) * BigInt(256) + BigInt(uuid[7]);
            const intervals = (timeHigh << BigInt(48)) + (timeMid << BigInt(32)) + timeLow;

            // Add the first 4 bytes of the 8th byte
            // Calculate the timestamp by adding the number of 100-nanosecond intervals to 1582-10-15
            const yeOldeTimes = new Date();
            yeOldeTimes.setUTCFullYear(1582, 9, 15);
            yeOldeTimes.setUTCHours(0, 0, 0, 0);
            const milisecondsSince = intervals / BigInt(10000);

            const timestamp = new Date(yeOldeTimes.getTime() + Number(milisecondsSince));

            const timestampStr = timestamp.toISOString();

            // extra nanoseconds since seconds
            const nanoseconds = (intervals % BigInt(10000000)) * BigInt(100);

            // Add nanosecond resolution to the string, by appending it before Z in zulu
            const timestampNanos = `${timestampStr.slice(0, -2)}.${nanoseconds.toString().padStart(9, '0')}Z`;

            // Clock sequence is the last 6 bits of the 8th byte + the 9th byte
            const clockSequence = (uuid[8] % 64) * 256 + uuid[9];

            // Node is the last 6 bytes
            const node = uuid.slice(10).reduce((acc, byte, i) => acc + BigInt(byte) * bigIntPow(BigInt(256), 5 - i), BigInt(0));

            const nodeAsMacAddres = node.toString(16).match(/.{1,2}/g)?.join(':');

            console.log(Number(16259).toString(16).padStart(4, '0'));

            return [
                {
                    label: 'Unix timestamp',
                    description: '60 bits, 100 nanoseconds precision since 1582-10-15',
                    value: `${timestampNanos}`,
                },
                {
                    label: 'Time Low',
                    description: 'The lower 32 bits of the intervals of 100 nanoseconds since 1582-10-15',
                    value: timeLow.toString(10) + ' (0x' + timeLow.toString(16).padStart(8, '0') + ')',
                },
                {
                    label: 'Time Mid',
                    description: 'The middle 16 bits of the intervals of 100 nanoseconds since 1582-10-15',
                    value: timeMid.toString(10) + ' (0x' + timeMid.toString(16).padStart(4, '0') + ')',
                },
                {
                    label: 'Time High',
                    description: 'The higher 12 bits of the intervals of 100 nanoseconds since 1582-10-15',
                    value: timeHigh.toString(10) + ' (0x' + timeHigh.toString(16).padStart(3, '0') + ')',
                },
                {
                    label: 'Total Time Intervals',
                    description: 'The total number of 100 nanosecond intervals since 1582-10-15',
                    value: intervals.toString(10) + ' (0x' + intervals.toString(16).padStart(16, '0') + ')',
                },
                {
                    label: 'Clock sequence',
                    description: '14 bits, counter',
                    value: clockSequence.toString(10) + ' (0x' + clockSequence.toString(16).padStart(4, '0') + ')',
                },
                {
                    label: 'Node',
                    description: '48 bits, milliseconds since epoch',
                    value: `${nodeAsMacAddres} ( ${node} )`,
                }
            ]
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
                    label: 'Random B',
                    description: '62 bits, pseudo-random',
                    value: rand_b.toString(10),
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
        <h1 className="text-3xl md:text-5xl mb-4 font-extrabold text-white" id="home">UUID</h1>

        <p className="mb-2">Paste UUID below</p>
        <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Paste UUID here"
            value={uuid}
            onChange={(e) => setUuid(e.target.value)}
            aria-label="UUID input"
        />

        <p className="mb-2">Or generate a new one</p>
        <div className="flex flex-col">
            <label htmlFor="uuid-version-select" className="sr-only">Select UUID version</label>
            <select
                id="uuid-version-select"
                className="col-span-2 p-2 border border-gray-300 rounded mt-4"
                value={selectedUuidVerison}
                onChange={(e) => setSelectedUuidVersion(e.target.value)}
            >
                {Object.entries(uuidVersions).map(([version, { description }]) => (
                    <option key={version} value={version}>{version} - {description}</option>
                ))}
            </select>
            <button
                className="p-2 bg-indigo-500 text-white rounded mt-4"
                onClick={() => {
                    const generator = uuidVersions[selectedUuidVerison].generator;
                    setUuid(generator());
                }}
            >
                Generate
            </button>
        </div>


        <dl className="divide-y divide-white-100 mt-6 text-white">
            <div className="px-4 rounded-lg bg-contentBgLight">
                {uuidVersion && (
                    <>
                        {[...globalParts(parse(uuid)), ...uuidVersions[`v${uuidVersion}`].parts(parse(uuid))].map((part, i) => (
                            <div key={i} className="px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-bold leading-6 ">{part.label}</dt>
                                <dd className="mt-1 text-sm font-mono leading-6 sm:col-span-2 sm:mt-0">{part.value}</dd>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </dl>






    </>
}