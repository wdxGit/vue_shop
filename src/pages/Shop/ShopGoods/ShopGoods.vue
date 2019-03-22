<template>
  <div class="goods">
    <div class="menu-wrapper">
      <!-- 菜单对应的是食物分类列表-->
      <ul>
        <!--当前分类class添加current-->
        <li 
          class="menu-item" 
          ref="menuList" 
          v-for="(good,index) in goods" 
          :key="index" 
          :class="{current: index===currentIndex}" 
          @click="clickList(index)">
          <span class="text bottom-border-1px">
            <img class="icon" :src="good.icon" v-if="good.icon">
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>

    <div class="foods-wrapper">
      <!-- 右侧的食物列表是根据左侧的分类列表展现的-->
      <!-- 所以右侧是在一个分类标题列表里面嵌套着各类食物列表-->
      <ul ref="foodsUl">
        <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <!-- <CartControl :food=food /> -->
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import BScroll from 'better-scroll'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      scrollY: 0,//右侧滑动的Y轴坐标(实时变化)
      rightLiTops: [], // 所有右侧分类li的top组成的数组(列表第一次显示就不再变化)
    }
  },
  mounted() {
    this.$store.dispatch('getShopGoods')
  },
  computed: {
    ...mapState(['goods']),
    currentIndex(index) {
      const {scrollY,rightLiTops} = this;
      return rightLiTops.findIndex((tops,index )=>{
        this._initLeftScroll(index);
        return scrollY >= tops && scrollY < rightLiTops[index + 1]
      })
    }
  },
  watch:{
    goods(){
      //监听数据
      this.$nextTick(() =>{
        //左右两边滚动
        this. _initBScroll();
        //右边列表高度
        this._initRightHeight()
      })
    }
  },
  methods:{
    _initBScroll() {
      //左边滚动
      this.leftBscroll = new BScroll('.menu-wrapper',{
        click: true
      });
      //右边滚动
      this.rightBscroll = new BScroll('.foods-wrapper',{
        click: true,
        probeType:3
      });
      //监听右边滚动事件
      this.rightBscroll.on('scroll',(pos) => {
        this.scrollY = Math.abs(pos.y);
        // console.log(this.scrollY)
      })
    },
    
    //求出右边列表的高度
    _initRightHeight(){
      let itemArray=[]; //定义一个伪数组
      let top = 0;
      itemArray.push(top)
      //获取右边所有li的礼
      let allList = this.$refs.foodsUl.children;
      //allList伪数组转化成真数组
      Array.prototype.slice.call(allList).forEach(li => {
        top += li.clientHeight; //获取所有li的每一个高度
        itemArray.push(top)
      });
      this.rightLiTops = itemArray;
      // console.log(this.rightLiTops)
    },
    //点击左边实现滚动
    clickList(index){
        this.scrollY = this.rightLiTops[index];
        //console.log(this.scrollY)
        this.rightBscroll.scrollTo(0,-this.scrollY,200)
    },
    //左右联调 
    _initLeftScroll(index){
      let menu = this.$refs.menuList;
      let el = menu[index];
      this.leftBscroll.scrollToElement(el,300,0,-300)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
          .text:last-child
            border-bottom none 
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>

