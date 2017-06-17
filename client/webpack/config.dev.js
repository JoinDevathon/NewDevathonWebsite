const path = require('path');
const fs = require('fs');

module.exports = {
    entry: './src/routes/client.js',
    output: {
        path: path.resolve(process.cwd(), 'build'),
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].bundle.js.map',
    },

    devtool: 'source-map',

    plugins: [],

    module: {
        rules: [
            {
                test: /\.(html|js)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    query: JSON.parse(fs.readFileSync('.babelrc')),
                },
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: 'svelte-loader',
            },
        ],
    },
};
