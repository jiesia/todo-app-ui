<script lang="ts" setup>
import { defineProps, ref, defineEmits } from 'vue';

// props
interface IProps {
  content: string;
  name: string;
}
const { content, name } = defineProps<IProps>();
const emit = defineEmits(['clicked']);

const isactive = ref(false);

function onToggle() {
  emit('clicked', isactive.value);
}
</script>

<template>
  <div class="togglebutton-wrapper" :class="isactive ? 'togglebutton-checked' : ''">
    <label :for="name">
      <span class="togglebutton-label">{{ content }}</span>
      <span class="tooglebutton-box"></span>
    </label>
    <input :id="name" type="checkbox" :name="name" v-model="isactive" @change="onToggle">
  </div>
</template>
