<template>
  <div class="index item">
    <div class="index_bg">
      <img src="../assets/answer/bg.jpg" alt="" />
    </div>
    <div class="area_bg" v-show="!show">
      <img src="../assets/success/area_bg.png" alt="" />
    </div>

    <div class="area_bg_no" v-show="show">
      <img src="../assets/success/area_bg_no.png" alt="" />
    </div>

    <div class="sum" v-show="!show">{{ sum }}</div>
    <div class="success">
      <template v-for="(item, i) in data">
        <div
          class="item hide"
          :ref="`success${i}`"
          :style="{
            top: 130 * i + 'px'
          }"
        >
          <img src="../assets/success/dui.png" alt="" />
        </div>
      </template>
    </div>
    <div class="error">
      <template v-for="(item, i) in data">
        <div
          class="item hide"
          :ref="`error${i}`"
          :style="{
            top: 130 * i + 'px'
          }"
        >
          <img src="../assets/success/cuo.png" alt="" />
        </div>
      </template>
    </div>

    <div class="title">
      <div class="item_title" v-for="(item, i) in data">
        {{ setTxt(item.title.replace(/[小朋友们，现在宝贝呀？！]?/g, ''), 14) }}
        :
        {{ item.answers.find((item) => item.is_right == 1).content }}
      </div>
    </div>

    <div class="area">
      <div
        class="item"
        v-focusable
        :id="`area0_item_0`"
        :ref="`area0_item_0`"
        :data-area="0"
        :data-index="0"
        data-methods="onClick"
      >
        <div class="no_select">
          <img src="../assets/success/area0_0.png" alt="" />
        </div>
        <div class="select">
          <img src="../assets/success/area0_0_s.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setTxt, log, debounce } from '../tool/index.js'
import { getProgramsIdQuestions } from '../api/problem.js'
import {
  AndroidLocal,
  AndroidClearLocal,
  handleAndroidvBack
} from '../tool/android.js'

export default {
  data() {
    return {
      returnurl: !this.$route.query.returnurl
        ? `${window.location.origin}/index.html`
        : this.$route.query.returnurl,
      sum: !this.$route.query.sum ? 0 : parseInt(this.$route.query.sum),
      URL: window.location.href,
      // 资产id
      assetId: 10,
      data: [],
      setTxt,
      show: false
    }
  },
  methods: {
    // 定位焦点
    handleFocus() {
      this.$nextTick(() => {
        this.$tv.requestFocus(this.$refs[`area0_item_0`])
      })
    },
    async init() {
      this.analysisUrl()
    },
    async getData() {
      const { data } = await getProgramsIdQuestions(this.assetId)
      this.data = data
      return data
    },
    async analysisUrl() {
      const assetId = AndroidLocal(`assetId`)
      this.assetId = assetId
      if (!this.assetId) {
        this.show = true
        this.handleFocus()
        return
      }
      await this.getData()
      for (let i = 0; i < this.data.length; i++) {
        const item = AndroidLocal(`subject${i}`)
        if (item == '1') {
          this.$refs[`success${i}`][0].className = 'item'
          this.sum += 3
        } else {
          this.$refs[`error${i}`][0].className = 'item'
        }
      }
      this.handleFocus()
    },
    clearLocal() {
      for (let i = 0; i < this.data.length; i++) {
        AndroidClearLocal(`subject${i}`)
        AndroidClearLocal(`assetId`)
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
        let { area, index } = focus.dataset
        if (!focus.dataset.methods === false) {
          switch (focus.dataset.methods) {
            case 'onClick':
              this.clearLocal()
              handleAndroidvBack()
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
      this.clearLocal()
      return 'finish'
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
    left: 332px;
    top: 180px;
  }

  .area_bg_no {
    position: absolute;
    z-index: 999;
    left: 680px;
    top: 110px;
  }

  .sum {
    position: absolute;
    left: 1191px;
    top: 441px;
    color: #ff4847;
    font-size: 61px;
    width: 81px;
    text-align: center;
  }
  .success {
    position: absolute;
    left: 460px;
    top: 348px;
    .hide {
      display: none;
    }
    .item {
      position: absolute;
    }
  }
  .error {
    position: absolute;
    left: 460px;
    top: 348px;
    .hide {
      display: none;
    }
    .item {
      position: absolute;
    }
  }

  .title {
    left: 461px;
    position: relative;
    top: 307px;
    width: 1000px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .item_title {
      margin-top: 110px;
      color: black;
    }
  }

  .area {
    position: absolute;
    top: 790px;
    left: 785px;
    .item {
      display: inline-block;
      margin: 29px 52px;
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
</style>
