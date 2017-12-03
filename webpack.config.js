const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    resolve: {
        extensions: ['.ts', '.js', '.less']
    },
    devtool: 'source-map',
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    presets: ['es2015']
                }
            }],
            exclude: /node_modules/
        }, {
            test: /\.ts$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    },
                },
                'ts-loader'
            ],
            exclude: /node_modules/
        }, {
            test: /\.less$/,
            use: [
                {
                    loader: "style-loader"
                }, {
                    loader: "css-loader",
                }, {
                    loader: "less-loader",
                }
            ],
            exclude: /node_modules/
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' })
    ]
}