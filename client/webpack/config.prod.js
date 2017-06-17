const webpack = require('webpack');
const path = require('path');

const dev = require('./config.dev');

dev.entry = {
    'home': './src/routes/home/index.js',
    'account': './src/routes/account/index.js',
    'accountDetails': './src/routes/account/details.js',
    'twentysixteen': './src/routes/contests/2016.js',
    'entry': './src/routes/contests/entry.js',
    'winners': './src/routes/contests/winners.js',
    'error': './src/routes/error/index.js',
};

dev.output = Object.assign({}, dev.output, {
    publicPath: '/public/js/',
});

dev.plugins.push(new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production')
}));

dev.plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: {
        toplevel: true
    },
    output: {
        semicolons: false,
    },
    sourceMap: true
}));

dev.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: [ 'vendor' ],
    minChunks: 2
}));

dev.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: [ 'manifest' ],
    minChunks: Infinity
}));

dev.module.rules[ 1 ] = {
    test: /\.html$/,
    exclude: /node_modules/,
    use: {
        loader: 'svelte-loader',
        options: {
            css: false
        }
    },
};

module.exports = dev;