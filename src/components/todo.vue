<script lang="ts" setup>
import { ref, computed } from 'vue';
import ToggleButton from './togglebutton.vue';
import { useTodoStore } from '../stores/todo';

const { data, add, del, toggleFinish } = useTodoStore();
const newItem = ref('');
const sortByStatus = ref(false);
const todoByStatus = computed(() => {
  if (!sortByStatus.value) {
    return data;
  }
  const doneArray = data.filter(i => i.done);
  const notDoneArray = data.filter(i => !i.done);

  return [...notDoneArray, ...doneArray];
});

async function addTodo() {
  await add(newItem.value);
  newItem.value = '';
}

function clickontoggle(active: boolean) {
  sortByStatus.value = active;
}
</script>

<template>
  <main id="todolist">
    <h1>
      Todo List
      <span>Get things done, one item at a time.</span>
    </h1>

    <template v-if="data.length">
      <transition-group name="todolist" tag="ul">
        <li v-for="item in todoByStatus" :class="{ done: item.done }" :key="item._id">
          <span class="label">{{ item.content }}</span>
          <div class="actions">
            <button class="btn-picto" type="button" @click="toggleFinish(item)"
              :aria-label="item.done ? 'Undone' : 'Done'" :title="item.done ? 'Undone' : 'Done'">
              <i aria-hidden="true" class="material-icons">{{ item.done ? 'check_box' : 'check_box_outline_blank' }}</i>
            </button>
            <button class="btn-picto" type="button" @click="del(item)" aria-label="Delete" title="Delete">
              <i aria-hidden="true" class="material-icons">delete</i>
            </button>
          </div>
        </li>
      </transition-group>
      <toggle-button content="Move done items at the end?" name="todosort" @clicked="clickontoggle" />
    </template>
    <p v-else class="emptylist">Your todo list is empty.</p>

    <form class="todo-form" name="newform" @submit.prevent="addTodo">
      <label for="newitem">Add to the todo list</label>
      <input type="text" name="newitem" id="newitem" v-model="newItem">
      <button type="submit">Add item</button>
    </form>
  </main>
</template>
