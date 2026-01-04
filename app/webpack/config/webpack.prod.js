const path = require("path");
const merge = require("webpack-merge");
const os = require("os");

const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CSSMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackInjectAttributesPlugin = require("html-webpack-inject-attributes-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

// 基类配置
const baseConfig = require("./webpack.base");

// 生产配置
const webpackConfig = merge.smart(baseConfig, {
  mode: "production",
  module: {
    rules: [
      // JavaScript 多线程编译
      {
        test: /\.js$/,
        include: [
          // 只对业务代码进行babel 加快打包速度
          path.resolve(process.cwd(), "./app/pages"),
        ],
        use: [
          {
            loader: "thread-loader",
            options: {
              workers: os.cpus().length - 1, // 预留一个核心给主进程
              workerParallelJobs: 50,
              poolTimeout: 2000, // 空闲时销毁线程池
            },
          },
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: ["@babel/plugin-transform-runtime"],
              cacheDirectory: true, // 启用缓存，二次构建更快
            },
          },
        ],
      },
      // CSS 多线程编译
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "thread-loader",
            options: {
              workers: 2, // CSS 处理不需要太多线程
              workerParallelJobs: 50,
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
      // Less 多线程编译
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "thread-loader",
            options: {
              workers: 2,
            },
          },
          "css-loader",
          "less-loader",
        ],
      },
    ],
  },
  // webpack 不会有大量 hints 信息 默认为warning
  performance: {
    hints: false,
  },
  plugins: [
    // 每次build前 清空 public/dist 目录
    new CleanWebpackPlugin("public/dist", {
      root: path.resolve(process.cwd(), "./app/"),
      exclude: [],
      verbose: false, // 减少日志输出
      dry: false,
    }),
    // 提取css的公共部分，有效利用缓存
    new MiniCssExtractPlugin({
      chunkFilename: "css/[name]_[contenthash:8].bundle.css",
    }),
    // 优化并压缩css资源
    new CSSMinimizerPlugin(),
    // 浏览器在请求资源时不发送用户的身份凭证
    new HtmlWebpackInjectAttributesPlugin({
      crossorigin: "anonymous",
    }),
  ],
  optimization: {
    // TerserWebpackPlugin 控制并发和缓存 提升压缩性能
    // 清除 console.log
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true, // 利用多核cpu 优势加快压缩速度
        terserOptions: {
          compress: {
            drop_console: true, //去掉console
            drop_debugger: true,
          },
          ecma: 2015, // 支持 ES2015+ 语法
        },
      }),
    ],
  },
  output: {
    filename: "js/[name]_[chunkhash:8].bundle.js",
    path: path.join(process.cwd(), "./app/public/dist/prod/"),
    publicPath: "/dist/prod/",
    crossOriginLoading: "anonymous",
  },
  cache: {
    type: "filesystem", // 使用文件系统缓存
    buildDependencies: {
      config: [__filename],
    },
  },
  // 减少基础设施日志输出
  infrastructureLogging: {
    level: "error", // 只显示错误级别的日志
    debug: false,
  },
  // 控制统计信息输出
  stats: {
    warnings: false, // 隐藏警告信息
    cached: false,
    cachedAssets: false,
  },
});
module.exports = webpackConfig;
