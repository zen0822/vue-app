import './App.scss'
import template from './App.pug'

import store from 'appVuex/store'
import commonStore from 'appVuex/module/common/type.json'

export default {
  name: 'app',

  store,

  data() {
    return {
      bodyHeight: 0
    }
  },

  template: template(),

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