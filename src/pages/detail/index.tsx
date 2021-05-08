import { Form, Button, Modal, Input, Select, message, Card } from 'antd';
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateArticle } from '@/services/ant-design-pro/api';
import { history } from 'umi';

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.ArticleListParams) => {
  const hide = message.loading('正在修改');
  try {
    await updateArticle({
      title: fields.title,
      type: fields.type,
      content: fields.content,
      key: fields.key,
    });
    hide();

    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};

const Detail: React.FC = () => {
  // @ts-ignore
  const [text, handleText] = useState<string>(history.location.query.content);

  return (
    <PageContainer>
      <Card title={history.location.query?.title} bordered={false}>
        <ReactQuill value={text} onChange={handleText} />
      </Card>
      <Button
        style={{ marginTop: 16 }}
        onClick={() => {
          history.goBack();
        }}
      >
        返回
      </Button>
      <Button style={{ marginTop: 16 }} onClick={handleUpdate({ content: text })} type="primary">
        保存
      </Button>
    </PageContainer>
  );
};

export default Detail;
