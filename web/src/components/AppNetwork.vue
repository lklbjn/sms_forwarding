<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">网络测试</h1>
      <p class="page-subtitle">通过模组数据连接测试网络连通性</p>
    </div>
    <div class="card">
      <div class="card-header">🌐 Ping</div>
      <div class="card-body">
        <button class="btn btn-secondary" :disabled="pingLoading" @click="doPing">
          {{ pingLoading ? 'Pinging...' : 'Ping 8.8.8.8' }}
        </button>
        <p class="form-hint">通过模组执行 Ping，消耗极少流量</p>
        <div class="result-box" :class="pingResultClass" v-show="pingResultText" v-html="pingResultText"></div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">📡 WiFi 控制</div>
      <div class="card-body">
        <button class="btn btn-danger" @click="wifiRestart">重启 WiFi</button>
        <p class="form-hint">断开当前 WiFi 连接并重新连接</p>
        <div class="result-box" :class="wifiResultClass" v-show="wifiResultText">{{ wifiResultText }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiGet, apiPost } from '../utils/api.js'

const pingLoading = ref(false)
const pingResultText = ref('')
const pingResultClass = ref('')
const wifiResultText = ref('')
const wifiResultClass = ref('')

async function doPing() {
  if (!confirm('确定要执行 Ping 吗？将消耗少量流量。')) return
  pingLoading.value = true
  pingResultText.value = '正在 Ping 8.8.8.8（最长 30 秒）...'
  pingResultClass.value = 'result-box result-loading show'
  try {
    const d = await apiPost('/ping', {})
    if (d.success) {
      pingResultText.value = 'Ping 成功 — ' + d.message
      pingResultClass.value = 'result-box result-success show'
    } else {
      pingResultText.value = 'Ping 失败 — ' + d.message
      pingResultClass.value = 'result-box result-error show'
    }
  } catch (e) {
    pingResultText.value = '请求失败: ' + e
    pingResultClass.value = 'result-box result-error show'
  }
  pingLoading.value = false
}

async function wifiRestart() {
  if (!confirm('确定要重启WiFi吗？网页将暂时不可用。')) return
  wifiResultText.value = 'WiFi 重启中（约5秒）...'
  wifiResultClass.value = 'result-box result-loading show'
  try {
    const d = await apiGet('/wifi?action=restart')
    wifiResultText.value = d.message
    wifiResultClass.value = d.success ? 'result-box result-success show' : 'result-box result-error show'
  } catch (e) {
    wifiResultText.value = '请求失败: ' + e
    wifiResultClass.value = 'result-box result-error show'
  }
}
</script>
