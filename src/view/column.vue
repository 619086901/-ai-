<template>
  <div class="index item">
    <div class="index_bg">
      <img src="../assets/answer/bg.jpg" alt="" />
    </div>
    <div class="area_bg">
      <div class="item" v-for="(item, i) in 3">
        <img :src="require(`../assets/column/area${i}_bg.png`)" alt="" />
      </div>
    </div>

    <div class="area_0">
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in 3"
          :key="i"
          :id="`area0_item_${i}`"
          :ref="`area0_item_${i}`"
          :data-area="0"
          :data-index="i"
          data-methods="onClick"
        >
          <div class="no_select">
            <img src="../assets/column/area0_0.png" alt="" />
          </div>
          <div class="select">
            <img src="../assets/column/area0_0_s.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryToJson } from '../tool/util.js'
import { debounce } from '../tool/index.js'
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
      URL: window.location.href
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
    getReturnurl(areaid, indexid) {
      return `${
        this.URL.split('?')[0]
      }?areaid=${areaid}&indexid=${indexid}&id=${
        this.id
      }&returnurl=${encodeURIComponent(this.returnurl)}`
    },
    async init() {
      this.analysisUrl()
    },
    async getData() {},
    async analysisUrl() {
      this.handleFocus()
    },
    handleClick(area, index) {
      switch (index) {
        case '0':
          this.$router.push({
            path: 'item.html',
            query: {
              id: this.id,
              returnurl: this.getReturnurl(area, index)
            }
          })
          break
        case '1':
          this.$router.push({
            path: 'answerpro.html',
            query: {
              assetId: this.id,
              returnurl: this.getReturnurl(area, index)
            }
          })

          break
        case '2':
          this.$router.push({
            path: 'answerall.html',
            query: {
              returnurl: this.getReturnurl(area, index)
            }
          })
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
    document.onkeydown = debounce((key) => {
      const code = key.keyCode
      if (code == 13) {
        key.preventDefault()
        const focus = document.querySelector('.focus')
        if (focus.dataset.methods !== false) {
          const { area, index } = focus.dataset
          switch (focus.dataset.methods) {
            case 'onClick':
              this.handleClick(area, index)
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
  },
  destroyed() {}
}
</script>
<style lang="scss" scoped>
.index {
  width: 1920px;
  .item {
    .no_select {
      display: block;
    }
    .select {
      display: none;
    }
  }
  .focus {
    .no_select {
      display: none;
    }
    .select {
      display: block;
    }
  }
  .index_bg {
    position: absolute;
  }
  .area_bg {
    position: absolute;
    left: 310px;
    top: 195px;
    .item {
      display: inline-block;
      margin: 0px 35px;
      position: relative;
    }
  }
  .area_0 {
    .area {
      width: 1500px;
      top: 750px;
      left: 326px;
      .item {
        display: inline-block;
        margin: 29px 52px;
        position: relative;
        img {
          width: 322px;
          height: 109px;
        }
      }
      .focus {
        animation: button 1s linear infinite;
      }
    }
  }
}
</style>
