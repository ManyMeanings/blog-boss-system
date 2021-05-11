import { Card, Col, Row } from 'antd';
import React, { useState } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Articles from './components/Articles';
import styles from './index.less';

const operationTabList = [
  {
    key: 'articles',
    tab: (
      <span>
        文章 <span style={{ fontSize: 14 }}>(8)</span>
      </span>
    ),
  },
];
const list: API.ArticleListItem[] = [
  {
    key: 12,
    title: 'Alipay',
    lastModifyAt: '11',
    star: 124,
    like: 200,
    content:
      '段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。',
  },
];

const Center: React.FC = () => {
  const tabKey = 'article';
  const currentUser = {
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    name: 'tao',
  };
  const dataLoading = false;
  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={dataLoading}>
            {!dataLoading && (
              <div className={styles.avatarHolder}>
                <img alt="" src={currentUser.avatar} />
                <div className={styles.name}>{currentUser.name}</div>
              </div>
            )}
          </Card>
        </Col>
        <Col lg={17} md={24}>
          <Card
            className={styles.tabsCard}
            bordered={false}
            tabList={operationTabList}
            activeTabKey={tabKey}
          >
            <Articles list={list} />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Center;
