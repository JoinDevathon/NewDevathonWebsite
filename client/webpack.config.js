const webpack = require('webpack');
const ExtractText = require('extract-text-webpack-plugin');
const glob = require('glob');
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
];

let vue;

if (process.env.PRODUCTION) {
    console.log('Running in production..');
    vue = {
        loaders: {
            js: 'babel',
            css: ExtractText.extract('css')
        }
    };

    plugins.push(new ExtractText('tmp.css'));
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
    console.log('Running in development..');
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
        teamCreate: './routes/teams/create',
        error: './routes/error/index',
        // vendor: ['node_modules/**', './components/**'],
        vendor: glob.sync(process.cwd() + '/src/components/**/*.vue').concat(['vue', 'whatwg-fetch'])
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
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    vue
};