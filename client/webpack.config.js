const webpack = require('webpack');

const plugins = [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'build/vendor.bundle.js')
];

if (process.env.PRODUCTION) {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify("production")
        }
    }));
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurenceOrderPlugin());
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
        error: './routes/error/index',
        vendor: ['vue']
    },
    output: {
        filename: 'build/[name].bundle.js',
        chunkFilename: 'build/[id].bundle.js'
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
        ]
    },
    vue: {
        loaders: {
            js: 'babel'
        }
    }
};