<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">账号管理</h1>
      <p class="page-subtitle">修改 Web 管理界面的登录凭据</p>
    </div>
    <form action="/save" method="POST">
      <div class="card">
        <div class="card-header">🔐 登录凭据</div>
        <div class="card-body">
          <div class="form-warning">首次使用请立即修改默认密码！默认: admin / admin123</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">管理账号</label>
              <input class="form-input" type="text" name="webUser" :value="get('web_user')" placeholder="admin">
            </div>
            <div class="form-group">
              <label class="form-label">管理密码</label>
              <input class="form-input" type="password" name="webPass" :value="get('web_pass')" placeholder="设置复杂密码">
            </div>
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
