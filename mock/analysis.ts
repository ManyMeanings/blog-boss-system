import moment from 'moment';

// mock data
const visitData: API.VisitDataType[] = [];
const beginDay = new Date().getTime();

const fakeY = [8846, 8875, 10211, 5679, 7756, 9998, 8798, 7788, 7654, 6543, 6189, 6122, 7875, 5345, 8876];
for (let i = 0; i < fakeY.length; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY[i],
  });
}

const visitData2 = [];
const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
for (let i = 0; i < fakeY2.length; i += 1) {
  visitData2.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: fakeY2[i],
  });
}

const salesData = [];
for (let i = 0; i < 12; i += 1) {
  salesData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  });
}
const searchData = [];
for (let i = 0; i < 50; i += 1) {
  searchData.push({
    index: i + 1,
    keyword: `搜索关键词-${i}`,
    count: Math.floor(Math.random() * 1000),
    range: Math.floor(Math.random() * 100),
    status: Math.floor((Math.random() * 10) % 2),
  });
}
const typeData1 = [
  {
    x: '广告',
    y: 10230733,
  },
  {
    x: '会员',
    y: 3410244,
  },
  {
    x: '赞助',
    y: 1705122,
  },
  {
    x: '其他',
    y: 1705124,
  },
];

const typeData2 = [
  {
    x: '百度',
    y: 5000,
  },
  {
    x: '谷歌',
    y: 2500,
  },
  {
    x: '必应',
    y: 1000,
  },
  {
    x: '其他',
    y: 500,
  },
];

const radarOriginData = [
  {
    name: '个人',
    ref: 10,
    koubei: 8,
    output: 4,
    contribute: 5,
    hot: 7,
  },
  {
    name: '团队',
    ref: 3,
    koubei: 9,
    output: 6,
    contribute: 3,
    hot: 1,
  },
  {
    name: '部门',
    ref: 4,
    koubei: 1,
    output: 6,
    contribute: 5,
    hot: 7,
  },
];

const radarData: API.RadarData[] = [];
const radarTitleMap = {
  ref: '引用',
  koubei: '口碑',
  output: '产量',
  contribute: '贡献',
  hot: '热度',
};
radarOriginData.forEach((item) => {
  Object.keys(item).forEach((key) => {
    if (key !== 'name') {
      radarData.push({
        name: item.name,
        label: radarTitleMap[key],
        value: item[key],
      });
    }
  });
});

const getFakeChartData: API.AnalysisData = {
  visitData,
  visitData2,
  salesData,
  searchData,
  typeData1,
  typeData2,
  radarData,
};

export default {
  'GET  /api/fake_chart_data': getFakeChartData,
};
