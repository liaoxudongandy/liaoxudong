<template>
    <div>
        <div v-if="imgHeight" class="copyRightBox" :style="{height:imgHeight?imgHeight+'px':'850upx'}">
            <span class="font" ref='sy' v-for="(item,index) in 500" :key='index'>
                {{sytext}}
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        name: "Watermark",
        data() {
            return {};
        },
        props: {
            sytext: String, // 水印文字
            imgHeight: String, // 水印高度
        },
        created() {
          
        },

    }
</script>
<style>
    .copyRightBox {
        overflow: hidden;
        width: 100%;
        height: 850upx;
        pointer-events: none;
        position: fixed;
        top: 0px;
        left: -50upx;
        z-index: 99998;
    }

    .font {
        float: left;
        transform: rotate(-30deg);
        margin-top: 30px;
        margin-left: 50px;
        font-size: 75upx;
        color: rgba(0, 0, 0, 0.2);
    }
</style>