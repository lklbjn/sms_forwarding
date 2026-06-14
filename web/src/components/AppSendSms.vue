<template>
  <div>
    <div class="page-header">
      <h1 class="page-title">发送短信</h1>
      <p class="page-subtitle">通过模组直接发送短信</p>
    </div>
    <div class="card">
      <div class="card-header">📤 新建短信</div>
      <div class="card-body">
        <form action="/sendsms" method="POST">
          <div class="form-group">
            <label class="form-label">目标号码</label>
            <input class="form-input" type="text" name="phone" placeholder="13800138000" required>
          </div>
          <div class="form-group">
            <label class="form-label">短信内容</label>
            <textarea class="form-textarea" name="content" placeholder="输入短信内容..." required @input="updateCount" v-model="content"></textarea>
            <p class="form-hint">已输入 <strong>{{ content.length }}</strong> 字符</p>
          </div>
          <button type="submit" class="btn btn-primary" style="padding:10px 24px;">发送短信</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const content = ref('')
</script>
