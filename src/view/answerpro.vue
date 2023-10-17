<template>
  <div class="answer">
    <div class="answer_bg">
      <img src="../assets/answer/bgpro.png" alt="" />
    </div>

    <div class="answer_title">
      <img src="../assets/answer/img5.png" alt="" class="answer_title_bg" />
      <img
        src="../assets/answer/icon1.png"
        alt=""
        class="answer_title_horn trembling"
      />
      <div class="answer_title_txt">
        <template v-if="data[scroll.index - 1]">
          <div>{{ data[scroll.index - 1].title || '' }}</div>
        </template>
      </div>
    </div>

    <div :class="answer_error.modal">
      <div class="answer_error" :class="answer_error.class">
        <img src="../assets/answer/img6.png" alt="" />
      </div>
    </div>

    <div :class="answer_success.modal">
      <div class="answer_success" :class="answer_success.class">
        <img src="../assets/answer/img4.png" alt="" />
        <div class="answer_success_score" :class="answer_success.score.class">
          <img src="../assets/answer/img3.png" alt="" />
          <span>{{ answer_success.score.score }}</span>
        </div>

        <div class="answer_success_money">
          <div
            v-for="(item, i) in 3"
            class="float item"
            :class="answer_success.money[`icon${i + 1}`].class"
          >
            <img src="../assets/answer/icon2.png" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="answer_img">
      <template v-if="data[scroll.index - 1]">
        <img :src="data[scroll.index - 1].img" alt="" />
      </template>
    </div>
    <div
      class="item"
      v-focusable
      id="area1_item_0"
      ref="area1_item_0"
      :data-area="1"
      :data-index="0"
      style="left: 0; top: 0"
      @up="onStopMove($event)"
      @down="onStopMove($event)"
      @left="onStopMove($event)"
      @right="onStopMove($event)"
    ></div>
    <div class="area_0">
      <div class="area">
        <template v-if="data[scroll.index - 1]">
          <div
            class="item"
            :class="`${disabled}`"
            v-focusable
            v-for="(item, i) in data[scroll.index - 1].answers"
            :key="i"
            :id="`area0_item_${i}`"
            :ref="`area0_item_${i}`"
            :data-area="0"
            :data-index="i"
            data-methods="onClick"
            @onFocus="onArea0Focus(i)"
            @up="onStopMove($event)"
            @left="i == 0 && onStopMove($event)"
            @right="
              i == data[scroll.index - 1].answers.length && onStopMove($event)
            "
          >
            <div class="no_select"></div>
            <div class="select"></div>
            <div class="txt">{{ item.content }}</div>
          </div>
        </template>
      </div>
    </div>

    <div class="bottom">
      <div
        class="scroll"
        :style="{
          width: (scroll.maxWidth / data.length) * scroll.index + 'px'
        }"
      >
        <img src="../assets/answer/scroll.png" alt="" />
      </div>
      <img src="../assets/answer/bottom.png" alt="" />
      <div class="scroll_txt">{{ scroll.index }} / {{ data.length }}</div>
    </div>
  </div>
</template>

<script>
import { queryToJson } from '../tool/util.js'
import { getRandomInt, log, debounce, delayedAction } from '../tool/index.js'
import { handleAndroidvClick } from '../tool/android.js'

import { addBeans } from '../api/userInfo.js'
import { getCategoriesIdQuestions } from '../api/problem.js'

