const state = () => ({
    list: []
  })
  
const mutations = {
    add (state, text) {
      state.list.push({
        text,
        done: false
      })
    },
    remove (state, {todo,idx}) {
      console.log(idx)
    
      state.list.splice(state.list[idx],1)

      //state.list.splice(state.list.indexOf(todo),1)
      
    },
    toggle (state, todo) {
      todo.done = !todo.done
    }
  }
 
  export default {
    namespaced: true,
    state,
    mutations
}  