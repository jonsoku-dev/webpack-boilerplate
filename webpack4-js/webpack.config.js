const path = require("path");
const webpack = require("webpack");
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const apiMocker = require("connect-api-mocker");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const mode = process.env.NODE_ENV || "development";

module.exports = {
  mode,
  // 시작점!!
  entry: {
    main: "./src/app.js",
    // result: "./src/result.js", // result 만 따로 떼어서 ... html 에도 들어가있다.
    // main: "./app.js",
  },
  output: {
    path: path.resolve("./dist"), // node의 절대경로,
    filename: "[name].js",
  },
  devServer: {
    overlay: true,
    stats: "errors-only",
    // proxy: {
    //   "/api": "http://localhost:8081",
    // },
    hot: true,
    before: (app) => {
      app.use(apiMocker("/api", "mocks/api"));
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === "production"
            ? MiniCssExtractPlugin.loader
            : "style-loader", // 순서 2
          "css-loader", // 순서 1
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: "url-loader",
        options: {
          publicPath: "./", // 빌드되었을때 path 들을 나타낼때...
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb 미만은 data base64 로 변환 아니면? file-loader 로!
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
                Build Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync(
                  "git rev-parse --short HEAD"
                )}
                Author: ${childProcess.execSync("git config user.name")}
            `,
    }),
    new webpack.DefinePlugin({
      TWO: "1+1", // 1+1=2 가 나온다. 즉 값이다 ! 스트링아님
      VALUE: JSON.stringify("1+1"), // 스트링으로 뽑고싶을때,
      "api.domain": JSON.stringify("http://dev.api.domain.com"),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      minify:
        process.env.NODE_ENV === "production"
          ? {
              collapseWhitespace: true, // 빈칸을 제거
              removeComments: true, // 주석을 제거
            }
          : false,
    }),
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === "production"
      ? [
          new MiniCssExtractPlugin({
            filename: "[name].css",
          }),
        ]
      : []),
    new CopyPlugin({
      patterns: [
        {
          from: "./node_modules/axios/dist/axios.min.js",
          to: "./axios.min.js", // 목적지 파일에 들어간다
        },
      ],
    }),
  ],
  optimization: {
    minimizer:
      mode === "production"
        ? [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // 콘솔 로그를 제거한다
                },
              },
            }),
          ]
        : [],
    // splitChunks: {
    //   chunks: "all",
    // },
  },
  externals: {
    axios: "axios",
  },
};

/**
 * css-loader : css를 읽어서 js 파일에 넣는다.
 * style-loader : js에 들어있는 css를 읽어들인다.
 * MiniCssExtractPlugin.loader : css 를 추출해준다. (배포환경에서 유용하다. js에 css,js 등이 혼합되어있는건 좋지않기 떄문에)
 */

/**
 * MiniCssExtractPlugin: css 를 따로 추출해서 ./dist/index.html 에 css부분에 넣어준다.
 */
