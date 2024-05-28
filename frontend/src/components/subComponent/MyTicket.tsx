import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CommentOutlined, ProductOutlined,FileProtectOutlined,SafetyCertificateOutlined,FileExclamationOutlined,CreditCardOutlined,PlusCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Badge, Button, FloatButton, Form, FormProps, Input, InputRef, Modal, Space, Switch, Table, TableColumnType, TableColumnsType, Tag, message } from 'antd';
import { FilterDropdownProps, TableRowSelection } from "antd/es/table/interface"
import Highlighter from 'react-highlight-words';
import axios from "axios";
interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
    description: string;
    tags:string[];
    id?:number
    email?:string;
    answer_status?:boolean;
    user?:string
  }
  type FieldType2 = {
    description?:string;
    ticket?:number;
    user?:string|null;
  };
  type DataIndex = keyof DataType;
const MyTicket = () =>{
    const [isAdmin, setIsAdmin] = useState(false);
    const [adminMode, setAdminMode] = useState(false)
    const [selectedRows, setSelectedRows] = useState<React.Key[]>([])
    const [viewTag,setViewTag]=useState<any>()
    const [ticketAnswers, setTicketAnswer] = useState<any[]>([])
    let tags:any;
    let users:any;
    const [data, setData] = useState<DataType[]>([])
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const onChange = () => {
      setAdminMode(!adminMode);
      adminMode?message.info('admin Mode disable'):message.info('admin Mode enable')
    };
    const colors = ["Red", "Orange", "Yellow", "Green", "Blue", "Violet", "Gray", "Black", "Brown"];
    const [tickets,setTickets] = useState([])
    function getRandomColor() {
      const index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }
    const deleteTag = async(id:number|undefined)=>{
      console.log(id)
      await axios.delete('http://localhost:8000/ticket/'+id+'/').then(
        message.success('message deleted successfuly')
      )
      axios.get('http://localhost:8000/tags/').then((re)=>{
              tags = re.data
            })
            axios.get('http://localhost:8000/user/').then((re)=>{
              users = re.data
            })
      axios.get('http://localhost:8000/ticket/').then((res)=>{
              let d:any =[]
              res.data.map(async(r:any)=>{
                let x:any = {}
                x.description = r.description
                x.key = r.id
                x.rank = r.rank
                x.tags = r.tags.map((e:any)=>{
                  return tags.find((y:any)=>y.id===e).name
                })
                x.user = users.find((u:any)=>u.id===r.user).email
                x.id = r.id
                d.push(x)
              })
              setData(d)
              setTickets(res.data)
            })
            axios.get('http://localhost:8000/user/').then((re)=>{
              users = re.data
            })
    }
   

    
    const rowSelection: TableRowSelection<DataType> = {
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRows(selectedRowKeys)
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // onSelect: (record, selected, selectedRows) => {
        //   console.log(record, selected, selectedRows);
        // },
        // onSelectAll: (selected, selectedRows, changeRows) => {
        //   console.log(selected, selectedRows, changeRows);
        // },
      };
      
    useEffect (()=>{
        try {
            if(localStorage.getItem('user')===''||localStorage.getItem('user')===null){
              navigate('/login')
            }
            localStorage.getItem('type')
            axios.get('http://localhost:8000/tags/').then((re)=>{
              tags = re.data
            })
            axios.get('http://localhost:8000/user/').then((re)=>{
              users = re.data
            })
            let admres:any;
            axios.get('http://localhost:8000/adminresponse/').then((res)=>{
              let d:any =[]
              res.data.map(async(r:any)=>{
                let x:any = {}
                x.description = r.description
                x.key = r.id
                x.user = users?.find((u:any)=>u.id===r.user).email
                x.id = r.id
                x.email = users?.find((u:any)=>u.id===r.user).email
                x.ticket  = r.ticket
                d.push(x)
              })
              admres= d;
              setTicketAnswer(d)
            axios.get('http://localhost:8000/ticket/').then((res)=>{
              let d:any =[]
              res.data.map(async(r:any)=>{
                if(localStorage.getItem('user')===users.find((u:any)=>u.id===r.user)?.email){let x:any = {}
                x.description = r.description
                x.key = r.id
                x.rank = r.rank
                x.tags = r.tags.map((e:any)=>{
                  return tags.find((y:any)=>y.id===e).name;
                })

                x.user = users?.find((u:any)=>u.id===r.user).email;
                x.id = r.id;
                x.email = users?.find((u:any)=>u.id===r.user).email;
                d.push(x)}
              })
              setData(d)
              setTickets(res.data)
            })
           
            })
        } catch {
            navigate('/login')
        }
        localStorage.getItem('type')==='admin'?setIsAdmin(true):setIsAdmin(false)
        // setData(data1)
    },[navigate])
    useEffect(()=>{
        
    },[data])
    const [answer,setAnswer] = useState(false)
    const onFinish2: FormProps<FieldType2>['onFinish'] = async (values) => {
      console.log(values)
      values.ticket = viewTag
      values.user = localStorage.getItem('user')
      await axios.post('http://localhost:8000/adminresponse/', values).then((res)=>{
        if(!res)
        message.error('answer couldn\'t be created $')
        if(res.status===201){
          message.success('Ticket answered successfully');
          // navigate('/')
          setViewTag(null);
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
      axios.get('http://localhost:8000/adminresponse/').then((res)=>{
              let d:any =[]
              res.data.map(async(r:any)=>{
                let x:any = {}
                x.description = r.description
                x.key = r.id
                x.user = users?.find((u:any)=>u.id===r.user).email
                x.id = r.id
                x.email = users?.find((u:any)=>u.id===r.user).email
                x.ticket  = r.ticket
                d.push(x)
              })
              setTicketAnswer(d);}
            ).catch((error)=>{
                if(!error)
                message.error(`Could'nt connect to the server `)
                else
                message.error(JSON.stringify(error.response.data))
              })
    };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
   
    const handleSearch = async(
      selectedKeys: string[],
      confirm: FilterDropdownProps['confirm'],
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
      let txt = selectedKeys[0];
      let clm:any = dataIndex;
      let model:any = 'ticket';
      switch (clm.toLowerCase()) {
        case 'tags':
          model = 'tags';
          break;
        case 'created by':
          model = 'user';
          break;
        default:
          model='ticket'
          break;
      }
      await axios.get('http://localhost:8000/'+model+'/?search='+txt).then((res)=>{
        switch (clm.toLowerCase()) {
          case 'tags':
            model = 'tags';
            break;
          case 'created by':
            
            break;
          default:
            let d:any =[]
            res.data.map(async(r:any)=>{
              let x:any = {}
              x.description = r.description
              x.key = r.id
              x.rank = r.rank
              x.tags = r.tags.map((e:any)=>{
                return tags?.find((y:any)=>y.id===e)?.name;
              })
              x.user = users?.find((u:any)=>u.id===r.user).email;
              x.id = r.id;
              x.email = users?.find((u:any)=>u.id===r.user).email;
              d.push(x)
            })
            setData(d)
            break;
        }
        console.log(res)
      }).catch((error)=>{
        message.error('Search Failed')
      })
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
      let f:any[] = []

      tickets.map(async(r:any)=>{
        let x:any = {}
        x.description = r.description
        x.key = r.id
        x.rank = r.rank
        x.tags = r.tags.map((e:any)=>{
          return tags?.find((y:any)=>y.id===e)?.name;
        })
        x.user = users?.find((u:any)=>u.id===r.user).email;
        x.id = r.id;
        x.email = users?.find((u:any)=>u.id===r.user).email;
        f.push(x)
      })
      setData(f)
    };
  
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              // icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record:any) =>
        record&&record[dataIndex]
          ?.toString()
          ?.toLowerCase()
          ?.includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });

 
    const columns: TableColumnsType<DataType> = [
      Table.SELECTION_COLUMN,
      { title: 'Description', dataIndex: 'description', key: 'description',...getColumnSearchProps('description'), },
      Table.EXPAND_COLUMN,
      { title: 'rank', dataIndex: 'rank', key: 'rank',
      sorter: (a, b) => a.address.length - b.address.length,
      sortDirections: ['descend', 'ascend'],
       },
      { title: 'Tags', dataIndex: 'tags', key: 'tags',
      ...getColumnSearchProps('tags'),
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            return (
              <Tag color={getRandomColor()} key={tag}>
                {tag?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
       },
       {title:'Answer Status',dataIndex: 'answer_status',key:'answer_status',
       render: (_,obj:any) => (
        ticketAnswers.find((t:any)=>t.ticket===obj.id)?(<Badge status="success" text="Answered" />)
        :<Badge status="default" text="Unanswered" />
      ),
       },
      { title: 'Created By', dataIndex: 'user', key: 'user',
      //  ...getColumnSearchProps('user'),
       },
      {
        title: 'Action',
        key: 'action',
        render: (_,record) => (
          <Space size="middle">
            <Button type="text" onClick={()=>setViewTag(record.id)}>
              <a>View Ticket</a>
            </Button>
            {adminMode&&<Button type="text" onClick={()=>deleteTag(record.id)}>
              Delete
            </Button>}
          </Space>
        ),
      },
    ];

    return (
        <>
            <div id="menu">
                <FloatButton.Group
                    trigger="hover"
                    type="primary"
                    style={{ right: 94 }}
                    icon={<ProductOutlined />}
                >
                    <FloatButton icon={<CreditCardOutlined />} tooltip={<div>My Tickets</div>}
                      onClick={()=>navigate('/myTicket')}
                    />
                    <FloatButton icon={<FileExclamationOutlined />} tooltip={<div>Unanswered Tickets</div>}
                      onClick={()=>navigate('/unansweredTicket')}
                    />
                    <FloatButton icon={<FileProtectOutlined />} tooltip={<div>Answered Tickets</div>}
                      onClick={()=>navigate('/answeredTicket')}
                    />
                    <FloatButton icon={<CommentOutlined />} tooltip={<div>All Tickets</div>}
                      onClick={()=>navigate('/')}
                    />
                    <FloatButton icon={<PlusCircleOutlined />} tooltip={<div>Create a ticket</div>}
                      onClick={()=>navigate('/createTicket')}
                    />
                    <FloatButton 
                        icon={<SafetyCertificateOutlined />} 
                        tooltip={adminMode?<div>Admin Mode is on </div>:<div>Admin Mode is off</div>}
                        onClick={onChange}
                    />
                </FloatButton.Group>
            </div>
            <div id="body">
                <Table
                    columns={columns}
                    rowSelection={{...rowSelection,}}
                    expandable={{
                      expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
                    }}
                    dataSource={data}
                />
                {viewTag&&<Modal
                  title="Ticket Content"
                  open={true}
                  onCancel={()=>setViewTag(null)}
                  okButtonProps={{ disabled: true, }}
                  cancelButtonProps={{ disabled: false }}
                >
                  {
                    data.find((t:any)=>t.id===viewTag)?.description
                  }
                  {ticketAnswers.map((t)=>{
                        if(t.ticket===viewTag){
                          return <div>Answer: {t.description}</div>
                        }else
                        return <div></div>
                      })}
                  {adminMode&&(
                    <div>
                      
                      <hr />
                      <Button type="text" onClick={()=>setAnswer(true)}>
                      Answer the ticket
                      </Button>
                      {answer&&(
                        <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish2}
                        // onFinishFailed={onFinishFailed}
                        autoComplete="off"
                      >
                      <Form.Item<FieldType2>
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input your Description!' }]}
                      >
                          <Input.TextArea showCount style={{height:100}}  />
                      </Form.Item>
                      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                              Submit
                            </Button>
                          </Form.Item>
                      </Form>
                      )}
                    </div>
                  )
                  }
                  <Tag color={getRandomColor()}>By {data.find((t:any)=>t.id===viewTag)?.email}</Tag>
                </Modal>}
            </div>
        </>
    )   
}

export default  MyTicket