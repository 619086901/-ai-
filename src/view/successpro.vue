<template>
  <div class="index item">
    <div class="index_bg">
      <img src="../assets/successpro/bg.png" alt="" />
    </div>
    <div class="area_bg">
      <img src="../assets/successpro/area0_bg.png" alt="" />
    </div>

    <div class="sum">{{ sum }}</div>

    <div class="area_0">
      <div class="area">
        <div
          class="item"
          v-focusable
          v-for="(item, i) in 1"
          :key="i"
          :id="`area0_item_${i}`"
          :ref="`area0_item_${i}`"
          :data-area="0"
          :data-index="i"
          data-methods="onClick"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { log, debounce } from '../tool/index.js'
import { queryToJson } from '../tool/util.js'

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
      sum: !this.$route.query.sum ? 0 : parseInt(this.$route.query.sum),
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
    async init() {
      this.analysisUrl()
    },
    async analysisUrl() {
      this.handleFocus()
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
        let { area, index } = focus.dataset
        if (!focus.dataset.methods === false) {
          switch (focus.dataset.methods) {
            case 'onClick':
              console.log(area, index)
              window.onAndroidKeyBack()
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
    left: 660px;
    top: 85px;
  }
  .sum {
    position: absolute;
    left: 945px;
    top: 489px;
    color: #ff4847;
    font-size: 63px;
    width: 81px;
    text-align: center;
  }

  .area_0 {
    .area {
      top: 790px;
      left: 785px;
    }
  }
}
</style>
