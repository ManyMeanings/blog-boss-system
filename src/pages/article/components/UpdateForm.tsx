import React, { useState } from 'react';
import { Form, Button, Modal, Input, Select } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: API.ArticleListParams) => void;
  onSubmit: (values: API.ArticleListParams) => void;
  updateModalVisible: boolean;
  values: API.ArticleListParams;
}
const FormItem = Form.Item;

const formLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 13 },
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const [form] = Form.useForm();

  const {
    onSubmit: handleUpdate,
    onCancel: handleUpdateModalVisible,
    updateModalVisible,
    values,
  } = props;
  // @ts-ignore
  const [text, handleText] = useState<string>(props.values.content);

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    const content = {content: text};
    handleUpdate({ ...values, ...fieldsValue, ...content });
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
              message: '请输入标题！',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem
          name="type"
          label="类型"
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
        <FormItem label="内容">
          <ReactQuill value={text} onChange={handleText} />
        </FormItem>
      </>
    );
  };

  const renderFooter = () => {
    return (
      <>
        <Button onClick={() => handleUpdateModalVisible(false, values)}>取消</Button>
        <Button type="primary" onClick={() => submit()}>
          完成
        </Button>
      </>
    );
  };

  return (
    <Modal
      width={750}
      bodyStyle={{ padding: '30px' }}
      title="修改"
      visible={updateModalVisible}
      footer={renderFooter()}
      onCancel={() => handleUpdateModalVisible()}
      destroyOnClose
    >
      <Form
        {...formLayout}
        form={form}
        initialValues={{
          title: props.values.title,
          type: props.values.type,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
