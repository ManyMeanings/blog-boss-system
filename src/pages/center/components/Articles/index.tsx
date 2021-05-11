import { StarTwoTone, LikeOutlined } from '@ant-design/icons';
import { List, Tag } from 'antd';
import React from 'react';
import ArticleListContent from '../ArticleListContent';
import styles from './index.less';

export interface ArticlesProps {
  list: API.ArticleListItem[];
}

const Articles: React.FC<ArticlesProps> = (props) => {
  const { list } = props;
  const IconText: React.FC<{
    icon: React.ReactNode;
    text: React.ReactNode;
  }> = ({ icon, text }) => (
    <span>
      {icon} {text}
    </span>
  );
  return (
    <List<API.ArticleListItem>
      size="large"
      className={styles.articleList}
      rowKey="id"
      itemLayout="vertical"
      dataSource={list}
      renderItem={(item) => (
        <List.Item
          key={item.key}
          actions={[
            <IconText key="star" icon={<StarTwoTone />} text={item.star} />,
            <IconText key="like" icon={<LikeOutlined />} text={item.like} />,
          ]}
        >
          <List.Item.Meta
            title={
              <a className={styles.listItemMetaTitle}>
                {item.title}
              </a>
            }
            description={
              <span>
                <Tag>Ant Design</Tag>
                <Tag>设计语言</Tag>
                <Tag>蚂蚁金服</Tag>
              </span>
            }
          />
          <ArticleListContent data={item} />
        </List.Item>
      )}
    />
  );
};

export default Articles;
