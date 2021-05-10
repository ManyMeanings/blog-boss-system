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
    name: 'dashboard.analysis',
    icon: 'PieChartOutlined',
    path: '/analysis',
    component: './analysis',
  },
  {
    name: 'dashboard.monitor',
    icon: 'dashboard',
    path: '/monitor',
    component: './monitor',
  },
  {
    name: 'list.user',
    icon: 'table',
    path: '/table',
    access: 'canAdmin',
    component: './table',
  },
  {
    name: 'list.article',
    icon: 'table',
    path: '/article',
    access: 'canAdmin',
    component: './article',
  },
  {
    path: '/',
    redirect: './analysis',
  },
  {
    component: './404',
  },
];
