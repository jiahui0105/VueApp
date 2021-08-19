<template>
    <!--用到vue-easy-slider  npm install vue-easy-slider --save-->
    <!--slider表示轮播图容器 slider-item表示轮播图的每一页内容-->
    <div id="book">
        <slider animation="fade" :control-btn="false">
            <slider-item v-for="(item,index) in book" :key="index">
                <!--属性值使变量的话 要用v-bind绑定-->
                <img :src="item" alt="">
            </slider-item>
        </slider>
    </div>
</template>

<script>
    import { Slider, SliderItem } from 'vue-easy-slider';
    export default {
        data() {
            return {
                book: [
                    "https://img3.doubanio.com/lpic/s24468373.jpg",
                    "https://img3.doubanio.com/lpic/s27102925.jpg",
                    "https://img3.doubanio.com/lpic/s6989253.jpg",
                    ]
            }
        },
        components: {
            Slider,
            SliderItem
        }
    }
</script>

<style lang="scss" scoped>
    #book {
        text-align: center;
        img{
            height: 100%;
        }
    }
</style>