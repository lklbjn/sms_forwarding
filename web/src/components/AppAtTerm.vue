<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">AT 指令终端</h1>
      <p class="page-subtitle">直接向模组发送 AT 指令并接收响应</p>
    </div>
    <div class="card">
      <div class="card-header">💻 终端</div>
      <div class="card-body">
        <div class="at-log" ref="logEl">
          <div v-for="(line, i) in logLines" :key="i">
            <template v-if="line.type === 'user'"><span style="color:#fff;font-weight:600">&gt; </span>{{ line.text }}</template>
            <template v-else-if="line.type === 'error'"><span style="color:#f87171;font-weight:600">! </span>{{ line.text }}</template>
            <template v-else><span style="color:#5eead4">{{ line.text }}</span></template>
          </div>
        </div>
        <div class="at-bar">
          <input
            class="form-input"
            type="text"
            v-model="cmd"
            placeholder="AT+CSQ"
            @keydown.enter="sendAT"
          >
          <button class="btn btn-primary btn-sm" :disabled="sending" @click="sendAT">
            {{ sending ? '...' : '发送' }}
          </button>
        </div>
        <div class="btn-group" style="margin-top:10px">
          <button class="btn btn-secondary btn-sm" @click="logLines = []">清空日志</button>
        </div>
        <p class="form-hint">直接向模组串口发送指令并接收响应，请谨慎操作</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { apiGet } from '../utils/api.js'

const logEl = ref(null)
const logLines = ref([{ text: '就绪 — 输入 AT 指令开始调试', type: 'resp' }])
const cmd = ref('')
const sending = ref(false)

async function sendAT() {
  const c = cmd.value.trim()
  if (!c) return
  sending.value = true
  logLines.value.push({ text: c, type: 'user' })
  cmd.value = ''
  await nextTick()
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight

  try {
    const d = await apiGet('/at?cmd=' + encodeURIComponent(c))
    logLines.value.push({ text: d.message, type: d.success ? 'resp' : 'error' })
  } catch (e) {
    logLines.value.push({ text: '网络错误: ' + e, type: 'error' })
  }
  sending.value = false
  await nextTick()
  if (logEl.value) logEl.value.scrollTop = logEl.value.scrollHeight
}
</script>
