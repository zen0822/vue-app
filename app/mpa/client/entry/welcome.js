import '../main'

import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from 'appComp/Welcome/Welcome'

const app = new Vue({
  ...Welcome
}).$mount('#app')