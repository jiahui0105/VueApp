<template>
    <div id="photo">
        <img v-for="(item,index) in list" :key="index" :src="item.src" alt="" @click="goDetails(index)">
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                //两个兄弟组件photo和photodetails用到相同的list，用vuex  传给父组件 通过父子组件传值来实现
                // list: []
            }
        },
        computed: {
            list() {
                //获取vuex中的方法
                return this.$store.state.photoList
            }
        },
        methods: {
            getData() {
                axios.get('/data/photodata.json')
                    .then(res => {
                        console.log(res);
                        // this.list = res.data.photoData;

                        // this.$store.commit调用store.js中mutation方法  commit第一个参数为要调用的方法，第二个参数为要传参的数组
                        this.$store.commit('setList',res.data.photoData);

                    }).catch(err =>{
                    console.log(err);
                })
            },
            goDetails(index) {
                //url传参  传的index是变量
                this.$router.push('/photodetails/'+index);
            }
        },
        created(){
            this.getData();
        }
    }
</script>

<style lang="scss" scoped>
    #photo {
        img {
            width: 50%;
        }
    }
</style>