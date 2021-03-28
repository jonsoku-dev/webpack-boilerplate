import path from 'path';
import webpack from 'webpack';
import childProcess from 'child_process';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import { merge } from 'webpack-merge';

const isDevelopment = process.env.NODE_ENV !== 'production';

const PATHS = {
  src: path.join(__dirname, 'src'), //absolute path to RepoDir/src
  dist: path.join(__dirname, 'dist'), //absolute path to RepoDir/dist
  public: path.join(__dirname, 'public'), //absolute path to RepoDir/public
};

const commonConfig = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  entry: {
    main: PATHS.src + '/index.tsx',
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
      template: PATHS.public + '/index.html',
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
        files: PATHS.src + '/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: PATHS.public + '/assets',
          to: 'assets', // 목적지 파일에 들어간다
        },
        // {
        //   from: './node_modules/axios/dist/axios.min.js',
        //   to: './axios.min.js', // 목적지 파일에 들어간다
        // },
      ],
    }),
  ],
};

const productionConfig = {
  mode: 'production',
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin(),
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true, // 콘솔 로그를 제거한다
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
};

const developmentConfig = {
  mode: 'development',
  devtool: 'hidden-source-map',
  devServer: {
    overlay: true,
    stats: 'errors-only',
    hot: true,
    historyApiFallback: true, // react router 새로고침해도 react-router 로 먹는다.
    port: 3090, // front dev port
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()],
};

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
    main: PATHS.src + '/index.tsx',
  },
  output: {
    path: PATHS.dist,
    filename: '[name].js',
  },
  devServer: {
    overlay: true,
    stats: 'errors-only',
    hot: true,
    historyApiFallback: true, // react router 새로고침해도 react-router 로 먹는다.
    port: 3090, // front dev port
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
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
      template: PATHS.public + '/index.html',
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
        files: PATHS.src + '/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
      },
    }),
    new CleanWebpackPlugin(),
    ...(!isDevelopment
      ? [
          new MiniCssExtractPlugin({
            filename: '[name].css',
          }),
        ]
      : [new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()]),
    new CopyPlugin({
      patterns: [
        {
          from: PATHS.public + '/assets',
          to: 'assets', // 목적지 파일에 들어간다
        },
        // {
        //   from: './node_modules/axios/dist/axios.min.js',
        //   to: './axios.min.js', // 목적지 파일에 들어간다
        // },
      ],
    }),
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