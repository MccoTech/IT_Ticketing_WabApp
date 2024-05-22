import type { FormProps } from 'antd';
import { Button, Card, Checkbox, Form, Input, Space, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type FieldType = {
    email?: string;
    password?: string;
    username?:string;
  };
  
  
  
  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

const Login = () =>{
    const navigate = useNavigate()
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        values.username =  values.email
        await axios.post('http://localhost:8000/login/', values).then((res)=>{
          if(!res)
          message.error('Account couldn\'t be created')
          message.success('You are login')
          setTimeout(() => {
            navigate('/')
            localStorage.setItem('user',res.data.user)
            localStorage.setItem('type',res.data.type)
          }, 2000);
        }
        ).catch((error)=>{
          if(!error)
          message.error(`Could'nt connect to the server `)
          else
          message.error(JSON.stringify(error.response.data))
        })
      };
    return ((
        <center>
        <Space direction="vertical" size={16}>
           <Card title="Login" style={{ width: 300 }}>
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
      <span>Don't have an account? <a href="http://localhost:3000/register">Signup</a></span>
      </Card>
      </Space>
      </center>

    ))
}
export default Login