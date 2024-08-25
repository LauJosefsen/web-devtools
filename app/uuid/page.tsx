import React from "react";

const uuidVersions = {
    'v1': {
        'description': 'Time-based',
    },
    'v2': {
        'description': 'DCE security',
    },
    'v3': {
        'description': 'Name-based (MD5)',
    },
    'v4': {
        'description': 'Random',
    },
    'v5': {
        'description': 'Name-based (SHA-1)',
    },
    'v6': {
        'description': 'Time-based, ordered',
    },
    'v7': {
        'description': 'Timestamp and random',
    },
    'v8': {
        'description': 'Custom',
    },
}

const defaultVersion = 'v7';

export default function Uuid() {
    return <>
        <h1 className="text-3xl md:text-5xl mb-4 font-extrabold" id="home">UUID</h1>

        <p>Paste UUID below</p>
        <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Paste UUID here" />

        <p>
            Or generate a new one
        </p>
        <div className="flex flex-col">
            <select className="col-span-2 p-2 border border-gray-300 rounded mt-4">
                {Object.entries(uuidVersions).map(([version, { description }]) => (
                    <option key={version} value={version} selected={
                        version === defaultVersion
                    }>{version} - {description}</option>
                ))}
            </select>
            <button className="p-2 bg-indigo-500 text-white rounded mt-4">Generate</button>
        </div>




    </>
}