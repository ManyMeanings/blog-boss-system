import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright="2021 陶俊帆毕业设计作品"
    links={[
      {
        key: 'github',
        title: <GithubOutlined />,
        href: 'https://github.com/ManyMeanings/blog-boss-system',
        blankTarget: true,
      },
    ]}
  />
);
