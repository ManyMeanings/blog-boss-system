import { Card, Col, Row, Statistic } from 'antd';
import React from 'react';

import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud, Map } from './components/Charts';
import ActiveChart from './components/ActiveChart';
import styles from './style.less';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 24 + 1000 * 30;

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

const Monitor: React.FC = () => {
  return (
    <GridContent>
      <React.Fragment>
        <Row gutter={24}>
          <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="网站实时数据" bordered={false}>
              <Row>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="今日收入" suffix="元" value={numeral(10115).format('0,0')} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="在线用户数量" value={numeral(1234).format('0,0')} />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Countdown title="剩余时间" value={deadline} format="HH:mm:ss:SSS" />
                </Col>
                <Col md={6} sm={12} xs={24}>
                  <Statistic title="目标达成率" value="85%" />
                </Col>
              </Row>
              <div className={styles.mapChart}>
                <Map />
              </div>
            </Card>
          </Col>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card title="情况预测" style={{ marginBottom: 24 }} bordered={false}>
              <ActiveChart />
            </Card>
            <Card
              title="服务器负载"
              style={{ marginBottom: 24 }}
              bodyStyle={{ textAlign: 'center' }}
              bordered={false}
            >
              <Gauge title="负载" height={180} percent={66} />
            </Card>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="目标达成占比" bordered={false} className={styles.pieCard}>
              <Row style={{ padding: '16px 0' }}>
                <Col span={8}>
                  <Pie
                    animate={false}
                    percent={28}
                    subTitle="目标1"
                    total="28%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#5DDECF"
                    percent={22}
                    subTitle="目标2"
                    total="22%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
                <Col span={8}>
                  <Pie
                    animate={false}
                    color="#2FC25B"
                    percent={32}
                    subTitle="目标3"
                    total="32%"
                    height={128}
                    lineWidth={2}
                  />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card title="热门搜索" bordered={false} bodyStyle={{ overflow: 'hidden' }}>
              <TagCloud data={tags || []} height={161} />
            </Card>
          </Col>
          <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
            <Card
              title="资源剩余"
              bodyStyle={{ textAlign: 'center', fontSize: 0 }}
              bordered={false}
            >
              <WaterWave height={161} title="资源" percent={34} />
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    </GridContent>
  );
};

export default Monitor;
