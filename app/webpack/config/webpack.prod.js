const path = require('path')
const merge = require('webpack-merge')
const os = require('os')
const HappyPack = require('happypack')

const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CSSMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackInjectAttributesPlugin = require('html-webpack-inject-attributes-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

// 多线程 build
const happpypackCommonConfig = {
    debug: false,
    threadPool: HappyPack.ThreadPool({ size: os.cpus().length })
}
// 基类配置
const baseConfig = require('./webpack.base')

// 生产配置
const webpackConfig = merge.smart(baseConfig, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'happypack/loader?id=css'
                ]
            },
            {
                test: /\.js$/,
                include: [
                    // 只对业务代码进行babel 加快打包速度
                    path.resolve(process.cwd(), './app/pages')
                ],
                use: ['happypack/loader?id=js']
            },
        ]
    },
    // webpack 不会有大量 hints 信息 默认为warning
    performance: {
        hints: false
    },
    plugins: [
        // 每次build前 清空 public/dist 目录
        new CleanWebpackPlugin('public/dist', {
            root: path.resolve(process.cwd(), './app/'),
            exclude: [],
            verbose: true,
            dry: false
        }),
        // 提取css的公共部分，有效利用缓存
        new MiniCssExtractPlugin({
            chunkFilename: 'css/[name]_[contenthash:8].bundle.css'
        }),
        // 优化并压缩css资源
        new CSSMinimizerPlugin(),
        // 多线程打包JS
        new HappyPack({
            ...happpypackCommonConfig,
            id: 'js',
            loaders: [`babel-loader?${JSON.stringify({
                presets: ['@babel/preset-env'],
                plugins: [
                    '@babel/plugin-transform-runtime'
                ]
            })}`]
        }),
    // 多线程打包CSS
    new HappyPack({
            ...happpypackCommonConfig,
            id: 'css',
            loaders: [
                { 
                    path: 'css-loader',
                    options:{
                        importLoaders:1
                    }
                 }
            ]
        }),
        // 浏览器在请求资源时不发送用户的身份凭证  
        new HtmlWebpackInjectAttributesPlugin({
            crossorigin:'anonymous'
        })
    ],
    optimization: {
        // TerserWebpackPlugin 控制并发和缓存 提升压缩性能
        // 清除 console.log
        minimize:true,
        minimizer:[
            new TerserWebpackPlugin({
                cache:true, // 启用缓存加速构建
                parallel:true, // 利用多核cpu 优势加快压缩速度
                terserOptions:{
                    compress:{
                        drop_console:true,//去掉console
                        drop_debugger:true,
                    }
                }
            })
        ]
    },
    output: {
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        path: path.join(process.cwd(), './app/public/dist/prod'),
        publicPath: '/dist/prod',
        crossOriginLoading: 'anonymous'
    },

})
module.exports = webpackConfig