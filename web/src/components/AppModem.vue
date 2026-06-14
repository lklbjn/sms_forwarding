<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">模组控制</h1>
      <p class="page-subtitle">模组重启、飞行模式、信号查询等操作</p>
    </div>
    <div class="card">
      <div class="card-header">🔄 模组重启</div>
      <div class="card-body">
        <div class="btn-group">
          <button class="btn btn-danger" @click="modemAction('restart')">软重启 (AT+CFUN)</button>
          <button class="btn btn-danger" @click="modemAction('hardreset')">硬重启 (EN引脚)</button>
        </div>
        <p class="form-hint">软重启发送 AT+CFUN=1,1 指令（15s 超时）；硬重启通过 EN 引脚断电后重新上电</p>
        <div class="result-box" :class="rstResultClass" v-show="rstResultText">{{ rstResultText }}</div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">📶 信号查询</div>
      <div class="card-body">
        <div class="btn-group">
          <button class="btn btn-primary" @click="modemAction('signal')">查询信号强度</button>
          <button class="btn btn-primary" @click="modemAction('operator')">查询运营商</button>
          <button class="btn btn-primary" @click="modemAction('imei')">查询 IMEI</button>
        </div>
        <div class="result-box" :class="queryResultClass" v-show="queryResultText" v-html="queryResultText"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">✈ 飞行模式</div>
      <div class="card-body">
        <div class="btn-group">
          <button class="btn btn-danger" :disabled="flightLoading" @click="toggleFlightMode">
            {{ flightLoading ? '切换中...' : '切换飞行模式' }}
          </button>
          <button class="btn btn-secondary" @click="queryFlightMode">查询状态</button>
        </div>
        <p class="form-hint">飞行模式开启后模组射频关闭，无法收发短信</p>
        <div class="result-box" :class="flightResultClass" v-show="flightResultText" v-html="flightResultText"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiGet, apiPost } from '../utils/api.js'

const rstResultText = ref('')
const rstResultClass = ref('')
const queryResultText = ref('')
const queryResultClass = ref('')
const flightResultText = ref('')
const flightResultClass = ref('')
const flightLoading = ref(false)

const actionNames = {
  restart: '软重启', hardreset: '硬重启',
  signal: '信号查询', operator: '运营商查询', imei: 'IMEI查询'
}

function isResetAction(action) { return action === 'restart' || action === 'hardreset' }

async function modemAction(action) {
  const name = actionNames[action] || action

  if (action === 'hardreset') {
    if (!confirm('硬重启将断电重启模组，确定继续？')) return
    rstResultText.value = '硬重启中（约10秒）...'
    rstResultClass.value = 'result-box result-loading show'
    try {
      const d = await apiGet('/modem?action=hardreset')
      rstResultText.value = d.message + ' — 稍后请手动查询信号确认恢复'
      rstResultClass.value = 'result-box result-success show'
    } catch (e) {
      rstResultText.value = '请求失败: ' + e
      rstResultClass.value = 'result-box result-error show'
    }
    return
  }

  const el = isResetAction(action) ? rstResultText : queryResultText
  const cls = isResetAction(action) ? rstResultClass : queryResultClass
  el.value = name + '中...'
  cls.value = 'result-box result-loading show'
  try {
    const d = await apiGet('/modem?action=' + action)
    if (d.success) {
      el.value = name + '成功: ' + d.message
      cls.value = 'result-box result-success show'
    } else {
      el.value = name + '失败: ' + d.message
      cls.value = 'result-box result-error show'
    }
  } catch (e) {
    el.value = '请求失败: ' + e
    cls.value = 'result-box result-error show'
  }
}

async function queryFlightMode() {
  flightResultText.value = '查询中...'
  flightResultClass.value = 'result-box result-loading show'
  try {
    const d = await apiGet('/flight?action=query')
    if (d.success) {
      flightResultText.value = d.message
      flightResultClass.value = 'result-box result-info show'
    } else {
      flightResultText.value = '查询失败: ' + d.message
      flightResultClass.value = 'result-box result-error show'
    }
  } catch (e) {
    flightResultText.value = '请求失败: ' + e
    flightResultClass.value = 'result-box result-error show'
  }
}

async function toggleFlightMode() {
  if (!confirm('确定要切换飞行模式吗？')) return
  flightLoading.value = true
  flightResultText.value = '切换中...'
  flightResultClass.value = 'result-box result-loading show'
  try {
    const d = await apiGet('/flight?action=toggle')
    if (d.success) {
      flightResultText.value = d.message
      flightResultClass.value = 'result-box result-success show'
    } else {
      flightResultText.value = '切换失败: ' + d.message
      flightResultClass.value = 'result-box result-error show'
    }
  } catch (e) {
    flightResultText.value = '请求失败: ' + e
    flightResultClass.value = 'result-box result-error show'
  }
  flightLoading.value = false
}
</script>
