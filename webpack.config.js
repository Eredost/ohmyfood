const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            }
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'src/assets/'
                },
            ]
        }),
        new BrowserSyncPlugin({
            files: ['src/scss/*.scss', 'src/assets/*.html'],
            startPath: '/public',
            host: 'localhost',
            port: 3000,
            proxy: 'http://localhost:8080/',
        }, {
            reload: false
        })
    ],
    devServer: {
        publicPath: '/public/',
        stats: 'errors-only',
        host: process.env.HOST,
        port: process.env.PORT,
        open: false
    }
};
