import { createStore } from 'vuex'
import { auth , db } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import router from '../router'
import axios from 'axios'

import  { doc, getDoc, setDoc } from 'firebase/firestore'

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4/',
  timeout: 1000,
  headers: {'Authorization': 'Bearer 26cba2c97fa6945b02d89ab23831efb6d92bce3a'}
});

export default createStore({
  state: {
    user: null,

    response: null,

    database: null
  },

  mutations: {

    SET_USER (state, user){
      state.user = user
    },
    CLEAR_USER (state){
      state.user = null
    },


    SET_RES(state, data){
      state.response = data
    },
    CLEAR_RES(state){
      state.response = null
    },


    SET_DATABASE(state, data){
      state.database = data
    },
    CLEAR_DATABASE(state){
      state.database = null
    },
    
  },

  actions: {

    async getDB({ commit, state}){
      if (!state.user)
        return
      
      const data = await doc(db, "users", state.user.uid)
      const docs = await getDoc(data)
      if (docs.exists()){
        const sorting = Object.entries(docs.data().values).sort((a,b) => Number(b[1].favorited) - Number(a[1].favorited));
        commit('SET_DATABASE', sorting)
      }
    },


    async updateDB({state}, info){
      if (!state.user)
        return
      
      const data = await doc(db, "users", state.user.uid)
      const docs = await getDoc(data)
      let values = {}
      if (docs.exists()){
        values = docs.data().values
      }
      values[info.cutted] = { link: info.extended, favorited: false}

      await setDoc(data, { values })
      this.dispatch("getDB")
    },


    async deleteFromDB({ state}, result){
      if (!state.user)
        return
      
      const data = await doc(db, "users", state.user.uid)
      const docs = await getDoc(data)

      const values = docs.data().values

      delete values[result]

      await setDoc(data, { values })
      this.dispatch("getDB")
    },

    async favoriteLink({ state}, result){
      if (!state.user)
      return

    const data = await doc(db, "users", state.user.uid)
    const docs = await getDoc(data)

    const values = docs.data().values

    values[result].favorited = !values[result].favorited

    await setDoc(data, { values })
    this.dispatch("getDB")
    },


    async getAPI({ commit}, params){
      const res = await api.get(params)
      commit('SET_RES', res.data)
    },


    resetAPI({commit}){
      commit('CLEAR_RES')
    },


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
      commit('CLEAR_DATABASE')
      router.push('/')
    },
    

    fetchUser ({commit}){
      auth.onAuthStateChanged(async user => {
        if (user === null){
          commit('CLEAR_USER')
          commit('CLEAR_DATABASE')
        }else{
          commit('SET_USER', user)
          this.dispatch('getDB')
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
