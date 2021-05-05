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
    name: 'list.table-list',
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
