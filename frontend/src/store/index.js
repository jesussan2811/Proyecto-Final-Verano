import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardgames: [],
    boardgame: {},
    favoritos: [],
    favorito: {},
    loading: false
  },
  mutations: {
    SET_BOARDGAMES(state, boardgames) {
      state.boardgames = boardgames;
    },
    SET_LOADING(state, newValue) {
      state.loading = newValue;
    },
    SET_BOARDGAME(state, boardgame) {
      state.boardgame = boardgame;
    },
    SET_FAVORITES(state, favoritos) {
      state.favoritos = favoritos;
    },
    SET_FAVORITE(state, favorito) {
      state.favorito = favorito;
    }
  },
  actions: {
    listar({commit}) {
      commit('SET_LOADING', true);
      axios.get('http://localhost:3000/boardgame')
      .then(res => commit('SET_BOARDGAMES', res.data))
      .finally(() =>  commit('SET_LOADING', false));
    },
    crearBoardgame({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/boardgame', params)
      .then(onComplete)
      .catch(onError);
    },
    obtenerboardgame({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/boardgame/${id}`)
      .then(res => {
        commit('SET_BOARDGAME', res.data.result);
        onComplete(res);
      })
      .catch(onError);
    },
    editarBoardgame({commit}, {id, params, onComplete, onError}){
      axios.put(`http://localhost:3000/boardgame/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    eliminarBoardgame({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/boardgame/${id}`)
      .then(onComplete)
      .catch(onError);
    },
    listarFavorites({commit}) {
      commit('SET_LOADING', true);
      axios.get('http://localhost:3000/favorite')
      .then(res => commit('SET_FAVORITES', res.data))
      .finally(() =>  commit('SET_LOADING', false));
    },
    agregarFavorite({commit}, {params, onComplete, onError}){
      axios.post(`http://localhost:3000/favorite/${id}`)
      .then(onComplete)
      .catch(onError);
    },
    eliminarFavorite({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/favorite/${id}`)
      .then(onComplete)
      .catch(onError);
    }
  },
  modules: {
  }
})
