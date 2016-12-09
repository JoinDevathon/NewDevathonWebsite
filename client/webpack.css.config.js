const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        home: './routes/server'
    },
    output: {
        filename: 'build/blank.bundle.js',
    },
    plugins: [
        new ExtractText('styles/components.css')
    ],
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
        ]
    },
    vue: {
        loaders: {
            js: 'babel',
            css: ExtractText.extract('css')
        }
    }
};