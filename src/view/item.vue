<template>
  <div class="index item">
    <div class="item_bg">
      <img :src="require(`../assets/item/bg_${id}.png`)" alt="" />
    </div>
    <div class="area_0">
      <div class="area" :style="{ top: `${containerTop}px` }">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in data"
          :key="i"
          :id="`area0_item_${i}`"
          :ref="`area0_item_${i}`"
          :data-area="0"
          :data-index="i"
          data-methods="onClick"
          @onFocus="bodyTurn(i, item)"
          @onBlur="
            textFocus(false, `${getItemFind(item).name}系列第${i + 1}课`, i)
          "
        >
          <div class="border">
            <img src="../assets/item/border.png" alt="" />
          </div>
          <div class="pic">
            <img :src="item.files[0].url" alt="" />
          </div>
          <div class="select">
            <img src="../assets/t.gif" alt="" />
          </div>
          <img
            src="../assets/item/lock.png"
            alt=""
            class="lock"
            v-show="item.is_vip == 1"
          />
          <div class="txt" :id="`area0_txt_${i}`">
            {{
              setTxt(
                `${getItemFind(item).name}系列第${i + 1}课`,
                area0TxtLength
              )
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryToJson, formatTime } from '../tool/util.js'
import { log, setTxt, debounce } from '../tool/index'
import {
  openPlugPlayerActivity,
  AndroidIsUserLogin,
  AndroidLogin,
  AndroidGetSn,
  AndroidGetmToken,
  AndroidGetmUid,
  AndroidDataSent
} from '../tool/android'
import { PlayDataSent, EnterOrderDataSent } from '../tool/dataSent.js'
import { appid, ordertype } from '../config/index.js'

import { getCategoriesIdPrograms } from '../api/column.js'
import { getVipStatus } from '../api/kangjia.js'

export default {
  data() {
    return {
      areaid: !this.$route.query.areaid
        ? 0
        : parseInt(this.$route.query.areaid),
      indexid: !this.$route.query.indexid
        ? 0
        : parseInt(this.$route.query.indexid),
      returnurl: !this.$route.query.returnurl
        ? `${window.location.origin}/index.html`
        : this.$route.query.returnurl,
      id: !this.$route.query.id ? 0 : parseInt(this.$route.query.id),
      URL: window.location.href,
      containerTop: 635,
      data: [],
      setTxt,
      area0TxtLength: 12,
      freeNum: 1, // 免费集数
      vipstatus: 0, // 会员状态 1是 0否
      playDataSent: new PlayDataSent(),
      enterOrderDataSent: new EnterOrderDataSent()
    }
  },
  methods: {
    // 定位焦点
    handleFocus() {
      this.$nextTick(() => {
        this.$tv.requestFocus(
          this.$refs[`area${this.areaid}_item_${this.indexid}`]
        )
      })
    },
    getItemFind(item) {
      return item.categories.find((item) => item.id == this.id)
    },
    // 字体省略
    textFocus(flag, name, index) {
      const txtDom = document.getElementById(`area0_txt_${index}`)
      if (txtDom)
        switch (flag) {
          case true:
            if (name.length > this.area0TxtLength)
              txtDom.innerHTML = `<marquee direction='left' scrolldelay='100'>${name}</marquee>`
            break
          case false:
            txtDom.innerHTML = this.setTxt(name, this.area0TxtLength)
            break
          default:
            break
        }
    },
    getReturnurl(areaid, indexid) {
      return `${
        this.URL.split('?')[0]
      }?areaid=${areaid}&indexid=${indexid}&id=${
        this.id
      }&returnurl=${encodeURIComponent(this.returnurl)}`
    },
    gotoOrder(params, returnurl) {
      this.enterOrderDataSent = new EnterOrderDataSent(params)
      AndroidDataSent('yixue60_vip_page_click', this.enterOrderDataSent)
      this.$router.push({
        path: 'order.html',
        query: {
          video_id: this.enterOrderDataSent.getVideoId(),
          video_name: this.enterOrderDataSent.getVideoName(),
          album_id: this.enterOrderDataSent.getAlbumId(),
          album_name: this.enterOrderDataSent.getAlbumName(),
          returnurl: returnurl
        }
      })
    },
    // 区域移动
    bodyTurn(index, item) {
      this.textFocus(
        true,
        `${this.getItemFind(item).name}系列第${index + 1}课`,
        index
      )
      this.containerTop = 635 - Math.floor(index / 4) * 292
    },
    init() {
      this.analysisUrl()
    },
    async getData() {
      const { data } = await getCategoriesIdPrograms(this.id, {
        page: 1,
        pageSize: 999
      })
      data.length == 0 &&
        this.$Message({
          type: 'error',
          message: '无节目'
        })
      this.data = data
    },
    async analysisUrl() {
      await this.getData()
      this.handleFocus()
    },
    async handleVipStatus() {
      const { data } = await getVipStatus({
        appid: appid,
        hid: AndroidGetSn(),
        uid: AndroidGetmUid(),
        ordertype: ordertype,
        token: AndroidGetmToken()
      })
      this.vipstatus = data?.vipstatus ?? 0
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
        let { area, index } = focus.dataset
        if (!focus.dataset.methods === false) {
          switch (focus.dataset.methods) {
            case 'onClick':
              // 可能这个节目属于多个专辑 所以要先搜索
              const item = this.data[index].categories.find(
                (item) => item.id == this.id
              )
              // console.log(this.data[index].id)
              this.playDataSent = new PlayDataSent({
                start_time: formatTime(new Date().getTime()),
                video_id: `pxwh_${this.data[index].id}`,
                video_name: this.data[index].name,
                album_id: `pxwh_${item.id}`,
                album_name: item.name
              })
              // 播放付费节目前先登录
              if (this.data[index].is_vip == 1) {
                console.log(this.data[index])
                if (!AndroidIsUserLogin()) {
                  AndroidLogin()
                  return
                }
                await this.handleVipStatus()
                if (this.vipstatus == 0) {
                  this.gotoOrder(
                    {
                      time: formatTime(new Date().getTime()),
                      video_id: `pxwh_${this.data[index].id}`,
                      video_name: this.data[index].name,
                      album_id: `pxwh_${item.id}`,
                      album_name: item.name
                    },
                    this.getReturnurl(area, index)
                  )
                  return
                }
                this.playDataSent.setIsVip('{1}')
              }
              console.log('免费')
              openPlugPlayerActivity({
                code: 200,
                message: 'success',
                data: {
                  assetId: this.data[index].id,
                  programName: `${item.name}系列第${parseInt(index) + 1}课`
                }
              })
              break

            default:
              break
          }
        }
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
    window.onAndroidMediaPlayerQuit = () => {
      this.playDataSent.setEndTime(formatTime(new Date().getTime()))
      AndroidDataSent('yixue60_play', this.playDataSent)
    }
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.index {
  width: 1920px;
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
      border: 6px solid white;
      width: 352px;
      height: 240px;
      top: -5px;
      left: -5px;
      border-radius: 18px;
    }
  }
  .item_bg {
    position: absolute;
    z-index: 0;
  }
  .area_0 {
    .area {
      width: 1900px;
      top: 635px;
      left: 100px;
      position: absolute;
      .item {
        display: inline-block;
        margin: 23px 38px;
        position: relative;
        .border {
          img {
            width: 355px;
            height: 242px;
            border-radius: 15px;
          }
        }
        .pic {
          img {
            width: 338px;
            height: 174px;
            border-radius: 5px;
            position: absolute;
            top: 58px;
            left: 9px;
          }
        }
        .lock {
          position: absolute;
          left: 311px;
          top: -12px;
          // display: none;
        }
        .txt {
          position: absolute;
          top: 20px;
          left: 13px;
          right: 13px;
          color: #8c5d29;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
