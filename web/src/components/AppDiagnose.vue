<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">模组诊断</h1>
      <p class="page-subtitle">查询模组状态、SIM 卡与网络信息</p>
    </div>
    <div class="card">
      <div class="card-header">📊 查询</div>
      <div class="card-body">
        <div class="btn-group">
          <button class="btn btn-secondary" @click="queryInfo('ati')">固件信息</button>
          <button class="btn btn-secondary" @click="queryInfo('signal')">信号质量</button>
        </div>
        <div class="btn-group">
          <button class="btn btn-secondary" @click="queryInfo('siminfo')">SIM 卡信息</button>
          <button class="btn btn-secondary" @click="queryInfo('network')">网络状态</button>
          <button class="btn btn-secondary" @click="queryInfo('wifi')">WiFi 状态</button>
        </div>
        <div class="result-box" :class="resultClass" v-show="resultText" v-html="resultText"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiGet } from '../utils/api.js'

const resultText = ref('')
const resultClass = ref('')

async function queryInfo(type) {
  resultText.value = '查询中...'
  resultClass.value = 'result-box result-loading show'
  try {
    const d = await apiGet('/query?type=' + type)
    if (d.success) {
      resultText.value = d.message
      resultClass.value = 'result-box result-info show'
    } else {
      resultText.value = '查询失败: ' + d.message
      resultClass.value = 'result-box result-error show'
    }
  } catch (e) {
    resultText.value = '请求失败: ' + e
    resultClass.value = 'result-box result-error show'
  }
}
</script>
