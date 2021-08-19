<template>
    <!--用到vue-aplayer   npm install @moefe/vue-aplayer --save -->
    <div>
        <!--audio:设置要播放的音频对象或播放列表-->
        <!--v-if 成功获取属性后再渲染页面 否则会报错-->
        <a-player v-if="list.length>0" :audio="list" :lrc-type="3"></a-player>
    </div>
</template>

<script>
    import axios from 'axios'

    //先封装一个方法getData用axios发送请求来获取数据，获取的数据res为数组，然后在data中定义一个数组list来接收获取的数据，并把res赋值给list
    //进入页面时 用created钩子函数调用方法getData来获取需要的数据
    //把数据显示在页面 用vue-aplayer插件
    export default {
        data() {
            return {
                audio: {
                    name: '东西（Cover：林俊呈）',
                    artist: '纳豆',
                    url: 'https://cdn.moefe.org/music/mp3/thing.mp3',
                    cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
                    lrc: 'https://cdn.moefe.org/music/lrc/thing.lrc',
                },
                list: []
            }
        },
        methods: {
            //获取歌单数据
            getData() {
                axios.get(`/data/musicdata.json`)
                    .then(res => {
                        console.log(res);
                        this.list = res.data.musicData;
                    }).catch(err =>{
                    console.log(err);
                })
            }
        },
        created() {
            this.getData()
        }
    }
</script>

<style lang="scss" scoped>

</style>