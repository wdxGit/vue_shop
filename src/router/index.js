import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

import Shop from '../pages/Shop/Shop.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'

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
    }, {
        path: '/shop',
        component: Shop,
        children: [{
            path: '',
            redirect: '/shop/goods'
        }, {
            path: '/shop/Info',
            name: 'shopInfo',
            component: ShopInfo
        }, {
            path: '/shop/goods',
            name: 'shopGoods',
            component: ShopGoods
        }, {
            path: '/shop/ratings',
            name: 'shopRatings',
            component: ShopRatings
        }]
    }]
})