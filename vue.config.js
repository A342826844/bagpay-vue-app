module.exports = {
    lintOnSave: true,
    devServer: {
        proxy: {
            '/': {
                /* 目标代理服务器地址 */
                target: 'https://bp-api.qdu.io/',
                /* 允许跨域 */
                ws: true,
                secure: false,
                changeOrigin: true,
                pathRewrite: {
                    '^/': '',
                },
            },
        },
    },
};
