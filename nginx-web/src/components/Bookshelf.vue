<template>
    <v-container>
        <v-card class="d-flex justify-center align-center" height="200">
            <v-btn @click="showCard()">点我二维码</v-btn>
            <v-dialog v-model="isshowcard">
                <div id="qrCode" ref="qrCodeDiv">11111</div>
            </v-dialog>

        </v-card>
        <v-btn @click="dialog=true">签名</v-btn>

        <Myborrow v-show="dialog"></Myborrow>

    </v-container>
</template>
<script>
    import Myborrow from './Myborrow.vue'; //引入生成二维码插件
    import QRCode from 'qrcodejs2'; //引入生成二维码插件
    export default {
        components: {
            Myborrow
        },
        data() {
            return {
                dialog: false,
                isshowcard: false,
                id: "11111"
            }
        },
        methods: {
            showCard() {
                this.isshowcard = true;
                this.createQRCode()
            },
            createQRCode() {
                this.$nextTick(() => {
                    this.$refs.qrCodeDiv.innerHTML = ''; //二维码清除
                    new QRCode(this.$refs.qrCodeDiv, {
                        text: 'https://www.baidu.com/?id=' + this.id, //二维码链接，参数是否添加看需求
                        width: 300, //二维码宽度
                        height: 300, //二维码高度
                        colorDark: "#333333", //二维码颜色
                        colorLight: "#ffffff", //二维码背景色
                        correctLevel: QRCode.CorrectLevel.L //容错率，L/M/H
                    });
                })

            },


        },
    }
</script>
<style>

</style>