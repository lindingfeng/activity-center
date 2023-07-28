<template>
  <base-popup
    v-model="popupStatus"
    position="bottom"
    :close-on-click-overlay="false"
    class="base-login-component"
    @close="popupClose"
  >
    <div class="base-login-content">
      <div class="login-header">
        <img
          class="icon-logo"
          src="@/assets/img/icon_hsb_logo.png"
        />
        <img
          class="icon-close"
          src="@/assets/img/icon_close.png"
          @click="popupStatus = false"
        />
      </div>
      <div class="login-body">
        <div class="login-field">
          <field
            v-model="inputs.account"
            type="tel"
            maxlength="11"
            placeholder="请输入手机号码"
            class="custom-field"
          />
        </div>
        <div class="login-field">
          <field
            v-model="inputs.verifyCode"
            type="tel"
            maxlength="6"
            placeholder="请输入短信验证码"
            class="custom-field"
          />
          <div
            class="countdown-content"
            :class="{
              countdown: isCountdown || !isVerifyMobile
            }"
          >
            <template v-if="isCountdown">
              <div class="countdown-count">{{ data.count }}s</div>
            </template>
            <template v-else>
              <div class="code-button" @click="sendVerifyCode">获取验证码</div>
            </template>
          </div>
        </div>
        <div class="send-code-content">
          <div v-if="data.sending">发送短信中...</div>
        </div>
        <div class="login-button">
          <base-button
            :disabled="!allowSubmit"
            :loading="data.loging"
            @click="login"
          >
            登 录
          </base-button>
        </div>
      </div>
    </div>
  </base-popup>
</template>

<script setup>
import { Field } from 'vant'
import { reactive, computed } from 'vue'
import BasePopup from '@/components/common/base-popup/index.vue'
import BaseButton from '@/components/common/base-button/index.vue'

defineOptions({
  name: 'BaseLogin'
})

const props = defineProps({
  value: Boolean
})

const emits = defineEmits(['input'])

const COUNT = 60

const inputs = reactive({
  account: '',
  verifyCode: ''
})

const data = reactive({
  count: COUNT,
  sending: false,
  loging: false,
  timer: null
})

const isCountdown = computed(() => data.count < 60)

const isVerifyMobile = computed(() => /^[1][0-9]{10}$/.test(inputs.account))

const allowSubmit = computed(() => isVerifyMobile.value && !data.sending && inputs.verifyCode > 0)

const popupStatus = computed({
  get () {
    return props.value
  },
  set (value) {
    emits('input', value)
  }
})

// async function sendVerifyCode () {}

/**
 * 发送验证码
 */
async function sendVerifyCode () {
  if (!isVerifyMobile.value) return
  data.sending = true
  startCountdown()
}

/**
 * 倒计时
 */
function startCountdown () {
  data.count--
  clearInterval(data.timer)
  data.timer = setInterval(() => {
    if (data.count <= 0) {
      data.count = COUNT
      data.sending = false
      return clearInterval(data.timer)
    }
    data.count--
  }, 1000)
}

/**
 * 登录
 */
async function login () {
  data.loging = true
  setTimeout(() => {
    data.loging = false
  }, 3000)
}

function popupClose () {
  clearInterval(data.timer)
}

</script>

<style lang="scss" scoped>
@import './index.scss';
</style>