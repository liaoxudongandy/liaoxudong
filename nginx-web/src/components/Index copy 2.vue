<template>
    <section id="section">
        <div class="l"></div>
        <div class="r"></div>
    </section>
</template>
<script>
    
    export default {

    }
</script>
<style scoped>
    #section {
        margin: 100px auto;
        height: 500px;
        width:500px;
        background: url("https://wow.nosdn.127.net/1/wxservice/XXXX/war3/背景图-新图推荐.png") no-repeat;
        position: relative;
        border: 1px solid blue;
        overflow: hidden;
    }

    .l {
        height: 50%;
        width: 100%;
        background-color: skyblue;
        position: relative;
        transition: all 3.9s;
    }

    .r {
        height: 50%;
        width: 100%;
        background-color: skyblue;
        position: relative;
        transition: all 3.9s;
    }

    .l {
        left: 0;
        top: 0;
        border-bottom: 1px solid red;
        transform-origin: top;

    }

    .r {
        right: 0;
        top: 0;
        border-top: 1px solid red;
        transform-origin: bottom;


    }

    #section:hover .l {

        transform: rotateX(-180deg);
    }

    #section:hover .r {
        transform: rotateX(180deg);
    }
</style>