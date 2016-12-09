const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: './routes/server.js',
    target: 'node',
    output: {
        filename: 'build/server/server.bundle.js',
        library: 'components',
        libraryTarget: 'commonjs2'
    },
    externals: [
        function (context, request, callback) {
            if (request === '../common') {
                console.log('Blocking require for', request);
                return callback(null, `../../src/routes/common`); // rewrite relative to build/server
            }
            return callback();
        }
    ],
    plugins: [
        new webpack.DefinePlugin({
            'window.navigator': {
                userAgent: JSON.stringify("node")
            }
        }),
        new ExtractText('/dev/null')
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
