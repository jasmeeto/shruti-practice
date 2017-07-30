import Vue from 'vue'
import Main from './Main.vue'

const NotFound = { template: '<p>Page not found</p>' }
const routes = {
  '/': Main
}

new Vue({
  el: '#app',
  install: function(Vue,) {
  },
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
