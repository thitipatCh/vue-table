import Vue from 'vue'
import Vuex from 'vuex'
import Sensor from './sensor'

// Modules

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Sensor
  },
  strict: process.env.DEV,
})