const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
// const OfflinePlugin = require('offline-plugin');
// const {join} = require('path');

const plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    // new OfflinePlugin({
    //     excludes: ['/dev/null']
    //     // ServiceWorker: {
    //     //     output: 'build/sw.js'
    //     // },
    //     // AppCache: {
    //     //     directory: ''
    //     // }
    // }),
    new ExtractText('/dev/null')
];

if (process.env.PRODUCTION) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("production")
        }
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    plugins.push(new webpack.optimize.AggressiveMergingPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    }));
} else {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("development")
        }
    }));
}

module.exports = {
    context: __dirname + '/src',
    entry: {
        home: './routes/home/index',
        account: './routes/account/index',
        error: './routes/error/index',
        vendor: ['vue']
    },
    output: {
        path: 'build/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.js',
        publicPath: '/public/js/'
    },
    plugins,
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.js$/,
                // exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel',
            css: ExtractText.extract('css')
        }
    }
};