const path = require('path')

function resolve (dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? 'http://ddbyan.oss-cn-zhangjiakou.aliyuncs.com/htdocs/' : './',
    outputDir: 'htdocs',
    assetsDir: 'ddbxry',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    chainWebpack: (config) => {
        config.resolve.alias.set('@', resolve('src'))
            .set('@assets', resolve('src/assets'))
            .set('@utils', resolve('src/utils'))
            .set('@api', resolve('src/api'))
            .set('@c', resolve('src/components'))
        config.plugins.delete('prefetch')
    },
    devServer: {
        port: 8080,
        proxy: {
            '/zqxry': {
                target: 'http://xry.dodohz.com/',
                // target: 'http://192.168.0.200',
                // target: 'http://192.168.0.105', // 对应自己的接口 target: 'http://xrybiz.tsw202.com/'
                changeOrigin: true
                // ws: true,
                // pathRewrite: {
                //     '^/zqxry': ''
                // }
            }
        }
    },
    filenameHashing: false
}
