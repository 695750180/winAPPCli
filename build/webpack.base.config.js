/**
 * 基础公用配置
 */
let path = require('path');
let VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
    target: 'electron-renderer',
    devServer: { //node服务，需要先安装node服务依赖 （webpack-dev-server）
        port: 3000,
        progress: true,
        contentBase: path.resolve(__dirname, '../dist'),
        open: true
    },
    resolve: {
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },
    plugins: [
        //插件
        new VueLoaderPlugin()
    ],
    module: { //模块
        rules: [ //规则
            //css-loader 支持@import语法
            //style-loader 将css插入到head标签中
            //loader特点  希望单一
            //loader的用法 字符串只用一个loader
            //多个loader需要用[]
            //loader的顺序默认是从右向左执行,从下到上执行 


            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: "style-loader" // 将 JS 字符串生成为 style 节点
                },
                {
                    loader: "css-loader" // 将 CSS 转化成 CommonJS 模块
                },
                {
                    loader: "sass-loader" // 将 Sass 编译成 CSS
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                //loader: "ts-loader",
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: { appendTsxSuffixTo: [/\.vue$/] }
                    }
                ]
                // options: {
                //     appendTsSuffixTo: [/\.vue$/],
                // }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader'
            }

        ]

    }
}