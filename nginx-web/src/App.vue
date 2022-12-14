<template>
  <v-app>
  <!-- 引用组件 -->
   <g-app-bar :nav = "nav"></g-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import GAppBar from './components/common/GAppBar'
export default {
  name: "App",

  components: {
    GAppBar,
  },

  data: () => ({
   nav: [
        {
          btnName: "公司抽奖",
          to: "/index",
        },
        {
          btnName: "书架",
          to: "/bookshelf",
        },
        {
          btnName: "我的借阅",
          to: "/borrow",
        },
        {
          btnName: "管理员",
          to: "/admin",
        },
      ],
  }),
  mounted() {
    this.getsign();
  },
  methods: {
    getsign() {
      var me = this;

      me.axios({
        method: "get",
        url: "/wxapi/getJSSDKSign",
        params: {
          url: location.href.split("#")[0],
        },
      }).then((rep) => {
        const params = rep.data;
        console.log(params.appId);
        wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: params.appId, // 必填，公众号的唯一标识
          timestamp: params.timestamp, // 必填，生成签名的时间戳
          nonceStr: params.nonceStr, // 必填，生成签名的随机串
          signature: params.signature, // 必填，签名
          jsApiList: [
            "chooseImage",
            "getLocalImgData",
            "updateAppMessageShareData",
            "updateTimelineShareData",
            "previewImage",
          ], // 必填，需要使用的JS接口列表
        });
        wx.ready(function() {
          console.log("successSDK");
          setTimeout(() => {
        console.log("successSDKsettimeout");
          }, 400);
          // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        });
      });
    },
  },
};
</script>
