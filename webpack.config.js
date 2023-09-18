const path = require('path');
module.exports = {
    mode: 'development',
    watch: true,
    entry: {
        main:'./src/endymion.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'endymion.min.js'
    },

    plugins: [],
    module:{
      rules:[]
    },
    optimization: {
        minimize: false
    }
};