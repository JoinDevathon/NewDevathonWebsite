const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const common = require('rollup-plugin-commonjs');

const routes = [
    'home'
];

function getOptions(route) {
    const plugins = [
        svelte()
    ];
    if (!process.env.PRODUCTION) {
        // plugins.push(replace({
        // }));
    }
    plugins.push(resolve({
        include: ['node_modules/**'],
        jsnext: true,
        main: true,
        browser: true
    }));
    plugins.push(common({
        include: ['node_modules/**']
    }));
    return {
        entry: `routes/${route}/index.js`,
        dest: `build/${route}.js`,
        format: 'iife',
        sourceMap: true,
        plugins,
    };
}

if (process.env.WATCH) {
    const watch = require('rollup-watch');
    routes.forEach(route => {
        watch(rollup, getOptions(route))
            .on('event', event => console.log(`routes/${route}: ${event.code} ${event.error ? event.error : ''}`))
    })
} else {
    routes.forEach(route => {
        rollup.rollup(getOptions(route))
            .then(bundle => bundle.write(getOptions(route)))
            .catch(err => console.error(`Failed to compile route ${route}`, err));
    });
}

