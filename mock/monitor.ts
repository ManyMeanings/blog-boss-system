let global = {
  money: 10115,
  user: 1234,
  percent: 65,
  goal1: 28,
  goal2: 22,
  goal3: 32,
  remain: 34,
  stress: 66,
};

const timer = setInterval(() => {
  global.money = 10115 + Math.floor(Math.random() * 1000);
  global.user = 1234 + Math.floor(Math.random() * 100);
  global.percent = 65 + Math.floor(Math.random() * 20);
  global.goal1 = 28 + Math.floor(Math.random() * 20);
  global.goal2 = 32 + Math.floor(Math.random() * 20);
  global.goal3 = 34 + Math.floor(Math.random() * 20);
  global.remain = 50 - Math.floor(Math.random() * 20);
  global.stress = 50 + Math.floor(Math.random() * 30);
}, 4000);

const tags = [
  {
    name: 'react',
    value: 125,
  },
  {
    name: 'vue',
    value: 120,
  },
  {
    name: 'ant design',
    value: 77,
    type: 0,
  },
  {
    name: '前端',
    value: 129,
    type: 1,
  },
  {
    name: '后端',
    value: 115,
    type: 2,
  },
  {
    name: '图表',
    value: 38,
  },
  {
    name: '请求',
    value: 49,
  },
  {
    name: '计算机网络',
    value: 80,
    type: 0,
  },
  {
    name: '数据结构',
    value: 75,
    type: 1,
  },
  {
    name: '算法',
    value: 98,
    type: 2,
  },
  {
    name: 'react',
    value: 125,
  },
  {
    name: 'vue',
    value: 120,
  },
  {
    name: 'ant design',
    value: 77,
    type: 0,
  },
  {
    name: '前端',
    value: 129,
    type: 1,
  },
  {
    name: '后端',
    value: 115,
    type: 2,
  },
  {
    name: '图表',
    value: 38,
  },
  {
    name: '请求',
    value: 49,
  },
  {
    name: '计算机网络',
    value: 80,
    type: 0,
  },
  {
    name: '数据结构',
    value: 75,
    type: 1,
  },
  {
    name: '算法',
    value: 98,
    type: 2,
  },
  {
    name: 'react',
    value: 125,
  },
  {
    name: 'vue',
    value: 120,
  },
  {
    name: 'ant design',
    value: 77,
    type: 0,
  },
  {
    name: '前端',
    value: 129,
    type: 1,
  },
  {
    name: '后端',
    value: 115,
    type: 2,
  },
  {
    name: '图表',
    value: 38,
  },
  {
    name: '请求',
    value: 49,
  },
  {
    name: '计算机网络',
    value: 80,
    type: 0,
  },
  {
    name: '数据结构',
    value: 75,
    type: 1,
  },
  {
    name: '算法',
    value: 98,
    type: 2,
  },
  {
    name: '图表',
    value: 38,
  },
  {
    name: '请求',
    value: 49,
  },
  {
    name: '计算机网络',
    value: 80,
    type: 0,
  },
  {
    name: '数据结构',
    value: 75,
    type: 1,
  },
  {
    name: '算法',
    value: 98,
    type: 2,
  },
  {
    name: '图表',
    value: 38,
  },
  {
    name: '请求',
    value: 49,
  },
  {
    name: '计算机网络',
    value: 80,
    type: 0,
  },
  {
    name: '数据结构',
    value: 75,
    type: 1,
  },
  {
    name: '算法',
    value: 98,
    type: 2,
  },
];

const data = {
  tags,
  global,
};

export default {
  'GET  /api/monitor_chart_data': data,
};
