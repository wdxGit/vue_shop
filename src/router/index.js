import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        redirect: '/msite'
    }, {
        path: '/msite',
        name: 'msite',
        component: Msite,
        meta: {
            showfooter: true
        }
    }, {
        path: '/search',
        name: 'search',
        component: Search,
        meta: {
            showfooter: true
        }
    }, {
        path: '/order',
        name: 'order',
        component: Order,
        meta: {
            showfooter: true
        }
    }, {
        path: '/profile',
        name: 'profile',
        component: Profile,
        meta: {
            showfooter: true
        }
    }, {
        path: '/login',
        name: 'login',
        component: Login
    }]
})