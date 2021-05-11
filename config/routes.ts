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
    name: '分析图表',
    icon: 'PieChartOutlined',
    path: '/analysis',
    component: './analysis',
  },
  {
    name: '监控图表',
    icon: 'dashboard',
    path: '/monitor',
    component: './monitor',
  },
  {
    name: '用户表格',
    icon: 'table',
    path: '/table',
    access: 'canAdmin',
    component: './table',
  },
  {
    name: '文章表格',
    icon: 'table',
    path: '/article',
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
