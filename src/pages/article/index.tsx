import { PlusOutlined, StarTwoTone, LikeTwoTone, EyeTwoTone } from '@ant-design/icons';
import { Button, message, Space, Tag, Popconfirm } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import UpdateForm from './components/UpdateForm';
import CreateForm from './components/CreateForm';
import { useAccess, history } from 'umi';
import moment from 'moment';

import {
  queryArticle,
  updateArticle,
  addArticle,
  removeArticle,
} from '@/services/ant-design-pro/api';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: API.ArticleListParams) => {
  const hide = message.loading('正在添加');

  try {
    await addArticle({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: API.ArticleListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeArticle({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

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
      tags: fields.tags,
    });
    hide();

    message.success('修改成功');
    return true;
  } catch (error) {
    hide();
    message.error('修改失败请重试！');
    return false;
  }
};

const ArticleTableList: React.FC = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.ArticleListItem[]>([]);
  const [currentRow, setCurrentRow] = useState<API.ArticleListItem>();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState<boolean>(false);
  const access = useAccess();

  const columns: ProColumns<API.ArticleListItem>[] = [
    {
      title: '标题',
      dataIndex: 'title',
      render: (title, record) => {
        return (
          <a
            onClick={() => {
              history.push({
                pathname: '/content',
                query: {
                  key: record.key.toString(),
                },
              });
            }}
          >
            {title}
          </a>
        );
      },
    },
    {
      title: '作者',
      dataIndex: 'author',
      hideInForm: true,
      search: false,
    },
    {
      title: '标签',
      dataIndex: 'tags',
      search: false,
      render: (_, record) => (
        <Space>
          {record.tags?.map((item) => (
            <Tag>{item}</Tag>
          ))}
        </Space>
      ),
    },

    {
      title: '类别',
      dataIndex: 'type',
      filters: true,
      search: false,
      hideInForm: true,
      valueEnum: {
        '0': {
          text: '原创',
          status: 'Processing',
        },
        '1': {
          text: '转载',
          status: 'Default',
        },
      },
    },
    {
      title: '浏览量',
      sorter: true,
      dataIndex: 'views',
      hideInForm: true,
      search: false,
      render: (dom) => (
        <Space>
          <EyeTwoTone />
          {dom}
        </Space>
      ),
    },
    {
      title: '点赞',
      sorter: true,
      dataIndex: 'like',
      hideInForm: true,
      search: false,
      render: (dom) => (
        <Space>
          <LikeTwoTone />
          {dom}
        </Space>
      ),
    },
    {
      title: '收藏',
      sorter: true,
      dataIndex: 'star',
      hideInForm: true,
      search: false,
      render: (dom) => (
        <Space>
          <StarTwoTone />
          {dom}
        </Space>
      ),
    },
    {
      title: '上次修改时间',
      sorter: true,
      dataIndex: 'updateAt',
      hideInForm: true,
      search: false,
      renderText: (text) => moment(text).format('YYYY-MM-DD HH:MM:SS'),
    },
    {
      title: '内容',
      sorter: true,
      dataIndex: 'content',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (access.canAdmin || record.author === 'user') {
          return [
            <a
              key="config"
              onClick={() => {
                setCurrentRow(record);
                handleUpdateModalVisible(true);
              }}
            >
              修改
            </a>,
            <Popconfirm
              title="确定进行删除操作？"
              okText="是"
              cancelText="否"
              onConfirm={() => {
                // @ts-ignore
                handleRemove([{ key: record.key }]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              <a key="config">删除</a>
            </Popconfirm>,
          ];
        }
        return '无此权限';
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.ArticleListItem, API.PageParams>
        headerTitle="文章表格"
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              handleModalVisible(true);
            }}
          >
            <PlusOutlined /> 新建
          </Button>,
        ]}
        request={(params, sorter, filter) => queryArticle({ ...params, sorter, filter })}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}
              >
                {selectedRowsState.length}
              </a>{' '}
              项
            </div>
          }
        >
          <Popconfirm
            visible={deleteConfirmVisible}
            title="确定进行删除操作？"
            okText="是"
            cancelText="否"
            onConfirm={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              setDeleteConfirmVisible(false);
              actionRef.current?.reloadAndRest?.();
            }}
            onCancel={() => {
              setDeleteConfirmVisible(false);
            }}
          ></Popconfirm>
          <Button
            type="primary"
            onClick={() => {
              setDeleteConfirmVisible(true);
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <CreateForm
        onSubmit={async (value) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
        onCancel={() => {
          handleModalVisible(false);
        }}
        createModalVisible={createModalVisible}
      />
      {currentRow && Object.keys(currentRow).length ? (
        <UpdateForm
          onSubmit={async (value) => {
            const success = await handleUpdate(value);
            if (success) {
              handleUpdateModalVisible(false);
              setCurrentRow(undefined);
              if (actionRef.current) {
                actionRef.current.reload();
              }
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setCurrentRow(undefined);
          }}
          updateModalVisible={updateModalVisible}
          values={currentRow || {}}
        />
      ) : null}
    </PageContainer>
  );
};

export default ArticleTableList;
