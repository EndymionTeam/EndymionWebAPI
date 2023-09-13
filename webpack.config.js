const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        main:'./src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../browsersim/browsersim/EndymionBrowser_Data/StreamingAssets/www'),
        filename: '[name].[contenthash].bundle.js'
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Endimion Component Prototyope',
        template: 'src/webapi-cube.html',
        filename:'webapi-cube.html'
      })],
    optimization: {
        minimize: false
    },
    devServer: {
        liveReload: true,
        https:true,
        watchFiles: ['src/**/*.*'],
        static: {
          directory: path.join(__dirname, '../browsersim/browsersim/EndymionBrowser_Data/StreamingAssets/www'),
        },
        compress: true,
        port: 9001,
      },
};