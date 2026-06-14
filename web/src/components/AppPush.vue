<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">推送通道</h1>
      <p class="page-subtitle">最多 5 个独立推送通道，支持 POST JSON、Bark、钉钉、飞书、PushPlus、Server酱、Gotify、Telegram</p>
    </div>
    <form action="/save" method="POST">
      <div class="card">
        <div class="card-header">🔗 通道配置</div>
        <div class="card-body">
          <div
            v-for="(ch, i) in channels"
            :key="i"
            class="push-channel"
            :class="{ enabled: ch.enabled }"
          >
            <div class="push-channel-header">
              <input
                type="checkbox"
                :name="'push' + i + 'en'"
                :id="'push' + i + 'en'"
                v-model="ch.enabled"
              >
              <label :for="'push' + i + 'en'">启用推送通道 {{ i + 1 }}</label>
            </div>
            <div class="push-channel-body">
              <div class="form-group">
                <label class="form-label">通道名称</label>
                <input class="form-input" type="text" :name="'push' + i + 'name'" v-model="ch.name" placeholder="自定义名称">
              </div>
              <div class="form-group">
                <label class="form-label">推送方式</label>
                <select class="form-select" :name="'push' + i + 'type'" v-model="ch.type">
                  <option value="1">POST JSON（通用格式）</option>
                  <option value="2">Bark（iOS推送）</option>
                  <option value="3">GET请求（参数在URL中）</option>
                  <option value="4">钉钉机器人</option>
                  <option value="5">PushPlus</option>
                  <option value="6">Server酱</option>
                  <option value="7">自定义模板</option>
                  <option value="8">飞书机器人</option>
                  <option value="9">Gotify</option>
                  <option value="10">Telegram Bot</option>
                </select>
                <div class="push-type-hint" v-html="getTypeHint(ch.type)"></div>
              </div>
              <div class="form-group">
                <label class="form-label">推送URL/Webhook</label>
                <input class="form-input" type="text" :name="'push' + i + 'url'" v-model="ch.url" placeholder="http://your-server.com/api 或 webhook地址">
              </div>
              <template v-if="showExtra(ch.type)">
                <div class="form-group">
                  <label class="form-label">{{ getExtraLabel1(ch.type) }}</label>
                  <input class="form-input" type="text" :name="'push' + i + 'key1'" v-model="ch.key1" :placeholder="getExtraPlaceholder1(ch.type)">
                </div>
                <div v-if="showKey2(ch.type)" class="form-group">
                  <label class="form-label">{{ getExtraLabel2(ch.type) }}</label>
                  <input class="form-input" type="text" :name="'push' + i + 'key2'" v-model="ch.key2" :placeholder="getExtraPlaceholder2(ch.type)">
                </div>
              </template>
              <template v-if="ch.type === '7'">
                <div class="form-group">
                  <label class="form-label">请求体模板（使用 {sender} {message} {timestamp} 占位符）</label>
                  <textarea class="form-textarea" :name="'push' + i + 'body'" v-model="ch.customBody" rows="4" style="font-family:var(--mono)"></textarea>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block btn-save">保存配置</button>
    </form>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { config } from '../utils/config.js'

function loadChannels() {
  const defaults = { enabled: false, type: '1', name: '', url: '', key1: '', key2: '', customBody: '' }
  const channels = []
  for (let i = 0; i < 5; i++) {
    const ch = { ...defaults }
    const prefix = 'push' + i
    if (config[prefix + '_enabled'] === '1' || config[prefix + '_enabled'] === true) {
      ch.enabled = true
    }
    ch.type = config[prefix + '_type'] || '1'
    ch.name = config[prefix + '_name'] || ''
    ch.url = config[prefix + '_url'] || ''
    ch.key1 = config[prefix + '_key1'] || ''
    ch.key2 = config[prefix + '_key2'] || ''
    ch.customBody = config[prefix + '_body'] || ''
    channels.push(ch)
  }
  return channels
}

const channels = reactive(loadChannels())

function getTypeHint(type) {
  const hints = {
    '1': 'POST JSON<br>{"sender":"+8613800138000","message":"...","timestamp":"2026-01-01 12:00:00"}',
    '2': 'Bark (iOS)<br>POST {"title":"发送者","body":"短信内容"}',
    '3': 'GET 请求<br>URL?sender=xxx&message=xxx&timestamp=xxx',
    '4': '钉钉机器人<br>填写 Webhook 地址，加签需填 Secret',
    '5': 'PushPlus<br>填写 Token，URL 留空使用默认',
    '6': 'Server酱<br>填写 SendKey，URL 留空使用默认',
    '7': '自定义模板<br>使用 {sender} {message} {timestamp} 占位符',
    '8': '飞书机器人<br>填写 Webhook 地址，签名验证需填 Secret',
    '9': 'Gotify<br>填写服务器地址 + 应用 Token',
    '10': 'Telegram Bot<br>Chat ID + Bot Token'
  }
  return hints[type] || ''
}

function showExtra(type) {
  return ['4','5','6','8','9','10'].includes(type)
}

function showKey2(type) {
  return ['5','10'].includes(type)
}

function getExtraLabel1(type) {
  const labels = {
    '4': 'Secret（加签密钥，可选）',
    '5': 'Token',
    '6': 'SendKey',
    '8': 'Secret（签名密钥，可选）',
    '9': 'Token（应用 Token）',
    '10': 'Chat ID'
  }
  return labels[type] || '参数 1'
}

function getExtraPlaceholder1(type) {
  const p = { '4': 'SEC...', '5': 'pushplus token', '6': 'SCT...', '8': '飞书签名密钥', '9': 'A...', '10': '123456789' }
  return p[type] || ''
}

function getExtraLabel2(type) {
  const labels = { '5': '发送渠道', '10': 'Bot Token' }
  return labels[type] || '参数 2'
}

function getExtraPlaceholder2(type) {
  const p = { '5': 'wechat / extension / app', '10': '12345678:ABC...' }
  return p[type] || ''
}
</script>
