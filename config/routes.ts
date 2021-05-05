export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    name: '用户表格',
    icon: 'table',
    path: '/list',
    access: 'canAdmin',
    component: './TableList',
  },
  {
    path: '/',
    redirect: '/list',
  },
  {
    component: './404',
  },
];
