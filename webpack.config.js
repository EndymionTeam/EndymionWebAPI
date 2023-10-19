const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

var config = {
    entry: {
        endymion:'./src/endymion.ts',
    },
    output: {
        path: path.resolve(__dirname, 'compiled'),
        filename: '[name].js'
    },
    plugins:[
      new CleanWebpackPlugin()
    ],
    module:{
      rules:[
              {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
              }
            ]
    },
    resolve:{
       extensions: ['.tsx', '.ts', '.js'],
    },
};

module.exports = (env, argv)=>{
  config.mode = (argv.mode === 'development')?'development':'production';
  config.watch = (argv.watch);
  switch(config.mode){
    case 'development':
      config.optimization = { minimize: false };
      break;
    case 'production':
      config.optimization = { minimize: true };
      break;
  }
  return config;
}