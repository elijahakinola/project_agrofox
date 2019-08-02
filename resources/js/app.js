/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import VeeValidate from 'vee-validate'
import VueApexCharts from 'vue-apexcharts'
import VueSweetalert2 from 'vue-sweetalert2'
import Loader from '../js/components/errors/Loader'
import Connection from '../js/components/layouts/Connection'
import { store } from './store/store'
import Vuex from 'vuex'
import 'es6-promise/auto'



import {routes } from './routes'



Vue.use(Vuetify)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate, {
    validity: true
  })


/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

//Vue.component('app-home', require('./components/AppHome.vue').default);
Vue.component('app-start', require('./components/AppStart.vue').default);
Vue.component('apexchart', VueApexCharts)
Vue.component('custom-loader', Loader)
Vue.component('custom-connection', Connection)

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


const router = new VueRouter({
    routes,
    mode: 'history'
});

const app = new Vue({
    el: '#app',
    store,
    router
});