import { debounceTime } from '../config/index.js'

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
      URL: window.location.href,
      lock: false,
      successPro: false,
      title: '',
      // 资产id
      assetId: !this.$route.query.assetId
        ? 1
        : parseInt(this.$route.query.assetId),
      data: [],
      answer_success: {
        state: '',
        time: 500,
        class: '',
        modal: '',
        score: {
          score: 0,
          class: ''
        },
        money: {
          icon1: { class: '' },
          icon2: { class: '' },
          icon3: { class: '' }
        }
      },
      answer_error: {
        state: '',
        time: 500,
        class: '',
        modal: ''
      },
      scroll: {
        index: 1,
        maxWidth: 877
      },
      audio: null,
      timer: null,
      successTimers: [],
      errorTimers: [],
      autoTime: 4000,
      autoCloseTime: 3000,
      disabled: 'disabled',
      audio_lock: false,
      src: ''
    }
  },
  methods: {
    // 定位焦点
    handleFocus() {
      this.$nextTick(() => {
        this.focusElement(this.$refs[`area${this.areaid}_item_${this.indexid}`])
      })
    },
    // 定位焦点函数
    focusElement(element) {
      this.$tv.requestFocus(element)
    },
    onStopMove(event) {
      this.focusElement(event.target)
    },
    init() {
      this.analysisUrl()
    },
    async getData() {
      const { data } = await getCategoriesIdQuestions(this.assetId, {
        page: 1,
        pageSize: 999
      })
      delayedAction(() => {
        this.handleLock()
      })
      data.length == 0 &&
        this.$Message({
          type: 'error',
          message: '无节目'
        })
      this.data = data
        .map((item) => {
          const rightKey = item.answers.findIndex((item) => item.is_right == 1)
          return {
            ...item,
            rightKey,
            img: item.files[1].url,
            audio: item.files[0].url
          }
        })
        .sort(() => Math.random() - 0.5)
        .slice(0, 10)
      this.lock = true
    },
    async analysisUrl() {
      await this.getData()
    },
    // 定位到area1
    focusPositionArea1() {
      this.onArea1Focus()
      this.focusElement(this.$refs[`area1_item_0`])
      handleAndroidvClick()
    },
    // 异步设置焦点
    asyncSetFocus() {
      delayedAction(() => {
        // 防止抢移动焦点情况
        const focus = document.querySelector('.focus')
        if (focus == null || focus.dataset.area == 1)
          this.focusElement(this.$refs[`area0_item_0`])
      })
    },

    //播放音频题目
    playAudioInit(src) {
      var that = this
      this.audio = new Audio(src)
      this.audio.onended = function () {
        that.onArea1Blur()
        that.asyncSetFocus()
      }
      const promise = this.audio.play()
      if (promise != undefined) {
        promise
          .then(() => {})
          .catch(() => {
            // 播放失败，模拟单击重新播放题目
            that.lock = true
            handleAndroidvClick()
          })
      }
    },
    //播放音频
    playAudio(src) {
      var that = this
      this.src = src
      var audio = new Audio(src)
      audio.onended = function () {
        audio = null
      }
      const promise = audio.play()
      if (promise != undefined) {
        promise
          .then(() => {
            that.audio_lock = false
          })
          .catch(() => {
            // 播放失败，模拟单击重新播放题目
            that.audio_lock = true
            handleAndroidvClick()
          })
      }
    },
    addScroll() {
      this.scroll.index++
      this.playAudioInit(this.data[this.scroll.index - 1]?.audio)
    },
    // 清除计时器
    clearTimeout() {
      clearTimeout(this.timer)
      this.timer = null
      this.clearTimers()
    },
    // 重置回答正确弹窗
    resetSuccess() {
      this.answer_success.class = ''
      this.answer_success.money.icon1.class = ''
      this.answer_success.money.icon2.class = ''
      this.answer_success.money.icon3.class = ''
      this.answer_success.score.class = ''
    },
    // 关闭回答正确弹窗
    closeSuccessModal() {
      this.answer_success.class = 'hide'
      this.answer_success.state = 'padding'
      this.focusPositionArea1()
      delayedAction(() => {
        this.answer_success.modal = ''
        this.answer_success.state = ''
        this.addScroll()
      }, this.answer_success.time)
    },
    // 开始回答正确弹窗动画
    startSuccessAnimation() {
      if (this.answer_success.state == 'padding') return
      if (this.answer_error.state == 'padding') return
      this.answer_success.state = 'padding'
      this.focusPositionArea1()
      this.resetSuccess()
      this.answer_success.class = 'show'
      this.answer_success.modal = 'modal'

      const successTimer1 = delayedAction(() => {
        const random = getRandomInt(1, 5)
        this.playAudio(require(`../assets/answer/good${random}.mp3`))
        this.answer_success.state = 'padding'
      }, debounceTime)

      const successTimer2 = delayedAction(() => {
        this.answer_success.money.icon1.class = 'show trembling'
        this.playAudio(require('../assets/answer/paopao1.mp3'))
        this.answer_success.state = 'padding'
      }, this.autoCloseTime + debounceTime)

      const successTimer3 = delayedAction(() => {
        this.answer_success.money.icon2.class = 'show trembling'
        this.playAudio(require('../assets/answer/paopao1.mp3'))
        this.answer_success.state = 'padding'
      }, this.autoCloseTime + debounceTime + this.answer_success.time)

      const successTimer4 = delayedAction(() => {
        this.answer_success.money.icon3.class = 'show trembling'
        this.playAudio(require('../assets/answer/paopao1.mp3'))
        this.answer_success.state = 'padding'
      }, this.autoCloseTime + debounceTime + 2 * this.answer_success.time)

      const successTimer5 = delayedAction(() => {
        this.answer_success.score.class = 'show trembling'
        this.answer_success.score.score += 3
        this.playAudio(require('../assets/answer/ding1.mp3'))
        this.answer_success.state = 'stop'
        this.autoCloseSuccessModal()
      }, this.autoCloseTime + debounceTime + 3 * this.answer_success.time)

      this.successTimers = [
        successTimer1,
        successTimer2,
        successTimer3,
        successTimer4,
        successTimer5
      ]
    },
    // 自动关闭回答正确弹窗
    autoCloseSuccessModal() {
      this.clearTimeout()
      this.timer = delayedAction(() => {
        this.answer_success.state == 'stop' && this.closeSuccessModal()
      }, this.autoCloseTime)
    },
    // 重置回答错误弹窗
    resetError() {
      this.answer_error.class = ''
    },
    // 关闭回答错误弹窗
    closeErrorModal() {
      this.answer_error.class = 'hide'
      this.answer_error.state = 'padding'
      this.focusPositionArea1()
      delayedAction(() => {
        this.answer_error.modal = ''
        this.answer_error.state = ''
        this.addScroll()
      }, this.answer_error.time)
    },
    // 开始回答错误弹窗动画
    startErrorAnimation() {
      if (this.answer_success.state == 'padding') return
      if (this.answer_error.state == 'padding') return
      this.answer_error.state = 'padding'
      this.focusPositionArea1()
      this.resetError()
      this.answer_error.class = 'show'
      this.answer_error.modal = 'modal'

      const errorTimer1 = delayedAction(() => {
        const random = getRandomInt(1, 4)
        this.playAudio(require(`../assets/answer/bad${random}.mp3`))
        this.answer_error.state = 'padding'
      }, debounceTime)

      const errorTimer2 = delayedAction(() => {
        this.answer_error.state = 'stop'
        this.autoCloseErrorModal()
      }, this.autoCloseTime + debounceTime)

      this.errorTimers = [errorTimer1, errorTimer2]
    },
    // 自动关闭回答错误弹窗
    autoCloseErrorModal() {
      this.clearTimeout()
      this.timer = delayedAction(() => {
        this.answer_error.state == 'stop' && this.closeErrorModal()
      }, this.autoCloseTime)
    },
    // 清除计时器
    clearTimers() {
      for (let timer of this.successTimers) {
        clearTimeout(timer)
      }
      for (let timer of this.errorTimers) {
        clearTimeout(timer)
      }
      this.successTimers = []
      this.errorTimers = []
    },
    // 初始化lock
    handleLock() {
      if (!this.lock) return
      this.lock = false
      this.playAudioInit(this.data[this.scroll.index - 1].audio)
    },
    hangleAudioLock() {
      this.playAudio(this.src)
    },
    // 焦点移动播放语音
    onArea0Focus: debounce(function (index) {
      this.playAudio(
        this.data[this.scroll.index - 1].answers[index].files[0].url
      )
    }, debounceTime),
    onArea1Focus() {
      this.disabled = 'disabled'
    },
    onArea1Blur() {
      this.disabled = ''
    },
    onDestroyAudio() {
      this.audio.pause()
      this.audio.src = ''
      this.audio.load()
      this.audio = null
    }
  },
  created() {
    this.init()
  },
  mounted() {
    document.onkeydown = debounce((key) => {
      const code = key.keyCode
      if (this.audio_lock) {
        this.hangleAudioLock()
        return
      }

      if (this.answer_success.state == 'padding') return
      if (this.answer_error.state == 'padding') return
      this.handleLock()

      if (this.successPro) {
        this.$router.push({
          path: 'successpro.html',
          query: {
            sum: this.answer_success.score.getScore(),
            returnurl: this.returnurl
          }
        })

        return
      }
      if (code == 13) {
        key.preventDefault()
        if (this.answer_success.state == 'stop') return this.closeSuccessModal()
        if (this.answer_error.state == 'stop') return this.closeErrorModal()

        const focus = document.querySelector('.focus')
        if (focus) {
          let { area, index } = focus.dataset
          if (!focus.dataset.methods === false) {
            switch (focus.dataset.methods) {
              case 'onClick':
                if (index == this.data[this.scroll.index - 1].rightKey) {
                  addBeans({
                    question_id: this.data[this.scroll.index - 1].id,
                    answer_id:
                      this.data[this.scroll.index - 1].answers[
                        this.data[this.scroll.index - 1].rightKey
                      ].id
                  })
                  this.startSuccessAnimation()
                } else {
                  this.startErrorAnimation()
                }
                if (this.scroll.index < this.data.length) {
                  return
                }
                this.successPro = true
                break
              default:
                break
            }
          }
        }
      } else if (code == 32) {
        window.onAndroidKeyBack()
      }
    })
    // 返回
    window.onAndroidKeyBack = () => {
      if (this.answer_success.state == 'padding') return
      if (this.answer_error.state == 'padding') return

      if (this.successPro) {
        this.$router.push({
          path: 'successpro.html',
          query: {
            sum: this.answer_success.score.getScore(),
            returnurl: this.returnurl
          }
        })
        return
      }
      if (this.answer_success.state == 'stop') return this.closeSuccessModal()
      if (this.answer_error.state == 'stop') return this.closeErrorModal()

      this.onDestroyAudio()
      const url = new URL(this.returnurl)
      const params = queryToJson(this.returnurl)
      this.$router.push({
        path: url.pathname,
        query: params
      })
    }
  },
  destroyed() {
    this.clearTimeout()
  }
}
</script>

