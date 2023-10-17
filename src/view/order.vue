<template>
  <div>
    <img :src="bgImage" alt="" ref="useRef" />
    <qrcode-vue
      class="qrcode"
      :value="value"
      :size="300"
      level="H"
      v-show="value"
    />
    <div class="success" v-show="bSuccess">
      <img src="../assets/index/success_img.jpg" alt="" class="success_img" />
      <div class="success_txt">支付成功</div>
    </div>
  </div>
</template>

<script>
import { log, debounce } from '../tool/index'
import { queryToJson, formatTime } from '../tool/util.js'
import { goToOrder } from '../tool/cashier.js'
import {
  AndroidIsUserLogin,
  AndroidGetSn,
  AndroidGetmToken,
  AndroidGetmUid,
  AndroidGetUserUserName,
  AndroidGetAccessToken,
  AndroidGetTimestamp,
  AndroidGetSign,
  AndroidGetUserOpenId,
  AndroidGetUserAvatar,
  AndroidGetUserNickname,
  AndroidGetAppKey,
  AndroidDataSent
} from '../tool/android'
import { BuySuccessDataSent } from '../tool/dataSent.js'
import { appid } from '../config/index.js'

import { updateGetGoodsId, getRollingPayStatus } from '../api/kangjia.js'

import { getShortChain } from '../api/column.js'

import QrcodeVue from 'qrcode.vue'
export default {
  data() {
    return {
      goods_id: '', // 商品id，需要从易学运营后台接口获取
      bgImage: '',
      // 'http://test.kkapp.com/kkupload/92/925000/F925000/220506151842O2zT.jpeg',
      returnurl: `${window.location.origin}/index.html`,
      URL: window.location.href,
      query: this.$route.query,
      timer: null, // 轮询
      time: 1000, // 轮询时间
      bSuccess: false, // 显示支付成功提示
      video_id: '',
      video_name: '',
      album_id: '',
      album_name: '',
      is_vip: '{}',
      buySuccessDataSent: new BuySuccessDataSent(),
      value: ''
    }
  },
  components: {
    QrcodeVue
  },
  methods: {
    init() {
      this.analysisUrl()
      this.timer = setInterval(() => {
        this.handleRollingPayStatus()
      }, this.time)
    },
    async handleRollingPayStatus() {
      const { data } = await getRollingPayStatus({
        uid: AndroidGetmUid()
      })
      data?.data && this.handleSuccess()
    },
    // 订购成功后一秒返回
    handleSuccess() {
      // 显示"订购成功"
      this.bSuccess = true
      this.buySuccessDataSent = new BuySuccessDataSent({
        time: formatTime(new Date().getTime()),
        video_id: this.video_id,
        video_name: this.video_name,
        album_id: this.album_id,
        album_name: this.album_name,
        is_vip: this.is_vip
      })
      AndroidDataSent(
        'yixue60_vip_page_purchase_success',
        this.buySuccessDataSent
      )
      clearInterval(this.timer)
      this.timer = null
      setTimeout(() => {
        window.onAndroidKeyBack()
      }, 1000)
    },
    analysisUrl() {
      this.video_id = !this.query.video_id ? '' : this.query.video_id
      this.video_name = !this.query.video_name ? '' : this.query.video_name
      this.album_id = !this.query.album_id ? '' : this.query.album_id
      this.album_name = !this.query.album_name ? '' : this.query.album_name
      this.is_vip = !this.query.is_vip ? '{}' : this.query.is_vip
      this.returnurl = !this.query.returnurl
        ? `${window.location.origin}/index.html`
        : this.query.returnurl
    },
    async handleUpdateGetGoodsId() {
      const { data } = await updateGetGoodsId(
        {
          billingType: '9243', // 测试服：4196 正式服：9243
          sn: AndroidGetSn()
        },
        {
          accessToken: AndroidGetAccessToken(),
          timestamp: AndroidGetTimestamp(),
          appKey: AndroidGetAppKey(),
          sign: AndroidGetSign()
        }
      )
      if (data.code == 0) {
        this.goods_id = data.data?.goodsid
        this.bgImage = data.data?.bgImage
      }
      this.creatQrCode()
    },
    async creatQrCode() {
      if (!this.goods_id)
        return this.$Message({
          type: 'error',
          message: '商品id为空'
        })
      const { code, data } = await getShortChain({
        url: AndroidIsUserLogin()
          ? goToOrder(
              this.goods_id,
              appid,
              AndroidGetSn(),
              encodeURIComponent('成长'),
              '1',
              '0',
              AndroidGetUserOpenId(),
              AndroidGetmUid(),
              AndroidGetUserUserName(),
              AndroidGetUserAvatar(),
              AndroidGetUserNickname(),
              AndroidGetmToken()
            )
          : goToOrder(
              this.goods_id,
              appid,
              AndroidGetSn(),
              encodeURIComponent('成长'),
              '1',
              '0'
            )
      })
      if (code == 200) {
        this.value = data?.url || ''
      } else {
        return this.$Message({
          type: 'error',
          message: '二维码获取失败,请稍后重试'
        })
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.handleUpdateGetGoodsId()
    document.onkeydown = debounce((key) => {
      const code = key.keyCode
      if (code == 13) {
        key.preventDefault()
      } else if (code == 32) {
        window.onAndroidKeyBack()
      }
    })
    // 返回
    window.onAndroidKeyBack = () => {
      const url = new URL(this.returnurl)
      const params = queryToJson(this.returnurl)
      this.$router.push({
        path: url.pathname,
        query: params
      })
    }
  },
  destroyed() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.qrcode {
  position: absolute;
  right: 150px;
  bottom: 100px;
  z-index: 999;
  border: 15px solid white;
}
.success {
  position: absolute;
  z-index: 9999;
  top: 0;
  left: 0;

  .success_txt {
    position: absolute;
    top: 400px;
    left: 775px;
    font-weight: bold;
    letter-spacing: 20px;
    font-size: 80px;
  }
}
</style>
