import '../main'

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from 'appComp/App/App'

const app = new Vue({
  ...App
}).$mount('#app')