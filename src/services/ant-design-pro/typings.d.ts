// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type AccountListParams = {
    key?: number;
    name?: string;
    status?: number;
    lastLoginAt?: number;
    activity?: number;
    location?: string;
    avatar?: string;
    pageSize?: number;
    currentPage?: number;
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };

  type AccountListItem = {
    key: number;
    name?: string;
    status?: number;
    lastLoginAt?: number;
    activity?: number;
    location?: string;
    avatar?: string;
  };

  type ArticleListParams = {
    key?: number;
    title?: string;
    author?: string;
    authorKey?: number;
    type?: string;
    views?: number;
    updateAt?: number;
    content?: string;
    tags?: string[];
    star?: number;
    like?: number;
    pageSize?: number;
    currentPage?: number;
    filter?: Record<string, any[]>;
    sorter?: Record<string, any>;
  };

  type ArticleListItem = {
    key: number;
    title?: string;
    author?: string;
    authorKey: number;
    type?: string;
    views?: number;
    updateAt?: number;
    content?: string;
    tags?: string[];
    star?: number;
    like?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  export interface VisitDataType {
    x: string;
    y: number;
  }

  export interface SearchDataType {
    index: number;
    keyword: string;
    count: number;
    range: number;
    status: number;
  }

  export interface OfflineDataType {
    name: string;
    cvr: number;
  }

  export interface OfflineChartData {
    x: any;
    y1: number;
    y2: number;
  }

  export interface RadarData {
    name: string;
    label: string;
    value: number;
  }

  export interface AnalysisData {
    visitData: VisitDataType[];
    visitData2: VisitDataType[];
    salesData: VisitDataType[];
    searchData: SearchDataType[];
    typeData1: VisitDataType[];
    typeData2: VisitDataType[];
    radarData: RadarData[];
  }

  export interface TagType {
    name: string;
    value: string;
    type: string;
  }
}
