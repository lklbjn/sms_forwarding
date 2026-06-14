<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">管理员 & 黑名单</h1>
      <p class="page-subtitle">远程控制权限与短信过滤</p>
    </div>
    <form action="/save" method="POST">
      <div class="card">
        <div class="card-header">👤 管理员手机号</div>
        <div class="card-body">
          <div class="form-group">
            <input class="form-input" type="text" name="adminPhone" :value="get('admin_phone')" placeholder="13800138000">
            <p class="form-hint">此号码可通过短信发送远程指令（SMS:号码:内容 发短信、RESET 重启）</p>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-header">🚫 号码黑名单</div>
        <div class="card-body">
          <div class="form-group">
            <textarea class="form-textarea" name="numberBlackList" rows="5" placeholder="每行一个号码">{{ get('number_black_list') }}</textarea>
            <p class="form-hint">黑名单号码发来的短信将被自动忽略</p>
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
