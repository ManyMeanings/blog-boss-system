import { Card, Col, Row, Statistic, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import numeral from 'numeral';
import { Pie, WaterWave, Gauge, TagCloud, Map } from './components/Charts';
import ActiveChart from './components/ActiveChart';
import { monitorChartData } from '@/services/ant-design-pro/api';
import styles from './style.less';

const { Countdown } = Statistic;

const deadline = Date.now() + 1000 * 60 * 60 * 8 + 1000 * 30;

const Monitor: React.FC = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const intervalRef = useRef<NodeJS.Timeout>();

  const asyncFetch = () => {
    setLoading(true);
    monitorChartData()
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        message.error('请求数据失败');
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      monitorChartData()
        .then((json) => {
          setData(json);
        })
        .catch(() => {
          message.error('请求数据失败');
        });
    }, 5000);
    intervalRef.current = timer;
    return () => {
      if (intervalRef.current) {
        clearInterval(timer);
      }
    };
  });

  return (
    <GridContent>
      <React.Fragment>
        {data ? (
          <>
            <Row gutter={24}>
              <Col xl={18} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card title="网站实时数据" bordered={false} loading={loading}>
                  <Row>
                    <Col md={6} sm={12} xs={24}>
                      <Statistic
                        title="今日收入"
                        suffix="元"
                        value={numeral(data.global.money).format('0,0')}
                      />
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                      <Statistic
                        title="在线用户数量"
                        value={numeral(data.global.user).format('0,0')}
                      />
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                      <Countdown title="剩余时间" value={deadline} format="HH:mm:ss:SSS" />
                    </Col>
                    <Col md={6} sm={12} xs={24}>
                      <Statistic title="目标达成率" value={`${data.global.percent}%`} />
                    </Col>
                  </Row>
                  <div className={styles.mapChart}>
                    <Map />
                  </div>
                </Card>
              </Col>
              <Col xl={6} lg={24} md={24} sm={24} xs={24}>
                <Card
                  title="情况预测"
                  style={{ marginBottom: 24 }}
                  bordered={false}
                  loading={loading}
                >
                  <ActiveChart />
                </Card>
                <Card
                  title="服务器负载"
                  style={{ marginBottom: 24 }}
                  bodyStyle={{ textAlign: 'center' }}
                  bordered={false}
                  loading={loading}
                >
                  <Gauge title="负载" height={180} percent={data.global.stress} />
                </Card>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col xl={12} lg={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card
                  title="目标达成占比"
                  bordered={false}
                  className={styles.pieCard}
                  loading={loading}
                >
                  <Row style={{ padding: '16px 0' }}>
                    <Col span={8}>
                      <Pie
                        animate={false}
                        percent={28}
                        subTitle="目标1"
                        total={`${data.global.goal1}%`}
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
                        total={`${data.global.goal2}%`}
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
                        total={`${data.global.goal3}%`}
                        height={128}
                        lineWidth={2}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
              <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card
                  title="热门搜索"
                  bordered={false}
                  bodyStyle={{ overflow: 'hidden' }}
                  loading={loading}
                >
                  <TagCloud data={data.tags} height={161} />
                </Card>
              </Col>
              <Col xl={6} lg={12} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <Card
                  title="资源剩余"
                  bodyStyle={{ textAlign: 'center', fontSize: 0 }}
                  bordered={false}
                  loading={loading}
                >
                  <WaterWave height={161} title="资源" percent={data.global.remain} />
                </Card>
              </Col>
            </Row>{' '}
          </>
        ) : null}
      </React.Fragment>
    </GridContent>
  );
};

export default Monitor;
