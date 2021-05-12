import React from 'react';
import { Form, Button, Modal, Input } from 'antd';

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: API.AccountListParams) => void;
  onSubmit: (values: API.AccountListParams) => void;
  updateModalVisible: boolean;
  values: API.AccountListParams;
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

  const submit = async () => {
    const fieldsValue = await form.validateFields();
    handleUpdate({ ...values, ...fieldsValue });
  };

  const renderContent = () => {
    return (
      <>
        <FormItem
          name="name"
          label="用户名"
          rules={[
            {
              required: true,
              message: '请输入用户名！',
            },
          ]}
        >
          <Input />
        </FormItem>
        <FormItem name="location" label="地址">
          <Input />
        </FormItem>
        <FormItem name="avatar" label="头像">
          <Input />
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
      width={640}
      bodyStyle={{ padding: '32px 40px 48px' }}
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
          name: props.values.name,
          location: props.values.location,
          avatar: props.values.avatar,
        }}
      >
        {renderContent()}
      </Form>
    </Modal>
  );
};

export default UpdateForm;
