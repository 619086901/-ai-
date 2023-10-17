<template>
  <transition name="fade" @after-leave="handleAfterLeave">
    <div class="message_root" v-show="visible">
      <div class="message" :class="[`root_${type}`]">
        <span :class="[`${type}`]" v-if="title">{{ title }}</span>
        <span :class="[`${type}`]" v-else>{{ type }}</span>
        <span class="title"> {{ message }}</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      visible: false,
      type: 'info',
      message: '',
      duration: 3000,
      timer: null,
      title: undefined
    }
  },
  mounted() {
    this.setTimer() // 组件挂载的时候开始计时，计时完成移除
    this.setTitle()
  },
  methods: {
    setTitle() {
      switch (this.type) {
        case 'success':
          this.title = 'OK'
          break
        case 'info':
          this.title = '!'
          break
        case 'warning':
          this.title = '!'
          break
        case 'error':
          this.title = 'Error'
          break
        default:
          break
      }
    },
    setTimer() {
      // 组件停留时间duration
      this.timer = setTimeout(() => {
        this.close()
      }, this.duration)
    },
    close() {
      this.visible = false
      clearTimeout(this.timer)
      // this.handleAfterLeave()
    },
    handleAfterLeave() {
      // 移除动画执行完成后，销毁组件，并将其从父节点移除
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active {
  animation: fade-in 0.6s ease;
}
.fade-leave-active {
  animation: fade-out 0.6s ease;
}
@keyframes fade-in {
  0% {
    top: -40px;
    opacity: 0;
  }
  100% {
    top: 20px;
    opacity: 100%;
  }
}
@keyframes fade-out {
  0% {
    top: 20px;
    opacity: 100%;
  }
  100% {
    top: -40px;
    opacity: 0;
  }
}
.message_root {
  width: 100%;
  .message {
    position: relative;
    z-index: 999;
    height: 40px;
    transform: translateX(-50%);
    line-height: 40px;
    border-radius: 30px;
    padding: 10px 15px;
    color: white;
    display: inline-block;
    margin-top: 25px;
    text-align: center;
    .title {
      padding: 0px 0px 0px 10px;
      font-size: 18px;
      line-height: 18px;
      color: #000000;
    }
    .info {
      background: #0083fa;
      border-radius: 30px;
      padding: 0px 12px;
      font-size: 18px;
    }
    .success {
      background: rgb(87, 233, 58);
      border-radius: 30px;
      padding: 0px 12px;
      font-size: 18px;
    }
    .warning {
      background: rgb(254, 164, 46);
      border-radius: 30px;
      padding: 0px 12px;
      font-size: 18px;
    }
    .error {
      background: rgb(233, 67, 58);
      border-radius: 30px;
      padding: 0px 12px;
      font-size: 18px;
    }
  }
}
.root_info {
  background: #ffffff;
}
.root_success {
  background: rgb(244, 255, 235);
}
.root_warning {
  background: #ffffff;
}
.root_error {
  background: rgb(254, 226, 229);
}
</style>
