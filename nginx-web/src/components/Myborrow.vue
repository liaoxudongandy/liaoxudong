<template>
    <v-container>

        <div class="signatureBox" v-show="sign_dialog">
            <div ref="canvasHW" class="canvasBox">
                <canvas ref="canvasF" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp">
                </canvas>
            </div>
            <div class="signature-btnArea">
                <v-btn class="btn" type="info" @click.native.prevent="handleGoBack()">返回</v-btn>
                <v-btn class="btn" type="info" @click.native.prevent="handleOverwrite()">重签</v-btn>
                <v-btn class="btn" type="info" @click.native.prevent="handleSubmit()">确认</v-btn>
            </div>
        </div>

        <v-btn @click="sign_dialog=true">111111 </v-btn>
        <v-btn @click="aaaaa()">test </v-btn>
        <div id="hahaha"></div>

        <Watermark :sytext="sytext" :imgHeight="imgHeight"></Watermark>

    </v-container>
</template>

<script>
import NELiveDetection from '@yidun/livedetect-sdk-h5';
    import Watermark from "../components/common/Watermark.vue";
    export default {
        name: 'Myborrow',
        components: {
            Watermark,
        },
        data() {
            return {
                sytext: "哈哈111",
                imgHeight: '500',
                sign_dialog: true,
                points: [],
                canvasTxt: null,
                stage_info: [],
                startX: 0,
                startY: 0,
                moveY: 0,
                moveX: 0,
                isDown: false,
                strokeStyle: '#000',
                lineWidth: 2
            }
        },

        mounted() {
            this.initCanvas()
            this.sign_dialog = false
           
        },
        created() {
           this.NELiveDetectiona()
        },
        methods: {
            aaaaa() {
                this.instance.start()
            },
            NELiveDetectiona() {
                const neLiveDetection = new NELiveDetection({
                    businessKey: '易盾申请的 businessKey',
                    container: '#hahaha',
                    diameter: 220,
                    onMount: (instance) => {},
                    // 等价于 instance.on('ready', () => {})
                    onReady: (instance) => {},
                });
                // 实例化后必须调用 mount 方法
                neLiveDetection && neLiveDetection.mount();
                // 调用 start 方法开始活体检测流程
                neLiveDetection.on('ready', () => {
                    neLiveDetection.start();
                });

                // 流程走完并检验完成
                neLiveDetection.on('verify', (token) => {
                    console.log('token:', token);
                    // 在校验成功后拿到 token 去做服务端校验
                });

                // 发生错误
                neLiveDetection.on('error', (err) => {
                    console.log('err:', err);
                    switch (err.name) {
                        case '10000': // 校验未通过错误码
                            // 如果校验未成功，会返回 err 对象，做后续处理
                            break;
                            // 其他错误码
                        default:
                            break;
                    }
                });
            },
            // 初始化Canvas
            async initCanvas() {
                let canvas = this.$refs.canvasF
                // 获取画布的高度
                canvas.height = this.$refs.canvasHW.offsetHeight - 20

                // 获取画布的宽度
                canvas.width = this.$refs.canvasHW.offsetWidth - 20
                // 创建 context 对象
                this.canvasTxt = canvas.getContext('2d')
                this.stage_info = canvas.getBoundingClientRect()
            },
            // 鼠标按下事件 - 准备绘画
            mouseDown(ev) {
                console.log(ev)
                ev = ev || event
                ev.preventDefault()
                if (ev) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.startX = obj.x
                    this.startY = obj.y
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.isDown = true
                }
            },
            // 触摸开始事件 - 准备绘画
            touchStart(ev) {
                console.log(ev)
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stage_info.left,
                        y: ev.targetTouches[0].clientY - this.stage_info.top,
                    }
                    this.startX = obj.x
                    this.startY = obj.y
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                }
            },
            // 鼠标移动事件 - 开始绘画
            mouseMove(ev) {
                ev = ev || event
                ev.preventDefault()
                if (this.isDown) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.moveY = obj.y
                    this.moveX = obj.x
                    this.canvasTxt.strokeStyle = this.strokeStyle
                    this.canvasTxt.lineWidth = this.lineWidth
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.startY = obj.y
                    this.startX = obj.x
                    this.points.push(obj)
                }
            },
            // 触摸移动事件 - 开始绘画
            touchMove(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stage_info.left,
                        y: ev.targetTouches[0].clientY - this.stage_info.top
                    }
                    this.moveY = obj.y
                    this.moveX = obj.x
                    // 设置线条颜色
                    this.canvasTxt.strokeStyle = this.strokeStyle
                    // 设置线条宽度
                    this.canvasTxt.lineWidth = this.lineWidth
                    // 绘制开始路径
                    this.canvasTxt.beginPath()
                    // 定义线条开始坐标
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    // 定义线条结束坐标
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    // 绘制线条
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.startY = obj.y
                    this.startX = obj.x
                    this.points.push(obj)
                }
            },
            // 松开鼠标事件 - 停止绘画
            mouseUp(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev) {
                    let obj = {
                        x: ev.offsetX,
                        y: ev.offsetY
                    }
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.points.push({ x: -1, y: -1 })
                    this.isDown = false
                }
            },
            // 触摸结束事件 - 停止绘画
            touchEnd(ev) {
                ev = ev || event
                ev.preventDefault()
                if (ev.touches.length == 1) {
                    let obj = {
                        x: ev.targetTouches[0].clientX - this.stage_info.left,
                        y: ev.targetTouches[0].clientY - this.stage_info.top
                    }
                    this.canvasTxt.beginPath()
                    this.canvasTxt.moveTo(this.startX, this.startY)
                    this.canvasTxt.lineTo(obj.x, obj.y)
                    this.canvasTxt.stroke()
                    this.canvasTxt.closePath()
                    this.points.push(obj)
                    this.points.push({ x: -1, y: -1 })
                }
            },
            // 返回
            handleGoBack() {
                this.handleOverwrite()
                this.$emit('on-back')
            },
            // 重写
            handleOverwrite() {
                this.canvasTxt.clearRect(0, 0, this.$refs.canvasF.width, this.$refs.canvasF.height)
                this.points = []
            },
            // 提交
            handleSubmit() {
                if (this.points.length < 50) {
                    if (this.points.length == 0) {
                        this.$message.error('请填写你的名称');
                    }
                    return
                }
                this.$emit('on-content', this.$refs.canvasF.toDataURL())
                console.log(this.$refs.canvasF.toDataURL())

                this.handleOverwrite()
                this.sign_dialog = false
            },

            //将base64转成文件对象
            dataURLtoFile(dataurl, filename) {
                let arr = dataurl.split(',')
                let data = arr[0].match(/:(.*?);/)[1]
                let bstr = atob(arr[1])
                let n = bstr.length
                let u8arr = new Uint8Array(n)
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n)
                }
                return new File([u8arr], filename, { type: data })
            },



        }
    }
</script>
<style>
    .canvasBox {
        box-sizing: border-box;
        border: 2px red solid;
    }

    .signatureBox {
        border: 2px black solid;
        width: 400px;
        height: 300px;
        box-sizing: border-box;
        overflow: hidden;
        background: #fff;
        z-index: 100;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        position: absolute;
        top: 50px;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
    }
</style>