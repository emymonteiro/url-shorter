import { createStore } from 'vuex'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import router from '../router'

export default createStore({
  state: {
    user: null
  },
  mutations: {
    SET_USER (state, user){
      state.user = user
    },
    CLEAR_USER (state){
      state.user = null
    }
  },
  actions: {
    async login({ commit}, details){
      const { email, password } = details

      try{
        await signInWithEmailAndPassword(auth, email, password)
      }catch(err){
        switch(err.code)
        {
          case 'auth/user-not-found':
            alert("User not found")
            break
          case 'auth/wrong-password':
            alert("wrong password")
            break;
          default:
            alert("something went wrong")
          }
          return
        }
        commit('SET_USER', auth.currentUser)

        router.push('/')
    },

    async register({ commit}, details){
      const { email, password } = details

      try{
        await createUserWithEmailAndPassword(auth, email, password)
      }catch(err){
        switch(err.code)
        {
          case 'auth/email-already-in-use':
            return 'Email já está em uso'
          case 'auth/invalid-email':
            return 'Email inválido'
          case 'auth/operation-not-allowed':
            return 'Operação não permitida'
          case 'auth/weak-password':
            return 'Senha fraca'
          default:
            return "something went wrong"
        }
      }
      router.push('/')
      commit('SET_USER', auth.currentUser)
    },
    
    async logout ({ commit }){
      await signOut(auth)

      commit('CLEAR_USER')
      router.push('/')
    },

    fetchUser ({commit}){
      auth.onAuthStateChanged(async user => {
        if (user === null){
          commit('CLEAR_USER')
        }else{
          commit('SET_USER', user)

          if (router.isReady() && router.currentRoute.value.path === '/login'){
            router.push('/')
          }
        }
      })
    }

  },
  modules: {
  }
})
