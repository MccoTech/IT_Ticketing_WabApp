import type { FormProps } from 'antd';
import { Button, Card, Checkbox, Form, Input, Space, message } from 'antd';
import axios from 'axios';

type FieldType = {
    email?: string;
    first_name?:string;
    last_name?:string;
    password?: string;
  };
  
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    await axios.post('http://localhost:8000/register/', values).then((res)=>{
      if(!res)
      message.error('Account couldn\'t be created $')
      if(res.status===201)
      message.success('Account created successfully')
      else
        message.error(res.data)
    }
    ).catch((error)=>{
      if(!error)
      message.error(`Could'nt connect to the server `)
      else
      message.error(JSON.stringify(error.response.data))
    })
  };
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const Register = () =>{
    return ((
        <center>
        <Space direction="vertical" size={16}>
           <Card title="Register" style={{ width: 300 }}>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="first_name"
          rules={[{ required: true, message: 'Please input your name!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Surname"
          name="last_name"
          rules={[{ required: true, message: 'Please input your surname!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input />
        </Form.Item>
    
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>
    
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <span>Already have an account? <a href="http://localhost:3000/login">login</a></span>
      </Card>
      </Space>
      </center>

    ))
}
export default Register