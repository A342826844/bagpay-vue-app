const vConsolePlugin = require('vconsole-webpack-plugin');

module.exports = {
    lintOnSave: true,
    // devServer: {
    //     proxy: {
    //         '/api': {
    //             /* 目标代理服务器地址 */
    //             target: 'https://bp-api.qdu.io/',
    //             /* 允许跨域 */
    //             ws: true,
    //             secure: false,
    //             changeOrigin: true,
    //             pathRewrite: {
    //                 '^/api': '',
    //             },
    //         },
    //     },
    // },
    configureWebpack: (config) => {
        // 需要显示vconsole
        if (process.env.VUE_APP_SHOW_VCONSOLE || process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-param-reassign,new-cap
            config.plugins = [...config.plugins, new vConsolePlugin({
                filter: [], // 需要过滤的入口文件
                enable: true,
            })];
        }
    },
    productionSourceMap: false,
    publicPath: './',
    // css: {
    //     extract: true
    // }
};
