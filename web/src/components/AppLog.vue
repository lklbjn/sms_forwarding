<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">系统日志</h1>
      <p class="page-subtitle">
        实时查看设备串口日志输出
        <span class="log-status" v-if="autoRefresh"><span class="dot"></span> 自动刷新中</span>
      </p>
    </div>
    <div class="card">
      <div class="card-header">📋 日志输出</div>
      <div class="card-body">
        <div class="log-view" ref="logEl">{{ logText }}</div>
        <div class="log-controls">
          <button class="btn btn-secondary btn-sm" @click="logText = ''">清空显示</button>
          <button class="btn btn-secondary btn-sm" @click="refreshLog">手动刷新</button>
          <label style="cursor:pointer;display:flex;align-items:center;gap:4px;font-size:13px;">
            <input type="checkbox" v-model="autoRefresh" @change="toggleAuto"> 自动刷新
          </label>
        </div>
        <p class="form-hint">显示设备运行时输出的日志信息，每2秒自动刷新。日志最多保留最近120条。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { apiGet } from '../utils/api.js'

const logEl = ref(null)
const logText = ref('加载中...')
const autoRefresh = ref(true)
let timer = null

async function refreshLog() {
  try {
    const lines = await apiGet('/log')
    if (Array.isArray(lines)) {
      logText.value = lines.join('\n')
      if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight
    }
  } catch {
    if (logText.value === '加载中...') logText.value = '无法获取日志'
  }
}

function startPoll() {
  if (timer) return
  timer = setInterval(refreshLog, 2000)
}

function stopPoll() {
  if (timer) { clearInterval(timer); timer = null }
}

function toggleAuto() {
  autoRefresh.value ? startPoll() : stopPoll()
}

onMounted(() => { refreshLog(); startPoll() })
onUnmounted(() => stopPoll())
</script>
