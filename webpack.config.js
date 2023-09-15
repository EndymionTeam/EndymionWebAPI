const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        main:'./src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../brosim/brosim/EndymionBrowser_Data/StreamingAssets/www'),
        filename: '[name].[contenthash].bundle.js'
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: "src/assets",  to: "assets" },
          { from: "src/arsd/webapi" },
        ],
      }),
      // new HtmlWebpackPlugin({
      //   title: 'Endimion Component Prototyope',
      //   template: 'src/webapi-cube.html',
      //   filename:'webapi-cube.html'
      // }),
      // new HtmlWebpackPlugin({
      //   title: 'Endimion Component Prototyope',
      //   template: 'src/avviasfida_1.html',
      //   filename:'avviasfida_1.html'
      // }),
      // new HtmlWebpackPlugin({
      //   title: 'Endimion Component Prototyope',
      //   template: 'src/avviasfida_1_orig.html',
      //   filename:'avviasfida_1_orig.html'
      // }),
      new HtmlWebpackPlugin({
        title: 'Web Api Basic',
        template: 'src/webapi-basic.html',
        filename:'webapi-basic.html'
      }),
      // new HtmlWebpackPlugin({
      //   title: 'Web Api Basic',
      //   template: 'src/webapi-basic_orig.html',
      //   filename:'webapi-basic_orig.html'
      // })
    ],
    optimization: {
        minimize: false
    },
    devServer: {
        liveReload: true,
        https:true,
        watchFiles: ['src/**/*.*'],
        static: {
          directory: path.join(__dirname, '../brosim/brosim/EndymionBrowser_Data/StreamingAssets/www'),
        },
        compress: true,
        port: 9001,
      },
};