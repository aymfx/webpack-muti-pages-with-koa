const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');
// const getEntys = require('./util/getEntry');

// 开发环境配置
const devConfig = {
    mode: 'development',
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};

module.exports = webpackMerge(baseConfig, devConfig);