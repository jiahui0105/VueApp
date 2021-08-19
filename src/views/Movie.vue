<template>
    <div id="movie">
        <section class="movie-list" v-for="obj in movieList" :key="obj.index" @click="goDetails(obj.id)">
            <img class="movie-img" :src="obj.cover" alt="">
            <div class="movie-info">
                <h4>{{obj.title}}</h4>
                <p>评分:{{obj.rate}}</p>
            </div>
        </section>
        
        <div id="cover" v-show="cover">
            <img src="../assets/images/loading.gif" alt="">
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return{
                //电影列表
                movieList: [],
                //每页请求多少数据
                pageCount: 10,
                //每次从第几页数据开始请求
                pageStart: 0,
                cover: false
            }
        },

        methods: {
            //获取电影列表数据
            getList() {
                this.cover = true;  //loading默认是隐藏的，当获取电影列表时显示

                // axios.get(url)发送get请求 url请求地址
                // 跨域 前后端数据交互  jsonbird  在url前面加上 https://bird.ioliu.cn/v1?url=
                //https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit{this.pageCount}&page_start=${this.pageStart}

                axios.get( `/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=${this.pageCount}&page_start=${this.pageStart}`)
                    .then( res => {
                    //请求成功的回调
                        console.log('请求数据成功');
                        this.cover = false;  //loading在拿到数据后隐藏
                        // this.movieList = res.data.subjects;   //每次新获取的数据
                        //es6语法 扩展运算符... 可以做到拼接  把新获取的数据加到原来的数据后
                        this.movieList = [...this.movieList,...res.data.subjects]
                    }).catch( err =>{
                    //error时的回调
                    this.cover = false;
                    console.log(err)
                    })
            },
            //进入电影详情页面
            goDetails(id) {
                console.log(id);
                this.$router.push({
                    path: '/moviedetails',
                    query: {
                        // id: id,  //属性名和属性一样时 可以简写
                        id
                    }
                })
            }
        },
        //data属性能获取到 一般情况下如果进入页面就要获取数据 会在created钩子函数内获取数据
        created(){
            //vue实例创建完成后 立马获取当前页面需要的数据
            //在methods中单独封装一个方法 而不是直接写在created里
            this.getList();

            //监听windows的滚动事件 只要页面滚动就进入到这个方法里
            window.onscroll = () => {
                //电影页面滚动出去的高度
                let topHeight = document.documentElement.scrollTop;
                //电影页面可视区高度（电影页面高度）
                let clientHeight = document.documentElement.clientHeight;
                //电影页面可滚动的高度
                let scHeight = document.documentElement.scrollHeight;
                // console.log(clientHeight,topHeight);
                // console.log(scHeight);

                //当滚动出去的高度和页面可视区高度的和等于页面可滚动的总高度时 即为页面滚动到底了
                if(scHeight == topHeight + clientHeight) {
                    // this.pageStart = this.pageStart + this.pageCount;
                    this.pageStart = this.movieList.length;
                    this.getList();

                }
            }


        },
    }


</script>

<style lang="scss" scoped>
    #movie{
        .movie-list{
            display: flex;
            padding: 0.2rem;
            border-bottom: 1px solid #ccc;
            .movie-img{
                width: 1.5rem;
            }
            .movie-info{
                flex:1;
                margin-left: 0.1rem;
            }
        }

        #cover{
            background: rgba(0,0,0,0.6);
            position: fixed;
            top: 1rem;
            left: 0;
            right: 0;
            bottom: 1rem;

            img{
                width: 1rem;
                margin: 5rem 0 auto;
                position: absolute;
                /*top: 50%;*/
                left: 50%;
                transform: translateX(-50%);
            }
        }
    }
</style>