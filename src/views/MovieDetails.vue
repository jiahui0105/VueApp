<template>
    <div id="movie-details" v-if="details && details.data">
        <!--data[0]是通过接口请求回来的数据，会有一段时间的延迟 渲染页面前数据未拿回来，或者可能没有该属性，此时会报错 Cannot read property '0' of undefined-->
        <!--加一个判断v-if 确定有data属性再渲染到页面-->
        <img :src="details.data[0].poster" alt="">
        <div id="movie-inner">
        <h2>{{details.data[0].name}}</h2>
        <p v-if="details.data[0].description">{{details.data[0].description}}</p>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data() {
            return {
                id: this.$route.query.id,
                details: {}
            }
        },
        methods: {
            //根据路由跳转时带的参数id，获取对应的电影详情信息
            getDetails(){
                //https://movie.querydata.org/api?id=${this.id}
                axios.get(`https://movie.querydata.org/api?id=${this.id}`)
                    .then(res => {
                        console.log('请求数据成功');
                        //把获取的数据赋值给已经定义的details属性
                        this.details = res.data;
                    }).catch(err =>{
                        console.log(err);
                })
            }
        },
        created(){
            this.getDetails();
        }
    }
</script>

<style lang="scss" scoped>
    #movie-details{
        img{
            width: 100%;
        }
        #movie-inner{
            padding: 0.2rem;
        }
    }
</style>