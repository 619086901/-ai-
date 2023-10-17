<template>
  <div class="index" :style="{ top: `${containerTop}px` }">
    <div class="index_bg">
      <img src="../assets/index/bg.png" alt="" />
    </div>
    <div class="index_logo">
      <img src="../assets/index/logo.png" alt="" />
    </div>
    <div class="area_0">
      <div class="area0_bg">
        <img src="" alt="" />
      </div>
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in bodyPos[0].data"
          :key="i"
          :id="`area0_item_${i}`"
          :ref="`area0_item_${i}`"
          :data-area="0"
          :data-index="i"
          @right="i == 2 && stopFocus($event)"
          @left="i == 0 && stopFocus($event)"
          @up="area0Up"
          @onFocus="bodyTurn(0)"
          :data-tvlink="item.url"
        >
          <div class="pic">
            <img src="../assets/index/area0_logo.png" alt="" class="abs" />
            <img :src="item.files[0].url" alt="" :class="`area0_img`" />
          </div>
          <div class="select">
            <img src="../assets/index/area0_s.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="area_1">
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in bodyPos[1].data"
          :key="i"
          :id="`area1_item_${i}`"
          :ref="`area1_item_${i}`"
          :data-tvlink="item.url"
          :data-area="1"
          :data-index="i"
          @right="i == 4 && stopFocus($event)"
          @left="i == 0 && stopFocus($event)"
          @onFocus="bodyTurn(1)"
        >
          <div class="pic">
            <img :src="item.files[0].url" alt="" />
          </div>
          <div class="select">
            <img src="../assets/index/area1_s.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="area_2">
      <div class="area_2_title">
        <img src="../assets/index/area2_title.png" alt="" />
      </div>
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in bodyPos[2].data"
          :key="i"
          :id="`area2_item_${i}`"
          :ref="`area2_item_${i}`"
          :data-tvlink="item.url"
          :data-area="2"
          :data-index="i"
          @right="i == 3 && stopFocus($event)"
          @left="i == 0 && stopFocus($event)"
          @onFocus="bodyTurn(2)"
        >
          <div class="pic">
            <img :src="item.files[0].url" alt="" />
          </div>
          <div class="select">
            <img src="../assets/index/area2_s.png" alt="" />
          </div>
          <img src="../assets/index/vip.png" alt="" class="vip" />
        </div>
      </div>
    </div>

    <div class="area_3">
      <div class="area_3_title">
        <img src="../assets/index/area3_title.png" alt="" />
      </div>
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in bodyPos[3].data"
          :key="i"
          :id="`area3_item_${i}`"
          :ref="`area3_item_${i}`"
          :data-tvlink="item.url"
          :data-area="3"
          :data-index="i"
          @right="i == 3 && stopFocus($event)"
          @left="i == 0 && stopFocus($event)"
          @onFocus="bodyTurn(3)"
        >
          <div class="pic">
            <img :src="item.files[0].url" alt="" />
          </div>
          <div class="select">
            <img src="../assets/index/area2_s.png" alt="" />
          </div>
          <img src="../assets/index/vip.png" alt="" class="vip" />
        </div>
      </div>
    </div>
    <div class="area_4" v-show="!isUserLogin">
      <div class="area">
        <div
          class="item"
          v-focusable
          id="area4_item_0"
          ref="area4_item_0"
          :data-area="4"
          :data-index="0"
        >
          <div class="pic">
            <img src="../assets/index/area4_0.png" alt="" />
          </div>
          <div class="select" style="left: -2px; top: -5px">
            <img src="../assets/index/area4_0_s.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="area_5" v-show="isUserLogin">
      <div class="area_5_title">
        <img src="../assets/index/area5_bg.png" alt="" />
      </div>
      <div v-show="product.vipstatus == 1">
        <div class="area_5_nickname">{{ product.nickname }}</div>
        <div class="area_5_username">手机号：{{ product.userName }}</div>
        <div class="area_5_endtime">有效期至：{{ product.endtime }}</div>
        <div class="area_5_beans">
          <img src="../assets/index/area_5_beans.png" alt="" />
          <span class="beans_txt abs">当前学豆 :</span
          ><span class="yellow abs">{{ beans }}颗</span>
        </div>
      </div>
      <div v-show="product.vipstatus != 1">
        <div class="area_5_nickname">{{ product.nickname }}</div>
        <div class="area_5_txt">您暂未开通会员</div>
      </div>

      <div class="area">
        <div
          class="item"
          v-focusable
          id="area5_item_0"
          ref="area5_item_0"
          :data-area="5"
          :data-index="0"
          style="left: 10px"
        >
          <div class="no_select">
            <img src="../assets/index/area5_0.png" alt="" />
          </div>
          <div class="select">
            <img src="../assets/index/area5_0_s.png" alt="" />
          </div>
        </div>
        <div
          class="item"
          v-focusable
          id="area5_item_1"
          ref="area5_item_1"
          :data-area="5"
          :data-index="1"
          style="left: 120px"
        >
          <div class="no_select">
            <img src="../assets/index/area5_1.png" alt="" />
          </div>
          <div class="select">
            <img src="../assets/index/area5_1_s.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="area_6" v-show="isModal">
      <div class="area6_bg">
        <img src="../assets/index/area6_bg.png" alt="" />
      </div>
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in 2"
          :id="`area6_item_${i}`"
          :ref="`area6_item_${i}`"
          :data-area="6"
          :data-index="i"
          :style="{ left: `${360 * i + 180}px` }"
          @up="stopFocus($event)"
          @right="i == 1 && onArea6Right(i, $event)"
          @down="stopFocus($event)"
          @left="onArea6Left(i, $event)"
        >
          <div class="no_select">
            <img :src="require(`../assets/index/area6_${i}.png`)" alt="" />
          </div>
          <div class="select">
            <img :src="require(`../assets/index/area6_${i}_s.png`)" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryToJson, formatTime } from '../tool/util.js'

