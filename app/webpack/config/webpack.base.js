const path = require('path')
const glob=require('glob')
const {VueLoaderPlugin} =require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 动态构造 pageEntries htmlWebpackPluginList
const pageEntries={}
const htmlWebpackPluginList=[]
// 获取app/pages 目录下所有入口文件(entry.xx.js)
const entryList=path.resolve(process.cwd(),'./app/pages/**/entry.*.js')
glob.sync(entryList).forEach(file => {
    const entryName=path.basename(file,'.js')
    // 构造entry
    pageEntries[entryName]=file
    htmlWebpackPluginList.push(
        new HtmlWebpackPlugin({
         // 产物 最终模板输出路径
            filename:path.resolve(process.cwd(),'./app/public/dist',`${entryName}.tpl`),
            // 指定要使用的模板文件
            template:path.resolve(process.cwd(),'./app/view/entry.tpl'),
            // 要注入的代码块
            chunks:[entryName]
        })
    )

});

/**
 * webpack 基础配置
 */
module.exports = {
    // 入口配置
    entry:pageEntries,
    // 模块解析配置（决定加载解释哪些模块，用什么方式解析）
    module: {
        rules: [
            {
                test: /\.vue/,
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.js/,
                include: [
                    // 只对业务代码进行babel 加快打包速度
                    path.resolve(process.cwd(), './app/pages')
                ]
            },
            {
                test: /\.(png|jpe?g|gif)(\?.+)?$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 300,
                        esModule: false
                    }
                }
            },
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.less$/,
                use:['style-loader','css-loader','less-loader']
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                use:'file-loader'
            }
        ]
    },
    // 产物输出路径
    output: {
        filename: 'js/[name]_[chunkhash:8].bundle.js',
        path: path.join(process.cwd(), './app/public/dist/prod'),
        publicPath: '/dist/prod',
        crossOriginLoading: 'anonymous'
    },
    // 配置模块解析的具体行为（定义 webpack 在打包时 如何找到并解析具体模块路径）
    resolve: {
        extensions:['.js','.vue','.less','.css'],
        alias:{
            $pages:path.resolve(process.cwd(),'./app/pages'),
            $common:path.resolve(process.cwd(),'./app/pages/common'),
            $widgets:path.resolve(process.cwd(),'./app/pages/widgets'),
            $store:path.resolve(process.cwd(),'./app/pages/store'),
        }
    },
    // 配置webpack插件
    plugins: [
        // 处理.vue文件 
        new VueLoaderPlugin(),
        // 把第三方库暴露到window context下
        new webpack.ProvidePlugin({
            Vue:'vue',
            axios:'axios',
            _:'lodash'
        }),
        // 定义全局常量
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__:'true',//支持解析vue 解析options api
            __VUE_PROD_DEVTOOLS__:'false',//禁用vue调试工具
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:'false'//禁用生产环境显示“水合”信息
        }),
        ...htmlWebpackPluginList
        // new HtmlWebpackPlugin({
        //     // 产物 最终模板输出路径
        //     filename:path.resolve(process.cwd(),'./app/public/dist','entry.page1.tpl'),
        //     // 指定要使用的模板文件
        //     template:path.resolve(process.cwd(),'./app/view/entry.tpl'),
        //     // 要注入的代码块
        //     chunks:['entry.page1']
        // }),
        // new HtmlWebpackPlugin({
        //     // 产物 最终模板输出路径
        //     filename:path.resolve(process.cwd(),'./app/public/dist','entry.page2.tpl'),
        //     // 指定要使用的模板文件
        //     template:path.resolve(process.cwd(),'./app/view/entry.tpl'),
        //     // 要注入的代码块
        //     chunks:['entry.page2']
        // }),
    ],
    // 配置打包输出优化（代码分割、模块合并、缓存、treeshaking、压缩优化等）
    optimization:{
        /**
         * 把js文件打包分为三种类型
         * 1、vendor:第三方lib库，基本不会改动（依赖升级除外）
         * 2、common:业务组件代码的公共部分抽离，改动较少
         * 3、entry.{page}:不用页面 entry 里的业务代码差异部分，会经常改动
         * 目的：把改动和引用频率不一样的js区分，达到更好的浏览器缓存效果
         */
        splitChunks:{
            chunks:'all',// 对同步和异步模块都进行分割
            maxAsyncRequests:10, // 每次异步加载最大并行
            maxInitialRequests:10, // 入口文件最大并行数
            cacheGroups:{
                vendor:{ // 第三方依赖
                    test:/[\\/]node_modules[\\/]/, //打包node_modules中文件
                    name:'vendor', // 模块名
                    priority:20, // 优先级，数字越大优先级越高
                    enforce:true, // 强制执行
                    reuseExistingChunk:true, // 复用已有的公共 chunk
                },
                common:{
                    name:'common',
                    minChunks:2, //被引用2次视为公共模块
                    minSize:1, // 最小文件分割大小 （1byte）
                    priority:10, // 优先级
                    reuseExistingChunk:true, // 复用已有的公共 chunk
                }
            }
        },
        // 将webpack运行时生成的代码 打包到 runtime.js
        runtimeChunk:true
    }
}