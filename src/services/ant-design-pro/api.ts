// @ts-ignore
/* eslint-disable */
import { request } from 'umi';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.CurrentUser>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
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

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function queryRule(params?: { [key: string]: any }) {
  return request('/api/rule', {
    params,
  });
}

/** 新建规则 PUT /api/rule */
export async function updateRule(params?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(params?: { [key: string]: any }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(params: { key: number[] }) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

/** 获取文章列表 GET /api/rule */
export async function queryArticle(params?: { [key: string]: any }) {
  return request('/api/article', {
    params,
  });
}

/** 新建文章 PUT /api/rule */
export async function updateArticle(params?: { [key: string]: any }) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

/** 新建文章 POST /api/rule */
export async function addArticle(params?: { [key: string]: any }) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

/** 删除文章 DELETE /api/rule */
export async function removeArticle(params: { key: number[] }) {
  return request('/api/article', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}
