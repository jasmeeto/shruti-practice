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
      console.log(this.currentRoute)
      return routes[this.currentRoute] ||
             routes[this.currentRoute.replace('shruti-practice','')] ||
             routes[this.currentRoute.replace('shruti-practice/','')] ||
             NotFound
    }
  },
  render (h) { return h(this.ViewComponent) }
})
