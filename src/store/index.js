import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //两个组件公用 默认空数组
    photoList:[],
  },
  mutations: {
    //获取空数组之后设置
    setList(state,list) {
      state.photoList = list;
    }
  },
  actions: {
  },
  modules: {
  }
})
