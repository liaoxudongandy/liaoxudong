<template>
    <v-container>
        <div style="font-size:36px;color:red">大家来抽奖啦！！！</div>
        <div>
            <v-card v-if="vcardshow" @click="Lottery()" color="green" class="d-flex justify-center align-center vcard_position" width="300" height="100">我要抽奖</v-card>
            <v-card color="transparent" class="d-flex justify-center align-center " width="300" height="100"><span :style="reward=='无抽奖次数了'?'color:red':''">{{reward}}</span></v-card>
            <v-card flat class="d-flex align-center" width="400">
                <v-text-field label="请输入姓名" v-model="name" :rules="nameRules"></v-text-field>
                <v-btn @click="getReward()">姓名确认</v-btn>
                <v-btn @click="(vcardshow=true)">再抽一次</v-btn>
            </v-card>

        </div>
        <p>你还可以抽<span style="color:red">{{remain}}</span>次</p>
        你之前获得的奖品是：
        <v-list>
            <v-list-item v-for="list in rewardlist" :key="list">
                <span class="aaaaaa">奖品：{{list.reward}}</span> <span class="pl-10">品质：{{list.quality}}</span>
            </v-list-item>
        </v-list>
    </v-container>
</template>
<script>
    var isChn = function(str) {
        var reg = /^[\u4e00-\u9fa5]+[·•][\u4e00-\u9fa5]+$/;
        var reg1 = /^[\u4e00-\u9fa5]+$/;
        if (reg.test(str) || reg1.test(str)) {
            // alert("全是中文");
            return true;
        } else {
            // alert("不全是中文");
            return false;
        }
    }
    export default {
        data() {
            return {
                nameRules: [(v) => !!v || "", (v) => isChn(v) || "请输入中文姓名", (v) => v.length <= 3 || "最多只能填写3个中文"],
                name: "",
                vcardshow: true,
                rewardlist: [],
                rewardlength: '',
                reward: '',
                remain: ''
            }
        },
        created() {
            this.getReward()
        },
        methods: {
            getReward() {
                var me = this;
                me.axios({
                    method: "get",
                    url: "/reward_get/extend/get",
                    params: {
                        user: me.name
                    }
                }).then(rep => {
                    console.log(rep)
                    me.rewardlist = rep.data.data;
                    me.remain = rep.data.remain


                }, )
            },

            Lottery() {
                var me = this;
                me.vcardshow = false;
                if (me.name != '') {
                    me.axios({
                        method: "post",
                        url: "/reward_get/extend/submit",
                        params: {
                            user: me.name
                        }
                    }).then(rep => {
                        me.reward = rep.data.data.item
                        console.log(rep.data.data.item)
                        if (rep.data.status == '无抽奖次数了') {
                            me.reward = '无抽奖次数了'
                        }
                        this.getReward()
                    }, )
                } else {
                    me.reward = '请输入姓名'
                }

            }
        },
    }
</script>
<style socped>
    .vcard_position {
        position: relative;
        top: 100px;
        right: 0px;
        z-index: 5;
    }

    .aaaaaa {
        white-space: pre-wrap
    }
</style>