<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">系统概览</h1>
      <p class="page-subtitle">设备状态与基本信息</p>
    </div>
    <div class="card">
      <div class="card-header">📡 设备信息</div>
      <div class="card-body">
        <div class="overview-grid">
          <div class="overview-item"><div class="label">Device IP</div><div class="value">{{ get('ip') }}</div></div>
          <div class="overview-item"><div class="label">WiFi SSID</div><div class="value">{{ get('wifi_ssid') }}</div></div>
          <div class="overview-item"><div class="label">Free Heap</div><div class="value">{{ get('free_heap') }}</div></div>
          <div class="overview-item"><div class="label">Uptime</div><div class="value">{{ get('uptime') }}</div></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header">⚙ 配置状态</div>
      <div class="card-body">
        <table class="info-table">
          <tr><td>模组状态</td><td>{{ get('modem_check') }}</td></tr>
          <tr><td>邮件通知</td><td>{{ get('smtp_check') }}</td></tr>
          <tr><td>推送通道</td><td>{{ get('push_count') }} 个已启用</td></tr>
          <tr><td>管理员号码</td><td>{{ get('admin_phone') }}</td></tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { get } from '../utils/config.js'
</script>
