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
    access: 'canAdmin',
    component: './analysis',
  },
  {
    name: 'dashboard.monitor',
    icon: 'dashboard',
    path: '/monitor',
    access: 'canAdmin',
    component: './monitor',
  },
  {
    name: 'list.user',
    icon: 'table',
    path: '/TableList',
    access: 'canAdmin',
    component: './TableList',
  },
  {
    name: 'list.article',
    icon: 'table',
    path: '/article',
    access: 'canAdmin',
    component: './article',
  },
  {
    name: 'detail',
    icon: 'smile',
    path: '/detail',
    access: 'canAdmin',
    hideInMenu:true,
    component: './detail',
  },
  {
    path: '/',
    redirect: '/analysis',
  },
  {
    component: './404',
  },
];
