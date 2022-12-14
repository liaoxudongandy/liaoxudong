module.exports = {
    transpileDependencies: [
        'vuetify'
    ],

    chainWebpack: (config) => {
        config.devServer.host("0.0.0.0").port("40202");
    },
    devServer: {
        proxy: {
            //配置跨域
            // "/wxapi": {
            //     target: "http://192.168.104.121:38001/", //这里后台的地址
            //     ws: true,
            //     changOrigin: true //允许跨域
            // },
            "/reward_get": {
                target: "http://192.168.100.74:38100/", //这里后台的地址
                ws: true,
                changOrigin: true //允许跨域
            },

        }
    },
    lintOnSave: false //关闭严格模式
}