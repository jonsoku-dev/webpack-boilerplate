import path from 'path';
import webpack from 'webpack';
import childProcess from 'child_process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  entry: {
    main: './src/app.ts',
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
  },
  devServer: {
    overlay: true,
    stats: 'errors-only',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          !isDevelopment ? MiniCssExtractPlugin.loader : 'style-loader', // 순서 2
          'css-loader', // 순서 1
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          publicPath: './', // 빌드되었을때 path 들을 나타낼때...
          name: '[name].[ext]?[hash]',
          limit: 20000, // 20kb 미만은 data base64 로 변환 아니면? file-loader 로!
        },
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `
                Build Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Author: ${childProcess.execSync('git config user.name')}
            `,
    }),
    new webpack.DefinePlugin({
      TWO: '1+1', // 1+1=2 가 나온다. 즉 값이다 ! 스트링아님
      VALUE: JSON.stringify('1+1'), // 스트링으로 뽑고싶을때,
      'api.domain': JSON.stringify('http://dev.api.domain.com'),
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: isDevelopment ? '(개발용)' : '',
      },
      minify: !isDevelopment
        ? {
            collapseWhitespace: true, // 빈칸을 제거
            removeComments: true, // 주석을 제거
          }
        : false,
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new CleanWebpackPlugin(),
    ...(!isDevelopment
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].css',
          }),
        ]
      : []),
  ],
  optimization: {
    minimizer: !isDevelopment
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
    splitChunks: {
      chunks: 'all',
    },
  },
};

export default config;
