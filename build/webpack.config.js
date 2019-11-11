let path = require('path');
let baseConfig = require('./webpack.base.config');
let HtmlWebpackPlugin = require("html-webpack-plugin");
let { CleanWebpackPlugin } = require("clean-webpack-plugin");
let webpack = require('webpack');

//let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
module.exports = {
    mode: 'production', //模式：开发模式和生产模式

    entry: path.resolve(__dirname, '../src/main.ts'),

    // externals: {
    //     "element-ui": {
    //         commonjs: 'element-ui',
    //         commonjs2: 'element-ui',
    //         amd: 'element-ui',
    //         root: 'element-ui'
    //     }
    // },
    //devtool: 'inline-source-map',
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist'),
        libraryTarget: "umd", //通用模块定义,适用于AMD,commonJs规范
        //chunkFilename: '[name].js'
    },
    //devtool: "source-map", // 源码映射
    resolve: Object.assign(baseConfig.resolve, {
        alias: {
            "@": path.resolve(__dirname, "../src"),
        }
    }),
    //plugins: baseConfig.plugins.concat([new BundleAnalyzerPlugin()]),
    plugins: baseConfig.plugins.concat([
        //new BundleAnalyzerPlugin(),

        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
            hash: true
        }),
    ]),

    module: baseConfig.module

}