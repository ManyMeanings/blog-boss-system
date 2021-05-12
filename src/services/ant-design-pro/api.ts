// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function queryRule(params?: { [key: string]: any }) {
  return request('/api/rule', {
    params,
  });
}

export async function updateRule(params?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function addRule(params?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function queryArticle(params?: { [key: string]: any }) {
  return request('/api/article', {
    params,
  });
}

export async function updateArticle(params?: { [key: string]: any }) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function addArticle(params?: { [key: string]: any }) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function removeArticle(params: { key: number[] }) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}
