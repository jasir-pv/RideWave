/// <reference types="nativewind/types" />


import { ConfigAPI } from '@babel/core';

export default function (api: ConfigAPI) {
    api.cache(true);

    return {
        presets: ['babel-preset-expo'],
        plugins: [
            'nativewind/babel', // Add the plugin here
        ],
    };
}
