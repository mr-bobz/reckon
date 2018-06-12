const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    DIST: path.resolve(__dirname, 'dist'),
    SRC: path.resolve(__dirname, 'app')
};

module.exports = {
    mode: "production",
    devtool: 'source-map',    
    entry: path.join(paths.SRC, 'client/index.jsx'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js',
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
                include: path.join(paths.SRC, 'client'),
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },            
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(paths.SRC, 'public/index.html'),
            filename: 'index.html',
            inject: 'body'
        })
    ],
};
