<template>
  <div class="msite">
    <HeaderTop :title="address.name">
      <span slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
    </HeaderTop>
 
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide swiper-slide-active"  v-for="(categorys, index) in categorysArr" :key="index">
            <router-link to="/" class="link_to_food"  v-for="(category,index) in categorys" :key="index">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url" alt="">
              </div>
              <span>{{category.title}}</span>
            </router-link>
          </div>
        </div>
         <!-- swiper轮播图圆点 -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    
    <ShopList/>

  </div>
</template>

<script type="text/ecmascript-6">
import {mapState} from 'vuex';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css'
import ShopList from '../../components/ShopList/ShopList'
export default {
  data() {
    return {
      baseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
 
  created() {
    this.$store.dispatch('getCategorys')
    this.$store.dispatch('getAddress')
  },
  computed: {
    ...mapState(['userInfo','categorys','address']),

    categorysArr() {
      const {categorys} = this
        // 准备空的二维数组
        const arr = []
        let minArr = []
        // 遍历categorys
        categorys.forEach(c => {
          if (minArr.length===8) {
            arr.push(minArr)
            minArr = []
          }
          minArr.push(c)
        })
        if (minArr) {
          arr.push(minArr)
        }
        return arr
      }
  },
  watch: {
    categorys (value) { // categorys数组中有数据了，在异步更新界面之前执行
        // 希望界面更新就立即创建swiper对象
        this.$nextTick(() => { // 一旦界面更新立即调用(要写在数据更新之后)
          // 创建一个swiper实例对象实现轮播
          new Swiper('.swiper-container',{
            loop: true, // 循环轮播
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination'
            }
          })
        })
      }
  },
  components: {
    HeaderTop,
    ShopList
  }
 
}
  

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
            top-border-1px(#e4e4e4)
            margin-top 10px
            background #fff
            .shop_header
              padding 10px 10px 0
              .shop_icon
                margin-left 5px
                color #999
              .shop_header_title
                color #999
                font-size 14px
                line-height 20px
</style>

