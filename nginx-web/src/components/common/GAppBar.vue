<template>
    <v-app-bar app>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <!-- <v-toolbar-title>廖旭东专用测试小网站</v-toolbar-title> -->
        <v-toolbar-items v-for="list in nav" :key="list.btnName">
            <v-btn text :to="list.to">{{ list.btnName }}</v-btn>
        </v-toolbar-items>
        <v-spacer></v-spacer>
        <v-toolbar-title class="p_style">廖旭东测试小网站</v-toolbar-title>
    </v-app-bar>
</template>
<script>
    export default {
        name: "g-app-bar",
        props: {
            nav: {
                type: Array,
                default: function() {
                    return [
                        { btnName: "MENU1", to: "" },
                        { btnName: "MENU2", to: "" },
                        { btnName: "MENU3", to: "" },
                        { btnName: "MENU4", to: "" },
                    ];
                },
            },
        },
        data() {
            return {};
        },
    };
</script>
<style socped>
    .p_style {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.32);
        text-align: justify;
    }
</style>