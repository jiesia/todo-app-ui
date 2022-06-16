const baseURL = 'http://localhost:8000/api';

interface IRequestParams {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
}

interface Result<T> {
  code: number;
  message: string;
  data: T;
}

// 网络请求
export function request<T>(params: IRequestParams): Promise<Result<T>> {
  const url = baseURL + params.url;
  const method = params.method || 'POST';
  const data = JSON.stringify(params.data);

  const token = localStorage.getItem('token');

  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: data,
    }).then(response => {
      resolve(response.json());
    }).catch(error => {
      console.error('Error:', error);
      reject(error);
    });
  });
}
