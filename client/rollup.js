const rollup = require('rollup');
const svelte = require('rollup-plugin-svelte');
const replace = require('rollup-plugin-replace');
const resolve = require('rollup-plugin-node-resolve');
const common = require('rollup-plugin-commonjs');

const {join, basename} = require('path');

const routes = [
    'home',
    'error'
];

const components = require('./src/components/index.json');

function getComponentOptions(component) {
    return {
        entry: join('src', 'components', `${component}.html`),
        dest: join('build', 'component', `${basename(component)}.js`),
        format: 'iife',
        moduleName: '_devathon.' + basename(component),
        sourceMap: !process.env.PRODUCTION,
        plugins: [
            svelte()
        ],
    };
}

function getRouteOptions(route) {
    const plugins = [
        svelte()
    ];
        plugins.push(replace({
            values: {
                self: 'window'
            },
            include: 'node_modules/whatwg-fetch/fetch.js'
        }));
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
        entry: `src/routes/${route}/index.js`,
        dest: `build/route/${route}.js`,
        format: 'iife',
        sourceMap: !process.env.PRODUCTION,
        plugins,
    };
}

function formatEvent(name, event) {
    return `${name}: ${event.code} ${event.error ? event.error : ''}`;
}

if (process.env.WATCH) {
    const watch = require('rollup-watch');
    routes.forEach(route => {
        watch(rollup, getRouteOptions(route)).on('event', event => console.log(formatEvent(`route/${route}`, event)));
    });
    components.forEach(component => {
        watch(rollup, getComponentOptions(component)).on('event', event => console.log(formatEvent(`component/${component}`, event)));
    });
} else {
    routes.forEach(route => {
        rollup.rollup(getRouteOptions(route))
            .then(bundle => bundle.write(getRouteOptions(route)))
            .catch(err => console.error(`Failed to compile route ${route}`, err));
    });
    rollup.rollup(options).then(bundle => bundle.write(options)).catch(err => console.error(err));
}

