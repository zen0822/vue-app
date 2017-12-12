import './App.scss'
import template from './App.pug'

import store from '../vuex/store'
import commonStore from '../vuex/module/common/type.json'

import Welcome from 'appComp/Welcome/Welcome'

require('file-loader?name=favicon.ico!appAsset/favicon.ico')

export default {
  name: 'app',

  store,

  data() {
    return {
      bodyHeight: 0
    }
  },

  template: template(),

  components: {
    'welcome': Welcome
  },

  computed: {
    windowProps() {
      return this.$store.getters[commonStore.window.get]
    }
  },

  watch: {
    'windowProps' (val) {
      let bodyHeight = document.body.offsetHeight
      this.bodyHeight = bodyHeight
    }
  },

  mounted() {
    this.$store.dispatch(commonStore.window.add, {
      prop: 'innerHeight',
      value: window.innerHeight
    })
  }
}