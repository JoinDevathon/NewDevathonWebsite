const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const common = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');

let entry = './src/routes/client.js';
let svelteSettings = undefined;
let destName = 'bundle.js';
let format = 'iife';

if (process.env.NODE_ENV === 'production') {
    if (process.env.SERVER) {
        destName = 'bundle.server.js';
        entry = './src/routes/server.js';
        format = 'cjs';
        svelteSettings = {
            generate: 'ssr'
        };
    } else {
        svelteSettings = {
            css: false
        };
    }
}

export default {
    entry,
    dest: `./build/${destName}`,
    format,
    plugins: [
        svelte(svelteSettings),
        resolve({
            include: ['node_modules/**'],
            jsnext: true,
            main: true,
            browser: true
        }),
        common({
            include: ['node_modules/**']
        }),
        babel({
            exclude: 'node_modules/**',
            externalHelpers: false
        })
    ]
}
