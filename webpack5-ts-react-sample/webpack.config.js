import path from 'path';
import webpack from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
var isDevelopment = process.env.NODE_ENV !== 'production';
var config = {
    name: 'sleact',
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'hidden-source-map' : 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
            '@hooks': path.resolve(__dirname, 'hooks'),
            '@components': path.resolve(__dirname, 'components'),
            '@layouts': path.resolve(__dirname, 'layouts'),
            '@pages': path.resolve(__dirname, 'pages'),
            '@utils': path.resolve(__dirname, 'utils'),
            '@typings': path.resolve(__dirname, 'typings'),
        },
    },
    entry: {
        app: './client',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                targets: { browsers: ['last 2 chrome versions'] },
                                debug: isDevelopment,
                            },
                        ],
                        '@babel/preset-react',
                        '@babel/preset-typescript',
                    ],
                    env: {
                        development: {
                            plugins: [['@emotion', { sourceMap: true }], require.resolve('react-refresh/babel')],
                        },
                        production: {
                            plugins: ['@emotion'],
                        },
                    },
                },
                exclude: path.join(__dirname, 'node_modules'),
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        // ts와 webpack 이 동시에 돌아가도록하는 플러그인 -> 성능향상
        new ForkTsCheckerWebpackPlugin({
            async: false,
            // eslint: {
            //   files: "./src/**/*",
            // },
        }),
        new webpack.EnvironmentPlugin({ NODE_ENV: isDevelopment ? 'development' : 'production' }),
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
    },
    devServer: {
        historyApiFallback: true,
        port: 3090,
        publicPath: '/dist/',
        proxy: {
            '/api': {
                target: 'http://localhost:3095',
                changeOrigin: true, // cors 에러
            },
        },
    },
};
if (isDevelopment && config.plugins) {
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new ReactRefreshWebpackPlugin());
}
if (!isDevelopment && config.plugins) {
}
export default config;
//# sourceMappingURL=webpack.config.js.map