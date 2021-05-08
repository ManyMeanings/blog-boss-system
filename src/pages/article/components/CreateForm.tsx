import React from 'react';
import { Form, Button, Modal, Input, Select } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: API.ArticleListParams) => void;
  onSubmit: (values: API.ArticleListParams) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit: handleCreate, onCancel: handleModalVisible, createModalVisible } = props;

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    handleCreate({ ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="title"
          label="标题"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="type"
          label="类型"
          initialValue="0"
          rules={[
            {
              required: true,
              message: '请选择类型！',
            },
          ]}
        >
          <Select>
            <Select.Option value="0">原创</Select.Option>
            <Select.Option value="1">转载</Select.Option>
          </Select>
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleModalVisible(false)}>取消</Button>
        <Button type="primary" onClick={() => submit()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
      title="创建文章"
      visible={createModalVisible}
      footer={renderFooter()}
      onCancel={() => handleModalVisible()}
      destroyOnClose
    >
      <Form {...formLayout} form={form} initialValues={{}}>
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
