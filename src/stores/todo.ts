import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { addTodo, deleteTodo, getTodos, IUpdateInfo, updateTodo } from '../apis';

export interface ITodo {
  _id: string;
  author: string;
  content: string;
  done: boolean;
  createTime: string;
  updateTime: string;
}

export const useTodoStore = defineStore('todo', () => {
  const data = reactive<ITodo[]>([]);

  // 重新获取所有 todo
  async function refresh() {
    const { code, data: todos } = await getTodos();
    if (code === 200) {
      while (data.length !== 0) {
        data.pop();
      }
      data.push(...todos);
    }
  }

  // 添加一条数据
  async function add(content: string) {
    const { code, data: newTodo } = await addTodo(content);
    if (code === 200) {
      data.push(newTodo);
    }
  }

  // 删除一条数据
  async function del(todo: ITodo) {
    const { _id } = todo;
    const { code } = await deleteTodo(_id);
    if (code === 200) {
      const index = data.findIndex(d => d._id === _id);
      data.splice(index, 1);
    }
  }

  // 切换完成状态
  async function toggleFinish(todo: ITodo) {
    const { _id, done } = todo;
    const { code } = await update(_id, { done: !done });
    if (code === 200) {
      const current = data.find(d => d._id === _id)!;
      current.done = !done;
    }
  }

  // 更新 todo 信息
  async function update(todoId: string, updateInfo: IUpdateInfo) {
    return await updateTodo(todoId, updateInfo);
  }

  return {
    data,
    refresh,
    add,
    del,
    toggleFinish,
  };
});
