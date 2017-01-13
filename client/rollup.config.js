const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const common = require('rollup-plugin-commonjs');
const replace = require('rollup-plugin-replace');
// const closure = require('rollup-plugin-closure-compiler-js');
const uglify = require('rollup-plugin-uglify');

const plugins = [
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
        runtimeHelpers: true
    })
];
let entry = './src/routes/client.js';
let destName = 'bundle.js';
let format = 'iife';

if (process.env.NODE_ENV === 'production') {
    if (process.env.SERVER) {
        destName = 'bundle.server.js';
        entry = './src/routes/server.js';
        format = 'cjs';
        plugins.unshift(svelte({
            generate: 'ssr'
        }));
    } else {
        plugins.unshift(svelte({
            css: false
        }));
        // plugins.push(closure({
        //     compilationLevel: 'SIMPLE',
        //     warningLevel: 'QUIET'
        // }));
        plugins.push(uglify());
    }
} else {
    plugins.unshift(svelte());
}

export default {
    entry,
    dest: `./build/${destName}`,
    format,
    plugins
};
