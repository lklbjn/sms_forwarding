<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">邮件通知</h1>
      <p class="page-subtitle">配置 SMTP 服务器以接收短信邮件通知</p>
    </div>
    <form action="/save" method="POST">
      <div class="card">
        <div class="card-header">📧 SMTP 设置</div>
        <div class="card-body">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">SMTP 服务器</label>
              <input class="form-input" type="text" name="smtpServer" :value="get('smtp_server')" placeholder="smtp.qq.com">
            </div>
            <div class="form-group">
              <label class="form-label">SMTP 端口</label>
              <input class="form-input" type="number" name="smtpPort" :value="get('smtp_port')" placeholder="465">
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">邮箱账号</label>
              <input class="form-input" type="text" name="smtpUser" :value="get('smtp_user')" placeholder="your@qq.com">
            </div>
            <div class="form-group">
              <label class="form-label">密码 / 授权码</label>
              <input class="form-input" type="password" name="smtpPass" :value="get('smtp_pass')" placeholder="授权码">
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">接收邮件地址</label>
            <input class="form-input" type="text" name="smtpSendTo" :value="get('smtp_send_to')" placeholder="receiver@example.com">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block btn-save">保存配置</button>
    </form>
  </div>
</template>

<script setup>
import { get } from '../utils/config.js'
</script>
