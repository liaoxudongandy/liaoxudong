import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import vuetify from './plugins/vuetify'
import VueRouter from "vue-router";
import Routers from "./routers";
import * as THREE from 'three';
import QRCode from 'qrcodejs2'; //引入生成二维码插件
import * as echarts from 'echarts';
import 'echarts/extension/bmap/bmap';
import NELiveDetection from '@yidun/livedetect-sdk-h5';

// 样式文件引入
import '@yidun/livedetect-sdk-h5/dist/es/NELiveDetection.css';



Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const scene = new THREE.Scene();

const router = new VueRouter({
    mode: "history",

    routes: Routers, // (缩写) 相当于 routes: routes
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

new Vue({
    vuetify,
    router,
    scene,
    THREE,
    QRCode,
    NELiveDetection,
    render: h => h(App)
}).$mount('#app')

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};