<style lang="scss" scoped>
.answer {
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
      display: none !important;
    }
    .select {
      display: block !important;
    }
  }
  .modal {
    width: 1920px;
    height: 1080px;
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    z-index: 9999;
  }
  .answer_bg {
    position: absolute;
  }
  .answer_title {
    .answer_title_bg {
      position: absolute;
      left: 410px;
      top: 60px;
    }
    .answer_title_horn {
      position: absolute;
      left: 530px;
      top: 90px;
    }
    .answer_title_txt {
      position: absolute;
      left: 652px;
      top: 70px;
      width: 820px;
      height: 150px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 48px;
      font-weight: bold;
      letter-spacing: 6px;
      line-height: 65px;
    }
    .trembling {
      animation: show 1.5s linear;
      animation-iteration-count: 1;
    }
  }
  .answer_img {
    position: absolute;
    top: 265px;
    left: 585px;
    img {
      width: 772px;
      height: 425px;
      border: 10px solid #ffe5ac;
      border-radius: 40px;
    }
  }
  .answer_error {
    position: absolute;
    left: 500px;
    top: 250px;
    z-index: 20;
    transform: scale(0.5);
    opacity: 0;
  }
  .answer_success {
    position: absolute;
    left: 410px;
    top: 235px;
    z-index: 20;
    transform: scale(0.5);
    opacity: 0;
    .answer_success_score {
      position: absolute;
      left: 1150px;
      top: -116px;
      span {
        color: gold;
        font-size: 42px;
        text-align: center;
        font-weight: bolder;
        position: absolute;
        left: 119px;
        top: 34px;
      }
    }
    .answer_success_money {
      margin-left: 80px;
      .float {
        float: left;
      }
      .item {
        display: inline-block;
        margin: 55px 72px;
        position: relative;
        opacity: 0;
      }
    }
  }
  .show {
    transform: scale(1);
    transition: 0.5s;
    opacity: 1 !important;
  }
  .hide {
    animation: hide 0.5s linear;
    animation-iteration-count: 1;
  }

  .trembling {
    animation: show 0.5s linear;
    animation-iteration-count: 1;
  }

  width: 1920px;
  .area_0 {
    top: 745px;
    left: 490px;
    position: absolute;
    .area {
      width: 1000px;
      display: flex;
      justify-content: space-around;
      .disabled {
        .no_select {
          background-color: #f5f5f5 !important;
        }
        .txt {
          color: #00000040 !important;
        }
      }
      .item {
        display: inline-block;
        margin: 15px 33px;
        position: relative;
        .no_select {
          width: 252px;
          height: 201px;
          background-color: white;
          border-radius: 30px;
        }
        .select {
          width: 240px;
          height: 190px;
          background-color: #ffe13a;
          border-radius: 30px;
          border: 7px solid white;
        }
        .txt {
          position: absolute;
          color: #c74207;
          font-size: 70px;
          font-weight: bold;
          top: 0px;
          width: 252px;
          height: 201px;
          line-height: 85px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      }
    }
  }

  .bottom {
    position: absolute;
    bottom: 40px;
    left: 540px;
    .scroll {
      position: absolute;
      left: 7px;
      top: 7px;
      overflow: hidden;
    }
    .scroll_txt {
      position: absolute;
      left: 404px;
      top: 11px;
      font-family: Arial;
      font-size: 31px;
      color: #b75f1f;
      font-weight: bold;
    }
  }
}
</style>
