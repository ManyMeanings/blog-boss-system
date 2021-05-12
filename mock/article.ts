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
  const adminArticleList: API.ArticleListItem[] = [
    {
      key: 50,
      title: '新手须知',
      author: 'admin',
      authorKey: 51,
      type: '1',
      views: 50,
      updateAt: new Date().getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
      content:
        '<p>Ant Design Pro 在力求提供开箱即用的开发体验，为此我们提供完整的脚手架，涉及<a href="https://umijs.org/plugins/plugin-locale" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">国际化</a>，<a href="https://umijs.org/plugins/plugin-access" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">权限</a>，mock，<a href="https://umijs.org/plugins/plugin-model" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">数据流</a>，<a href="https://umijs.org/plugins/plugin-request" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">网络请求</a>等各个方面。为这些中后台中常见的方案提供了最佳实践来减少学习和开发成本。</p><p>同时为了提供更加高效的开发体验，我们提供了一些列模板组件，<a href="https://procomponents.ant.design/components/layout" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">ProLayout</a>，<a href="https://procomponents.ant.design/components/table" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">ProTable</a>，<a href="https://procomponents.ant.design/components/list" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">ProList</a>&nbsp;都是开发中后台的好帮手，可以显著的减少样板代码。</p><h1><a href="https://developer.mozilla.org/zh-CN/docs/Web/Reference" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">web 技术</a></h1><p>web 技术是指通过&nbsp;<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">JavaScript</a>，<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/HTML" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">HTML</a>，<a href="https://developer.mozilla.org/zh-CN/docs/Glossary/CSS" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">css</a>&nbsp;来构建网站的技术，<a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">mdn</a>&nbsp;提供了相当方便的文档来帮助我们学习这些知识。</p><h2><a href="https://nodejs.org/en/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">Node.js</a>&nbsp;前端开发基础环境</h2><p><a href="https://nodejs.org/en/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">Node.js</a>&nbsp;是一个基于 Chrome V8 引擎的 JavaScript 运行时，Node.js 的出现极大的推动了 javascript 的工程化。Node.js 已经是当前前端开发的基础环境，也是任何工作流开始的地方。</p><h2><a href="https://webpack.js.org/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">Webpack</a>&nbsp;前端必学必会的打包工具</h2><p>Webpack 可以帮助我们完成一些任务。比如 js 压缩、css 压缩、编译模板文件等等，从而减少前端的工作量。当然，Webpack 功能很强大，能帮我们完成的工作远远不止这些。如果我们使用 umi 可以极大的简化 webpack 的配置，但是仍然推荐了解一下基础知识，方便 debug 和 自定义一些配置。</p><h2><a href="https://reactrouter.com/web/guides/quick-start" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">React Router</a>&nbsp;路由库</h2><p>React Router&nbsp;是一个基于&nbsp;React&nbsp;之上的强大路由库，它可以让你向应用中快速地添加视图和数据流，同时保持页面与 URL 间的同步。 React Router 可以把 location 转化成一个 state，帮助我们管理路由相关的所有状态。</p><h2><a href="https://webpack.docschina.org/configuration/dev-server/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">proxy</a>&nbsp;反向代理工具</h2><p>随着开发越来越偏向的前后端分离，我们在开发中不可避免地会碰到<a href="https://www.ruanyifeng.com/blog/2016/04/cors.html" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">跨域</a>的问题。proxy 就可以完美反向代理的问题，作为&nbsp;<a href="https://github.com/webpack/webpack-dev-server" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">webpack-dev-server</a>&nbsp;的主打功能之一， proxy 可以帮助我们代理到任何服务器，解决开发中碰到的跨域问题。</p><h2><a href="https://dvajs.com/guide/#%E7%89%B9%E6%80%A7" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">dva</a>&nbsp;轻量级的应用框架</h2><p>dva 首先是一个基于&nbsp;<a href="https://github.com/reduxjs/redux" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">redux</a>&nbsp;和&nbsp;<a href="https://github.com/redux-saga/redux-saga" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">redux-saga</a>&nbsp;的数据流方案，然后为了简化开发体验，dva 还额外内置了&nbsp;<a href="https://github.com/ReactTraining/react-router" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">react-router</a>&nbsp;和&nbsp;<a href="https://github.com/github/fetch" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">fetch</a>，所以也可以理解为一个轻量级的应用框架。</p><h2><a href="https://github.com/umijs/fabric" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">fabric</a>&nbsp;严格但是不严苛的 lint 规则集</h2><p>pro 内置了 fabric 作为了编码规范，fabric 提供了严格但是不严苛的 lint 规则集，包含&nbsp;<a href="https://cn.eslint.org/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">eslint</a>，<a href="https://stylelint.io/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">stylelint</a>，<a href="https://prettier.io/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">prettier&nbsp;</a>三种工具，可以显著的提升代码质量，规范代码风格。</p><h2><a href="https://www.typescriptlang.org/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">TypeScript</a>&nbsp;带类型的 JavaScript</h2><p>TypeScript 是 javascript 的超集，TypeScript 不仅包含&nbsp;<a href="https://zh.wikipedia.org/wiki/JavaScript" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">JavaScript</a>&nbsp;的语法，同时还提供了静态类型检查和更完善的代码提示功能。任何现有的 JavaScript 程序都是合法的 TypeScript 程序，只需要简单的学习，就可以获得更佳的开发体验。</p><h2><a href="https://ant.design/index-cn" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">Ant Design</a>&nbsp;前端组件库</h2><p>Ant Design 是一套企业级 UI 设计语言和 React 组件库。作为西湖区最好的组件库，它极大的提升了中后台开发的效率，广受国内外开发者的喜爱。</p><h2><a href="https://charts.ant.design/zh-CN" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">Ant Design Chart</a>简单好用的 React 图表库</h2><p>Ant Design Charts 是开箱即用、易于配置、具有良好视觉和交互体验的通用统计图表库，基于 g2 的高交互可视化图形语法的同时预设了配置，一个组件即可实现多种复杂的图表。</p><h2><a href="https://procomponents.ant.design/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">ProComponents</a>&nbsp;模板组件</h2><p>ProComponents 相比于 Ant Design 更加标准化，作为模板组件一个组件就可以搭建一个页面，在牺牲部分自由度的情况下， 让 CRUD 的效率百倍提升。如果你的项目中表格和表单占主导，那么推荐使用 ProComponents 来完成开发。</p><h2><a href="https://umijs.org/zh-CN/plugins/plugin-initial-state" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">useModel 简易数据流</a></h2><p>简易数据流一种基于 hooks 范式的简易数据管理方案（部分场景可以取代 dva），通常用于中台项目的全局共享数据。在中后台开发中我们往往不需要共享很多数据，只需要用户信息或者后端下发的部分数据，简易数据流和初始化数据即可解决百分之 90 的场景，使用起来成本更低，更佳自然。</p><h2>运行时和编译时</h2><p>Pro 的底座基于 umi， umi 与 webpack 相比增加了运行时相关的能力，我们在开发中有时候可能难以区分。</p><ul><li>编译时指的是代码在编译的时候做的事情，这个阶段的环境一般是 node 环境，可以使用 fs，path 等功能。但是同时因为没有使用 webpack ，所以 jsx，引入图片等非 node 的能力是无法使用的。</li><li>运行时是指代码已经编译完成开始运行的阶段，这个阶段一般是浏览器环境，不能使用 fs，path 等功能，访问 url 也会有跨域的问题，但是这个环境被 webpack 编译过，所以可以写 jsx，导入图片等功能。</li></ul><p>以上两个环境用起来容易混淆，这里有一个简单的版本，src 文件夹中都是运行时的代码，都会经过 webpack 编译。其他目录的都可以认为是编译时，可以使用 node 能力。这也是为什么我们不能在 config.ts 里面写 JSX 的原因。</p><h2>Umi 的插件</h2><p>Pro 的底座是 umi，umi 是一个 webpack 之上的整合工具。 umi 相比于 webpack 增加了运行时的能力，同时帮助我们配置了很多 webpack 的预设。也减少了 webpack 升级导致的问题。这也是我们为了还能提供插件的原因。</p><ul><li><a href="https://umijs.org/plugins/plugin-access" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-access</a>，权限管理</li><li><a href="https://umijs.org/plugins/plugin-analytics" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-analytics</a>，统计管理</li><li><a href="https://umijs.org/plugins/plugin-antd" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-antd</a>，整合 antd UI 组件</li><li><a href="https://umijs.org/plugins/plugin-initial-state" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-initial-state</a>，初始化数据管理</li><li><a href="https://umijs.org/plugins/plugin-layout" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-layout</a>，配置启用 ant-design-pro 的布局</li><li><a href="https://umijs.org/plugins/plugin-locale" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-locale</a>，国际化能力</li><li><a href="https://umijs.org/plugins/plugin-model" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-model</a>，基于 hooks 的简易数据流</li><li><a href="https://umijs.org/plugins/plugin-request" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">plugin-request</a>，基于 umi-request 和 umi-hooks 的请求方案</li></ul><p>如果不喜欢 umi 默认的配置，可以在这里看看有没有你喜欢的<a href="https://umijs.org/config" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">配置</a>。如果还是不能满足就要自定义 webpack 了，<a href="https://umijs.org/config#chainwebpack" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">chainWebpack</a>&nbsp;可以自定义 内置的 webpack 配置。</p><p>webpack 对于 node 也是有版本需求的，不同 webpack 对 node 版本的依赖也不同，所以最好的办法是升级到最新的<a href="https://nodejs.org/en/" rel="noopener noreferrer" target="_blank" style="color: rgb(24, 144, 255);">长期维护版本</a>。</p>',
      tags: ['Ant Design Pro'],
      star: Math.floor(Math.random() * 100),
      like: Math.floor(Math.random() * 100),
    },
    {
      key: 51,
      title: '路由和菜单',
      author: 'admin',
      authorKey: 51,
      type: '1',
      views: 51,
      updateAt: new Date().getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
      content:
        '<p>路由和菜单是组织起一个应用的关键骨架，pro 中的路由为了方便管理，使用了中心化的方式，在&nbsp;config.ts&nbsp;统一配置和管理。</p><h2>基本结构</h2><p>在这一部分，脚手架通过结合一些配置文件、基本算法及工具函数，搭建好了路由和菜单的基本框架，主要涉及以下几个模块/功能：</p><ul><li>路由管理&nbsp;通过约定的语法根据在&nbsp;config.ts&nbsp;中配置路由。</li><li>菜单生成&nbsp;根据路由配置来生成菜单。菜单项名称，嵌套路径与路由高度耦合。</li><li>面包屑&nbsp;组件&nbsp;PageContainer&nbsp;中内置的面包屑,也可通过&nbsp;RouteContext&nbsp;提供的信息自定义生成。</li></ul><h2>路由</h2><p>目前脚手架中所有的路由都通过&nbsp;config.ts&nbsp;来统一管理，在 umi 的配置中我们增加了一些参数，如&nbsp;name，icon，hideChildrenInMenu，authority，来辅助生成菜单。其中：</p><ul><li>name&nbsp;和&nbsp;icon分别代表生成菜单项的文本和图标。项目使用Ant Design 图标，填入对应的图标名称即可使用。</li><li>hideChildrenInMenu&nbsp;用于隐藏不需要在菜单中展示的子路由。用法可以查看&nbsp;分步表单&nbsp;的配置。</li><li>hideInMenu&nbsp;可以在菜单中不展示这个路由，包括子路由。</li><li>authority&nbsp;用来配置这个路由的权限，如果配置了将会验证当前用户的权限，并决定是否展示。</li></ul><h2>菜单</h2><p>菜单根据&nbsp;config.ts&nbsp;生成。如果你的项目并不需要菜单，你可以在&nbsp;src/layouts/BasicLayout.tsx&nbsp;中设置&nbsp;menuRender={false}。</p><p><br></p><h3><br></h3>',
      tags: ['Ant Design Pro'],
      star: Math.floor(Math.random() * 100),
      like: Math.floor(Math.random() * 100),
    },
    {
      key: 52,
      title: 'Umi 是什么？',
      author: 'admin',
      authorKey: 51,
      type: '1',
      views: 52,
      updateAt: new Date().getTime() - Math.floor(Math.random() * 10) * 24 * 60 * 60 * 1000,
      content:
        '<p>Umi，中文可发音为<strong>乌米</strong>，是可扩展的企业级前端应用框架。Umi 以路由为基础的，同时支持配置式路由和约定式路由，保证路由的功能完备，并以此进行功能扩展。然后配以生命周期完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求。</p><p>Umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 3000+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等。他已经很好地服务了我们的内部用户，同时希望他也能服务好外部用户。</p><p>它主要具备以下功能：</p><ul><li>🎉&nbsp;<strong>可扩展</strong>，Umi 实现了完整的生命周期，并使其插件化，Umi 内部功能也全由插件完成。此外还支持插件和插件集，以满足功能和垂直域的分层需求。</li><li>📦&nbsp;<strong>开箱即用</strong>，Umi 内置了路由、构建、部署、测试等，仅需一个依赖即可上手开发。并且还提供针对 React 的集成插件集，内涵丰富的功能，可满足日常 80% 的开发需求。</li><li>🐠&nbsp;<strong>企业级</strong>，经蚂蚁内部 3000+ 项目以及阿里、优酷、网易、飞猪、口碑等公司项目的验证，值得信赖。</li><li>🚀&nbsp;<strong>大量自研</strong>，包含微前端、组件打包、文档工具、请求库、hooks 库、数据流等，满足日常项目的周边需求。</li><li>🌴&nbsp;<strong>完备路由</strong>，同时支持配置式路由和约定式路由，同时保持功能的完备性，比如动态路由、嵌套路由、权限路由等等。</li><li>🚄&nbsp;<strong>面向未来</strong>，在满足需求的同时，我们也不会停止对新技术的探索。比如 dll 提速、modern mode、webpack@5、自动化 external、bundler less 等等。</li></ul><h2>什么时候不用 umi？</h2><p>如果你，</p><ul><li>需要支持 IE 8 或更低版本的浏览器</li><li>需要支持 React 16.8.0 以下的 React</li><li>需要跑在 Node 10 以下的环境中</li><li>有很强的 webpack 自定义需求和主观意愿</li><li>需要选择不同的路由方案</li></ul><p>Umi 可能不适合你。</p>',
      tags: ['Umi'],
      star: Math.floor(Math.random() * 100),
      like: Math.floor(Math.random() * 100),
    },
  ];

  tableListDataSource.push(...adminArticleList);
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
    dataSource = dataSource.filter((data) => data.key == params.key);
  }
  if (params.authorKey) {
    dataSource = dataSource.filter((data) => data.authorKey == params.authorKey);
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
