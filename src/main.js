import Vue from 'vue'
import App from './App.vue'
import PortalVue from 'portal-vue'

Vue.config.productionTip = false

import Button from './components/Button/Button'
Vue.component("Button", Button)

Vue.use(PortalVue)

new Vue({
  render: h => h(App)
}).$mount('#app')
