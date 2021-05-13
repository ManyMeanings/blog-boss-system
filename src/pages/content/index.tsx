import { Card, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { queryArticle } from '@/services/ant-design-pro/api';
import { history } from 'umi';
import 'react-quill/dist/quill.snow.css';

const Content: React.FC = () => {
  const [article, setArticle] = useState<API.ArticleListItem>();
  const [loading, setLoading] = useState<boolean>(true);

  const asyncFetch = () => {
    setLoading(true);
    const key = history.location.query?.key || 1;
    queryArticle({ key })
      .then((json) => {
        setArticle(json.data[0]);
        setLoading(false);
      })
      .catch(() => {
        message.error('获取文章内容失败');
      });
  };

  useEffect(() => {
    asyncFetch();
  }, []);

  return (
    <PageContainer>
      <Card loading={loading} style={{ marginBottom: '16px' }} title={article?.title || ''}>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: article?.content || '' }}
        ></div>
      </Card>
    </PageContainer>
  );
};

export default Content;
