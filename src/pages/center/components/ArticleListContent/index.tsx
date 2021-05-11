import React from 'react';
import moment from 'moment';
import styles from './index.less';

export interface ApplicationsProps {
  data: {
    content?: string;
    updatedAt?: any;
    avatar?: string;
    owner?: string;
    href?: string;
  };
}
const ArticleListContent: React.FC<ApplicationsProps> = ({
  data: { content, updatedAt },
}) => (
  <div className={styles.listContent}>
    <div className={styles.description}>{content}</div>
    <div className={styles.extra}>
      <em>{moment(updatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default ArticleListContent;
