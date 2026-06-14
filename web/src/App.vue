<template>
  <div class="layout">
    <aside class="sidebar">
      <div class="sidebar-brand">
        <h1><span class="icon">📨</span> <span>SMS FWD</span></h1>
        <div class="subtitle">短信转发器</div>
      </div>
      <nav class="sidebar-nav">
        <div class="nav-section">配置</div>
        <div
          v-for="item in navConfig"
          :key="item.id"
          class="nav-item"
          :class="{ active: currentPanel === item.id }"
          @click="switchPanel(item.id)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </div>
        <div class="nav-divider"></div>
        <div class="nav-section">工具</div>
        <div
          v-for="item in navTools"
          :key="item.id"
          class="nav-item"
          :class="{ active: currentPanel === item.id }"
          @click="switchPanel(item.id)"
        >
          <span class="nav-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </div>
      </nav>
      <div class="sidebar-footer">
        <button class="btn btn-secondary btn-sm btn-block" @click="switchPanel('account')">
          <span>🔑</span> <span>修改密码</span>
        </button>
      </div>
    </aside>

    <main class="main">
      <AppOverview v-if="currentPanel === 'overview'" />
      <AppAccount v-else-if="currentPanel === 'account'" />
      <AppEmail v-else-if="currentPanel === 'email'" />
      <AppPush v-else-if="currentPanel === 'push'" />
      <AppAdmin v-else-if="currentPanel === 'admin'" />
      <AppSendSms v-else-if="currentPanel === 'sendsms'" />
      <AppDiagnose v-else-if="currentPanel === 'diagnose'" />
      <AppNetwork v-else-if="currentPanel === 'network'" />
      <AppModem v-else-if="currentPanel === 'modem'" />
      <AppAtTerm v-else-if="currentPanel === 'atterm'" />
      <AppLog v-else-if="currentPanel === 'log'" />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppOverview from './components/AppOverview.vue'
import AppAccount from './components/AppAccount.vue'
import AppEmail from './components/AppEmail.vue'
import AppPush from './components/AppPush.vue'
import AppAdmin from './components/AppAdmin.vue'
import AppSendSms from './components/AppSendSms.vue'
import AppDiagnose from './components/AppDiagnose.vue'
import AppNetwork from './components/AppNetwork.vue'
import AppModem from './components/AppModem.vue'
import AppAtTerm from './components/AppAtTerm.vue'
import AppLog from './components/AppLog.vue'

const currentPanel = ref('overview')

const navConfig = [
  { id: 'overview', icon: '🏠', label: '系统概览' },
  { id: 'account', icon: '🔐', label: '账号管理' },
  { id: 'email', icon: '📧', label: '邮件通知' },
  { id: 'push', icon: '🔗', label: '推送通道' },
  { id: 'admin', icon: '👤', label: '管理员 & 黑名单' }
]

const navTools = [
  { id: 'sendsms', icon: '📤', label: '发送短信' },
  { id: 'diagnose', icon: '📊', label: '模组诊断' },
  { id: 'network', icon: '🌐', label: '网络测试' },
  { id: 'modem', icon: '📡', label: '模组控制' },
  { id: 'atterm', icon: '💻', label: 'AT 终端' },
  { id: 'log', icon: '📋', label: '系统日志' }
]

function switchPanel(id) {
  currentPanel.value = id
}
</script>
