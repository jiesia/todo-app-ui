import { request } from '../utils';
import { ITodo } from '../stores/todo';

// 注册
export async function register(username: string, password: string) {
  const url = '/user/register';
  return await request({ url, data: { username, password } });
}

interface ILoginResult {
  token: string;
}
// 登录
export async function login(username: string, password: string) {
  const url = '/user/login';
  return await request<ILoginResult>({ url, data: { username, password } });
}

// 获取 todo list
export async function getTodos() {
  const url = '/todo';
  return await request<ITodo[]>({ url, method: 'GET' });
}

// 添加 todo
export async function addTodo(content: string) {
  const url = '/todo';
  return await request<ITodo>({ url, method: 'POST', data: { content } });
}

// 删除 todo
export async function deleteTodo(todoId: string) {
  const url = '/todo';
  return await request({ url, method: 'DELETE', data: { todoId } });
}

export interface IUpdateInfo {
  content?: string;
  done?: boolean;
}
// 更新 todo 信息
export async function updateTodo(todoId: string, updateInfo: IUpdateInfo) {
  const url = '/todo';
  return await request({ url, method: 'PUT', data: { todoId, updateInfo } });
}
