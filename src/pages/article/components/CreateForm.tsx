import React, { useState } from 'react';
import { Form, Button, Modal, Input, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface CreateFormProps {
  onCancel: (flag?: boolean, formVals?: API.ArticleListParams) => void;
  onSubmit: (values: API.ArticleListParams) => void;
  createModalVisible: boolean;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 },
};

const CreateForm: React.FC<CreateFormProps> = (props) => {
  const [form] = Form.useForm();

  const { onSubmit: handleCreate, onCancel: handleModalVisible, createModalVisible } = props;

  const [text, handleText] = useState<string>('');

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    const content = {content: text};
    handleCreate({ ...fieldsValue, ...content });
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
        <FormItem
          label="内容"
        >
          <ReactQuill value={text} onChange={handleText} />
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
      width={'100%'}
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

export default CreateForm;
