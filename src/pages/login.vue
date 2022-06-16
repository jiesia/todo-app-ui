<script lang="ts" setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import { login } from '../apis';

const router = useRouter();
const form = reactive({
  username: '',
  password: '',
});

async function loginHandler() {
  const { username, password } = form;
  const { code, message, data } = await login(username, password);
  if (code === 400) {
    return ElMessage.error(message);
  }
  // 登录成功
  localStorage.setItem('token', data.token);
  router.push('/');
  ElMessage.success(message);
}
</script>

<template>
  <div class="login">
    <div class="login-card">
      <el-form :model="form" label-width="60px">
        <el-form-item label="账号：">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码：">
          <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginHandler">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-card {
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 0 10px 0px #cccccc;
  }
}
</style>
