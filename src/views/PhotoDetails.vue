<template>
    <!--用到v-touch手势滑动         npm install vue-touch@next --save-->
    <div id="photo-details">
        <v-touch @swipeleft="onSwipeLeft" @swiperight="onSwipeRight">
            <img :src="list[index].src" alt="">
        </v-touch>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                //图片的索引
                index: this.$route.params.index
            }
        },
        computed: {
            list() {
                //获取vuex中的方法
                return this.$store.state.photoList
            }
        },
        methods: {
            onSwipeLeft() {
                this.index++;
                if(this.index == this.list.length){
                    this.index = this.list.length - 1;
                }
            },
            onSwipeRight() {
                this.index--;
                if (this.index < 0) {
                    this.index = 0;
                }
            },
        },
        //list数据是在photo页面拿到的,如果刷新后直接进入到图片详情页会报错 因为list为空，用导航守卫 在进入页面之前进行拦截
        //如果是从photo页面进来则继续显示，如果不是则返回到photo页
        beforeRouteEnter(to,from,next){
            console.log(to);
            console.log(from);
            if(from.path == '/photo'){
                next()
            } else{
                next('/photo')
            }
        }
    }
</script>

<style lang="scss" scoped>
    #photo-details {
        width: 100%;
        position: absolute;
        top: 1rem;
        bottom: 1rem;
        right: 0;
        left: 0;

        img {
            width: 100%;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
        }
    }
</style>