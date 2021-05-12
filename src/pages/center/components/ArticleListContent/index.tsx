import React from 'react';
import moment from 'moment';
import styles from './index.less';
import 'react-quill/dist/quill.snow.css';

export interface ApplicationsProps {
  data: {
    content?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    href?: string;
  };
}

const getDescription = (content: string) => {
  const start = content.search('<p>');
  const length = content.search('</p>') + 3 - start;

  return content.substr(start, length);
};

const ArticleListContent: React.FC<ApplicationsProps> = ({ data: { content, updatedAt } }) => (
  <div className={styles.listContent}>
    <div
      className={styles.description}
      dangerouslySetInnerHTML={{ __html: getDescription(content || '') }}
    ></div>
    <div className={styles.extra}>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:MM:SS')}</em>
    </div>
  </div>
);

export default ArticleListContent;
