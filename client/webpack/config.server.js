const dev = require('./config.dev');

dev.entry = './src/routes/server.js';
dev.output.filename = 'server.bundle.js';
dev.output.sourceMapFilename = 'server.bundle.js.map';
dev.output.libraryTarget = 'commonjs2';

dev.module.rules[ 1 ] = {
    test: /\.html$/,
    exclude: /node_modules/,
    use: {
        loader: 'svelte-loader',
        options: {
            generate: 'ssr'
        }
    },
};

module.exports = dev;