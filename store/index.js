import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import course from './modules/course'
import arti from './modules/arti'
import city from './modules/city'
import todos from './modules/todus_vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: () => ({
        counter: 0,
        userData:{
          user:'测试',
          auhead:'测试'
        }
    }),
    getters:{
	      getUser: state => state.userData
    },
    actions:{
      async getUser({commit}){
        const {
          status,
          data: { user,auhead}
        } = await this.$axios.get("/users/getUser");
        if (status === 200) {
          commit('UpdateUser',{user,auhead})
          // this.user = window.decodeURIComponent(user);
          // this.auhead = auhead
        }
      }
    },
    mutations: {
        UpdateUser(state,{user,auhead}) {
          state.userData.user = window.decodeURIComponent(user);
          state.userData.auhead = auhead
        }
      },
    modules: {
        course,
        arti,
        city,
        todos
    },
})

export default store