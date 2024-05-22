import { Button, Card, Divider, Form, FormProps, Input, InputRef, Select, SelectProps, Space, Tag, message } from "antd"
import axios from "axios";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

type FieldType = {
    email: string|null;
    description?:string;
    tags?:string[];
  };
  type TagRender = SelectProps['tagRender'];
  let index = 0;
const CreateTicket = ()=>{
    const navigate = useNavigate()
const [items, setItems] = useState(['red', 'green']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log(values)
    values.email = localStorage.getItem('user')
    await axios.post('http://localhost:8000/ticket/', values).then((res)=>{
      if(!res)
      message.error('Ticket couldn\'t be created $')
      if(res.status===201){
        message.success('Ticket created successfully')
        navigate('/')
      }
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
    return (<div>
        <center>
        <Space direction="vertical" size={16}>
           <Card title="Create a ticket" style={{ width: 600,marginTop:50 }}>
        <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input your Description!' }]}
        >
            <Input.TextArea showCount style={{height:100}}  />
        </Form.Item>
    <div id="tags">
    <Form.Item<FieldType>
          label="Select Tag(s)"
          name="tags"
        >
            <Select
      style={{ width: 300 }}
      placeholder="Select Some Tags"
      mode="tags"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter a new tag"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
            />
            <Button type="text" onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />

    </Form.Item>
    
    </div>
    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
    </Form>
    
    </Card>
    </Space>
    </center>
    </div>)
}

export default CreateTicket