// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { parse } from 'url';

// mock tableListDataSource
const genList = (current: number, pageSize: number) => {
  const tableListDataSource: API.ArticleListItem[] = [];

  for (let i = 0; i < pageSize; i += 1) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      key: index,
      title: `文章 ${index}`,
      author: `用户 ${index}`,
      authorKey: index,
      type: Math.floor(Math.random() * 2).toString(),
      views: Math.floor(Math.random() * 100),
      updateAt: new Date().getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
      content: `<p>这是<b>文章 ${index}</b>的内容</p>`,
      tags: ['React', 'Ant Design'],
      star: Math.floor(Math.random() * 100),
      like: Math.floor(Math.random() * 100),
    });
  }
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 50);

function getArticle(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }
  const { current = 1, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as API.ArticleListParams;

  let dataSource = tableListDataSource;
  const sorter = JSON.parse(params.sorter || ('{}' as any));
  if (sorter) {
    dataSource = dataSource.sort((prev, next) => {
      let sortNumber = 0;
      Object.keys(sorter).forEach((key) => {
        if (sorter[key] === 'descend') {
          if (prev[key] - next[key] > 0) {
            sortNumber += -1;
          } else {
            sortNumber += 1;
          }
          return;
        }
        if (prev[key] - next[key] > 0) {
          sortNumber += 1;
        } else {
          sortNumber += -1;
        }
      });
      return sortNumber;
    });
  }
  if (params.filter) {
    const filter = JSON.parse(params.filter as any) as {
      [key: string]: string[];
    };
    if (Object.keys(filter).length > 0) {
      dataSource = dataSource.filter((item) => {
        return Object.keys(filter).some((key) => {
          if (!filter[key]) {
            return true;
          }
          if (filter[key].includes(`${item[key]}`)) {
            return true;
          }
          return false;
        });
      });
    }
  }

  if (params.title) {
    dataSource = dataSource.filter((data) => data?.title?.includes(params.title || ''));
  }

  if (params.author) {
    dataSource = dataSource.filter((data) => data?.author?.includes(params.author || ''));
  }

  if (params.key) {
    dataSource = dataSource.filter((data) =>
      data?.key?.toString().includes(params.key?.toString() || ''),
    );
  }

  if (params.content) {
    dataSource = dataSource.filter((data) =>
      data?.content?.toString().includes(params.content?.toString() || ''),
    );
  }

  const finalDataSource = [...dataSource].slice(
    ((current as number) - 1) * (pageSize as number),
    (current as number) * (pageSize as number),
  );
  const result = {
    data: finalDataSource,
    total: dataSource.length,
    success: true,
    pageSize,
    current: parseInt(`${params.currentPage}`, 10) || 1,
  };

  return res.json(result);
}

function postArticle(req: Request, res: Response, u: string, b: Request) {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, title, key, type, content, tags, authorKey, author } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter((item) => key.indexOf(item.key) === -1);
      break;
    case 'post':
      (() => {
        const newArticle: API.ArticleListItem = {
          key: tableListDataSource.length,
          title,
          author,
          authorKey,
          type,
          views: 1,
          updateAt: new Date().getTime(),
          content,
          tags,
          star: 0,
          like: 0,
        };
        tableListDataSource.unshift(newArticle);
        return res.json(newArticle);
      })();
      return;

    case 'update':
      (() => {
        let newArticle = {};
        tableListDataSource = tableListDataSource.map((item) => {
          if (item.key === key) {
            newArticle = { ...item, title, type, content, tags };
            return { ...item, title, type, content, tags };
          }
          return item;
        });
        return res.json(newArticle);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  res.json(result);
}

export default {
  'GET /api/article': getArticle,
  'POST /api/article': postArticle,
};
