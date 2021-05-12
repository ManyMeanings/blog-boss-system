import { Card, Col, Row, message } from 'antd';
import { HomeOutlined, FieldTimeOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import Articles from './components/Articles';
import { history } from 'umi';
import { queryArticle, queryRule } from '@/services/ant-design-pro/api';
import moment from 'moment';
import styles from './index.less';

const Center: React.FC = () => {
  const [account, setAccount] = useState<API.AccountListItem>();
  const [articleList, setArticleList] = useState<API.ArticleListItem[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const tabKey = 'article';

  const asyncFetch = () => {
    setLoading(true);
    const key = history.location.query?.key || 51;
    queryRule({ key })
      .then((json) => {
        setAccount(json.data[0]);
        return queryArticle({ authorKey: key });
      })
      .then((json) => {
        setArticleList(json.data);
        setLoading(false);
      })
      .catch(() => {
        message.error('请求失败');
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  const operationTabList = [
    {
      key: 'articles',
      tab: (
        <span>
          文章 <span style={{ fontSize: 14 }}>({articleList?.length || 0})</span>
        </span>
      ),
    },
  ];

  return (
    <GridContent>
      <Row gutter={24}>
        <Col lg={7} md={24}>
          <Card bordered={false} style={{ marginBottom: 24 }} loading={loading}>
            {!loading && (
              <>
                <div className={styles.avatarHolder}>
                  <img alt="" src={account?.avatar} />
                  <div className={styles.name}>{account?.name}</div>
                </div>
                <div className={styles.detail}>
                  <p>
                    <HomeOutlined
                      style={{
                        marginRight: 8,
                      }}
                    />
                    {account?.location}
                  </p>
                  <p>
                    <FieldTimeOutlined
                      style={{
                        marginRight: 8,
                      }}
                    />
                    {moment(account?.lastLoginAt).format('YYYY-MM-DD')}
                  </p>
                </div>
              </>
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
            <Articles list={articleList || []} />
          </Card>
        </Col>
      </Row>
    </GridContent>
  );
};

export default Center;
