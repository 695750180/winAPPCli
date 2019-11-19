let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let baseConfig = require('./webpack.base.config');
module.exports = {
    devServer: baseConfig.devServer,
    target:  baseConfig.target,
    mode: "development", //模式：开发模式和生产模式
    entry: path.resolve(__dirname, "../src/main.ts"),
    devtool: 'inline-source-map',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, "dist"),
        //library  : 'MyLibrary',
        libraryTarget: "umd" //通用模块定义,适用于AMD,commonJs规范
        //umdNamedDefine: true
    },
    devtool: "source-map", // 源码映射
    resolve: Object.assign(baseConfig.resolve,{
        alias:{
            "@": path.resolve(__dirname, "../src"),
        }
    }),
    plugins: baseConfig.plugins.concat([
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            hash: true
        }),
    ]),
    module: baseConfig.module
};