import {
  openPlugPlayerActivity,
  AndroidIsUserLogin,
  AndroidLogin,
  AndroidLogout,
  AndroidGetSn,
  AndroidGetmToken,
  AndroidGetmUid,
  AndroidDataSent,
  AndroidGetUserNickname,
  AndroidGetUserUserName,
  AndroidGetUserInfo
} from '../tool/android'
import { PlayDataSent, EnterOrderDataSent } from '../tool/dataSent.js'
import { appid, ordertype } from '../config/index.js'

import { getUserClientInfo } from '../api/userInfo.js'
import { log, debounce } from '../tool/index.js'

import { getVipStatus } from '../api/kangjia.js'
import { getRecommendsList } from '../api/recommend.js'

export default {
  data() {
    return {
      PRGINFO: [],
      containerTop: 0,
      areaid: !this.$route.query.areaid
        ? 0
        : parseInt(this.$route.query.areaid),
      indexid: !this.$route.query.indexid
        ? 0
        : parseInt(this.$route.query.indexid),
      returnurl: !this.$route.query.returnurl
        ? `${window.location.origin}/index.html`
        : this.$route.query.returnurl,
      URL: window.location.href,
      bodyPos: [
        {
          top: 0,
          data: [],
          id: 0,
          itemId: 'G1'
        },
        {
          top: 0,
          data: [],
          id: 1,
          itemId: 'G2'
        },
        {
          top: 700,
          data: [],
          id: 2,
          itemId: 'G3'
        },
        {
          top: 700,
          data: [],
          id: 3,
          itemId: 'G4'
        }
      ],
      process: {
        env: process.env
      },
      product: {
        vipstatus: 0, // 会员状态 1是 0否
        endtime: '',
        nickname: AndroidGetUserNickname(),
        userName: AndroidGetUserUserName()
      },
      beans: 0,
      playDataSent: new PlayDataSent(),
      enterOrderDataSent: new EnterOrderDataSent(),
      isUserLogin: AndroidIsUserLogin(),
      isPlay: !this.$route.query.assetId ? false : true,
      assetId: !this.$route.query.assetId
        ? 13
        : parseInt(this.$route.query.assetId),
      programName: !this.$route.query.programName
        ? '奇妙的数学第3课'
        : this.$route.query.programName,
      isModal: false,
      timer: null,
      proTimer: null
    }
  },
  methods: {
    setFocus(refName) {
      this.$tv.requestFocus(this.$refs[refName])
    },
    area0Up() {
      setTimeout(() => {
        this.$nextTick(() => {
          this.setFocus(`area${this.isUserLogin ? '5' : '4'}_item_0`)
        })
      }, 500)
    },
    resetData() {
      this.product = {
        vipstatus: 0, // 会员状态 1是 0否
        endtime: '',
        nickname: '',
        userName: ''
      }
      this.beans = 0
    },
    onArea6Right(index, event) {
      switch (index) {
        case 0:
          this.setFocus('area6_item_1')
          break
        case 1:
          this.stopFocus(event)
          break
        default:
          break
      }
    },
    onArea6Left(index, event) {
      switch (index) {
        case 0:
          this.stopFocus(event)
          break
        case 1:
          this.setFocus('area6_item_0')
          break
        default:
          break
      }
    },
    onFocusArea6() {
      this.isModal = true
      this.setFocus('area6_item_1')
    },
    onCancelFocusArea6() {
      this.isModal = false
      this.setFocus('area5_item_1')
    },
    // 停止移动
    stopFocus(event) {
      this.$tv.requestFocus(event.target)
    },
    // 跳转订购页
    gotoOrder(params, returnurl) {
      this.enterOrderDataSent = new EnterOrderDataSent(params)
      AndroidDataSent('yixue60_vip_page_click', this.enterOrderDataSent)
      this.$router.push({
        path: 'order.html',
        query: {
          video_id: this.enterOrderDataSent.getVideoId(),
          video_name: this.enterOrderDataSent.getVideoName(),
          returnurl: returnurl
        }
      })
    },
    // 区域移动
    bodyTurn(areaid) {
      const dataItem = this.bodyPos.find((item) => item.id == areaid)
      this.containerTop = -1 * dataItem.top
    },
    getReturnurl(areaid, indexid) {
      return `${
        this.URL.split('?')[0]
      }?areaid=${areaid}&indexid=${indexid}&returnurl=${encodeURIComponent(
        this.returnurl
      )}`
    },
    // 定位焦点
    handleFocus() {
      this.$nextTick(() => {
        this.setFocus(`area${this.areaid}_item_${this.indexid}`)
      })
    },
    init() {
      this.analysisUrl()
    },
    handleTimer() {
      this.timer = setInterval(() => {
        this.handleIsUserLogin()
        if (this.isUserLogin) {
          AndroidGetUserInfo()
          this.clearInterval(this.timer)
          this.proTimer = setInterval(() => {
            if (!this.product.nickname) {
              this.product.nickname = AndroidGetUserNickname()
              this.product.userName = AndroidGetUserUserName()
              this.clearInterval(this.proTimer)
            }
          }, 1000)
        }
      }, 1000)
    },
    clearInterval(timer) {
      clearInterval(timer)
      timer = null
    },
    async fetchData() {
      const { data } = await getRecommendsList()
      data.forEach((item) => {
        this.bodyPos.forEach((x) => {
          if (item.name == x.itemId) x.data.push(item)
        })
      })
    },
    // 渲染vip用户的状态
    async handleVipStatus() {
      const { data } = await getVipStatus({
        appid: appid,
        hid: AndroidGetSn(),
        uid: AndroidGetmUid(),
        ordertype: ordertype,
        token: AndroidGetmToken()
      })
      this.product.vipstatus = data?.vipstatus ?? 0
      this.product.endtime = data?.endtime?.split(' ')?.[0] ?? ''
    },
    async handleBeansData() {
      const { data } = await getUserClientInfo()
      this.beans = data?.total_score || 0
    },
    // 处理用户登录
    handleIsUserLogin() {
      this.isUserLogin = AndroidIsUserLogin()
    },
    // 是否直接开始播放
    handleIsPlay() {
      if (this.isPlay) {
        openPlugPlayerActivity({
          code: 200,
          message: 'success',
          data: {
            assetId: this.assetId,
            programName: this.programName
          }
        })
      }
    },
    async analysisUrl() {
      this.handleIsPlay()
      await this.fetchData()
      this.handleTimer()
      this.handleFocus()
    },
    handleUserLogin() {
      this.handleIsUserLogin()
      if (this.isUserLogin) {
        this.product.nickname = AndroidGetUserNickname()
        this.product.userName = AndroidGetUserUserName()
        this.handleVipStatus()
        this.handleBeansData()
        const focus = document.querySelector('.focus')
        let { area } = focus.dataset
        if (area == '4' || area == '5') this.area0Up()
      }
    },
    handleArea0(tvlink, area, index) {
      const and = tvlink?.indexOf('?') < 0 ? '?' : '&'
      window.location.href = `${tvlink}${and}returnurl=${encodeURIComponent(
        this.getReturnurl(area, index)
      )}`
    },
    handleArea1(tvlink, area, index) {
      this.$router.push({
        path: tvlink,
        query: {
          returnurl: this.getReturnurl(area, index)
        }
      })
    },
    handleArea2And3(tvlink, area, index) {
      const item = this.bodyPos[area].data[index]
      if (index == 3) {
        this.$router.push({
          path: tvlink,
          query: {
            returnurl: this.getReturnurl(area, index)
          }
        })
        return
      }
      // if (!AndroidIsUserLogin()) {
      //   AndroidLogin()
      //   return
      // }
      // await this.handleVipStatus()
      // if (this.product.vipstatus == 0) {
      //   this.gotoOrder(
      //     {
      //       time: formatTime(new Date().getTime()),
      //       video_id: `pxwh_${item.url}`,
      //       video_name: item.type
      //     },
      //     encodeURIComponent(this.getReturnurl(area, index))
      //   )
      //   return
      // }
      this.playDataSent = new PlayDataSent({
        start_time: formatTime(new Date().getTime()),
        video_id: `pxwh_${item.url}`,
        video_name: item.type,
        is_vip: '{1}'
      })
      openPlugPlayerActivity({
        code: 200,
        message: 'success',
        data: {
          assetId: item.url,
          programName: item.type
        }
      })
    },
    handleArea4(index) {
      switch (index) {
        // 登录按钮
        case '0':
          AndroidLogin()
          break
        default:
          break
      }
    },
    handleArea5(index) {
      switch (index) {
        // 开通VIP
        case '0':
          this.gotoOrder(
            {
              time: formatTime(new Date().getTime()),
              is_vip: this.product.vipstatus == 1 ? '{1}' : '{}'
            },
            this.getReturnurl(area, index)
          )
          break
        // 退出登录
        case '1':
          this.onFocusArea6()
          break
        default:
          break
      }
    },
    handleArea6(index) {
      switch (index) {
        // 退出登录二次弹窗-确认
        case '0':
          AndroidLogout()
          break
        // 退出登录二次弹窗-取消
        case '1':
          this.onCancelFocusArea6()
          break
        default:
          break
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    document.onkeydown = debounce(async (key) => {
      const code = key.keyCode
      if (code == 13) {
        key.preventDefault()
        const focus = document.querySelector('.focus')
        let { tvlink, area, index } = focus.dataset
        switch (area) {
          case '0':
            this.handleArea0(tvlink, area, index)
            break
          case '1':
            this.handleArea1(tvlink, area, index)
            break
          case '2':
          case '3':
            this.handleArea2And3(tvlink, area, index)
            break
          case '4':
            this.handleArea4(index)
            break
          case '5':
            this.handleArea5(index)
            break
          case '6':
            this.handleArea6(index)
            break
          default:
            break
        }
      } else if (code == 32) {
        window.onAndroidKeyBack()
      }
    })
    // 返回
    window.onAndroidKeyBack = () => {
      const focus = document.querySelector('.focus')
      let { area } = focus.dataset
      if (area == '6') return this.onCancelFocusArea6()
      if (area != '0') return this.setFocus('area0_item_0')
      return 'finish'
    }
    window.onAndroidMediaPlayerQuit = () => {
      this.playDataSent.setEndTime(formatTime(new Date().getTime()))
      AndroidDataSent('yixue60_play', this.playDataSent)
    }
    window.onAndroidLogout = () => {
      this.$Message({
        type: 'success',
        message: '退出登录'
      })
      this.handleIsUserLogin()
      this.isModal = false
      this.area0Up()
      this.handleTimer()
      this.resetData()
    }
    window.onAndroidLogin = () => {
      this.handleUserLogin()
      this.clearInterval(this.timer)
    }
  },
  destroyed() {
    this.clearInterval(this.timer)
    this.clearInterval(this.proTimer)
  }
}
</script>

<style lang="scss" scoped>
.index {
  width: 1920px;
  background: #244e47;
  position: absolute;
  .item {
    .select {
      position: absolute;
      display: none;
    }
  }
  .focus {
    .select {
      display: block;
      position: absolute;
    }
  }
  .index_bg {
    position: absolute;
    z-index: 0;
  }
  .index_logo {
    position: absolute;
    left: 90px;
    top: 60px;
  }

  .area_0 {
    height: 755px;
    .area0_bg {
    }
    .area {
      width: 4000px;
      top: 420px;
      left: 75px;
      .focus {
        .select {
          top: 19px;
          left: 30px;
          z-index: -1;
        }
      }
      .item {
        display: inline-block;
        margin: 0px 5px;
        position: relative;
        .pic {
          .abs {
            top: 0px;
            left: 20px;
          }
          .area0_img {
            width: 582px;
            height: 283px;
          }
        }
      }
    }
  }
  .area_1 {
    height: 258px;
    .area {
      left: 80px;
      width: 3000px;
      .focus {
        .select {
          top: -1px;
          left: -8px;
          z-index: -1;
        }
      }

      .item {
        display: inline-block;
        margin: 15px 25px;
        position: relative;
        .pic {
          img {
            width: 303px;
            height: 159px;
          }
        }
      }
    }
  }

  .area_2 {
    height: 400px;
    .area_2_title {
      position: relative;
      top: -32px;
      left: 100px;
      font-weight: bold;
      font-size: 45px;
      color: #eff7ef;
      letter-spacing: 6px;
    }
    .area {
      left: 80px;
      width: 2000px;
      .focus {
        .select {
          top: -12px;
          left: -11px;
          z-index: -1;
        }
      }
      .item {
        display: inline-block;
        margin: 19px 20px;
        position: relative;
        .pic {
          img {
            width: 398px;
            height: 248px;
          }
        }
      }
      .vip {
        position: absolute;
        left: 296px;
        top: -36px;
        z-index: 5;
        display: none;
      }
    }
  }

  .area_3 {
    height: 500px;
    .area_3_title {
      position: relative;
      top: -35px;
      left: 100px;
      font-weight: bold;
      font-size: 45px;
      color: #eff7ef;
      letter-spacing: 6px;
    }
    .area {
      left: 80px;
      width: 2000px;
      .focus {
        .select {
          top: -12px;
          left: -11px;
          z-index: -1;
        }
      }
      .item {
        display: inline-block;
        margin: 19px 20px;
        position: relative;
        .pic {
          img {
            width: 398px;
            height: 248px;
          }
        }
      }
      .vip {
        position: absolute;
        left: 296px;
        top: -36px;
        z-index: 5;
        display: none;
      }
    }
  }

  .area_4 {
    position: absolute;
    top: 65px;
    left: 1555px;
    .no_select {
      display: block;
    }
    .focus {
      .no_select {
        display: none;
      }
    }
  }
  .area_5 {
    position: absolute;
    top: 15px;
    left: 1530px;
    .area_5_title {
      position: relative;
    }
    .area_5_nickname {
      position: absolute;
      top: 38px;
      left: 47px;
      width: 210px;
      text-align: center;
      overflow: hidden;
      font-weight: bold;
    }
    .area_5_username {
      position: absolute;
      top: 110px;
      left: 50px;
      color: #923c09;
      font-weight: bold;
      font-size: 20px;
    }
    .area_5_endtime {
      position: absolute;
      top: 140px;
      left: 50px;
      color: #923c09;
      font-weight: bold;
      font-size: 20px;
    }
    .area_5_beans {
      position: absolute;
      top: 170px;
      left: 50px;
      color: #923c09;
      font-size: 17px;
      .beans_txt {
        left: 55px;
        top: 7px;
        color: white;
      }
      .yellow {
        color: yellow;
        left: 137px;
        top: 7px;
      }
    }
    .area_5_txt {
      color: #923c09;
      font-size: 30px;
      position: absolute;
      top: 140px;
      left: 50px;
      font-weight: bold;
    }

    .area {
      top: -103px;
      left: 40px;
      .item {
        position: absolute;
      }
    }
    .no_select {
      display: block;
      position: relative;
    }
    .focus {
      .no_select {
        display: none;
        position: relative;
      }
      .select {
        position: relative;
      }
    }
  }

  .area_6 {
    position: absolute;
    top: 205px;
    left: 500px;
    z-index: 999;
    .area {
      top: -200px;
      .no_select {
        display: block;
        position: relative;
      }
      .focus {
        .no_select {
          display: none;
          position: relative;
        }
        .select {
          position: relative;
        }
      }
    }
  }
}
</style>
