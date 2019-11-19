let path = require("path");
let baseConfig = require('./webpack.base.config');
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    target:  baseConfig.target,
    mode: "development", //模式：开发模式和生产模式
    entry: path.resolve(__dirname, "../src/app.js"),
    devtool: 'inline-source-map',
    output: {
        filename: "app.js",
        path: path.resolve(__dirname, "./electron-dist"),
        //library  : 'MyLibrary',
        libraryTarget: "umd" //通用模块定义,适用于AMD,commonJs规范
        //umdNamedDefine: true
    },
    devtool: "source-map", // 源码映射
    module: {
        rules:[{
            test: /\.js$/,
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new CleanWebpackPlugin(),
    ],
};
