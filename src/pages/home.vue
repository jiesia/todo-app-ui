<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
import Todo from '../components/todo.vue';
import { useTodoStore } from '../stores/todo';

const { refresh } = useTodoStore();
refresh();

const router = useRouter();
const token = localStorage.getItem('token');
if (!token) {
  router.push('/');
  ElMessage.warning('请登录后使用');
}
</script>

<template>
  <div class="home">
    <Suspense>
      <Todo />
    </Suspense>
  </div>
</template>
