import Vue from 'vue'
import Vuex from 'vuex'
import course from './modules/course'
import arti from './modules/arti'
import city from './modules/city'
import todos from './modules/todus_vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: () => ({
        counter: 0
      }),
    mutations: {
        increment (state) {
          state.counter++
        }
      },
    modules: {
        course,
        arti,
        city,
        todos
    },
    actions: {
       
    }
})

export default store