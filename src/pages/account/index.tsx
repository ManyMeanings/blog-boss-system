import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Space, Avatar } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import UpdateForm from './components/UpdateForm';
import { queryRule, updateRule, addRule, removeRule } from '@/services/ant-design-pro/api';
import { useAccess, history } from 'umi';
import moment from 'moment';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: API.AccountListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
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

const handleRemove = async (selectedRows: API.AccountListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
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
const handleUpdate = async (fields: API.AccountListParams) => {
  const hide = message.loading('正在修改');
  try {
    await updateRule({
      name: fields.name,
      key: fields.key,
      location: fields.location,
      avatar: fields.avatar,
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

const Account: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<API.AccountListItem[]>([]);
  const [currentRow, setCurrentRow] = useState<API.AccountListItem>();
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const access = useAccess();

  const columns: ProColumns<API.AccountListItem>[] = [
    {
      title: '用户名',
      dataIndex: 'name',
      render: (dom, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <a
            onClick={() => {
              history.push({
                pathname: '/center',
                query: {
                  key: record.key.toString(),
                },
              });
            }}
          >
            {dom}
          </a>
        </Space>
      ),
    },
    {
      title: '地址',
      dataIndex: 'location',
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: true,
      search: false,
      hideInForm: true,
      valueEnum: {
        0: {
          text: '在线',
          status: 'Processing',
        },
        1: {
          text: '离线',
          status: 'Error',
        },
      },
    },
    {
      title: '上次登陆时间',
      sorter: true,
      dataIndex: 'lastLoginAt',
      hideInForm: true,
      search: false,
      renderText: (text) => moment(text).format('YYYY-MM-DD HH:MM:SS'),
    },
    {
      title: '活跃度',
      sorter: true,
      dataIndex: 'activity',
      hideInForm: true,
      valueType: 'progress',
      search: false,
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      hideInTable: true,
      search: false,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => {
        if (access.canAdmin) {
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
            <a
              key="config"
              onClick={() => {
                handleRemove([{ key: record.key }]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              删除
            </a>,
          ];
        }
        return '无此权限';
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.AccountListItem, API.PageParams>
        headerTitle="用户表格"
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
        request={(params, sorter, filter) => queryRule({ ...params, sorter, filter })}
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
          <Button
            type="primary"
            onClick={async () => {
              await handleRemove(selectedRowsState);
              setSelectedRows([]);
              actionRef.current?.reloadAndRest?.();
            }}
          >
            批量删除
          </Button>
        </FooterToolbar>
      )}
      <ModalForm
        title="创建用户"
        width="400px"
        visible={createModalVisible}
        onVisibleChange={handleModalVisible}
        onFinish={async (value) => {
          const success = await handleAdd(value as API.AccountListItem);

          if (success) {
            handleModalVisible(false);

            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        <ProFormText
          rules={[
            {
              required: true,
              message: '用户名为必填项',
            },
          ]}
          width="md"
          name="name"
          label="用户名"
        />
        <ProFormText width="md" name="location" label="地址" />
        <ProFormText width="md" name="avatar" label="头像" />
      </ModalForm>
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

export default Account;
