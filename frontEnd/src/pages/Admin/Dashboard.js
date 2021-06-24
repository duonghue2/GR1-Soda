import React from 'react';
import { Menu, Row, Popover, Table, Space, Input, message, Image, Button, Pagination } from 'antd';
import { DeleteOutlined, UserOutlined, EditOutlined, CheckOutlined, SaveOutlined } from '@ant-design/icons'
import { reactLocalStorage } from 'reactjs-localstorage';
import { server } from '../../enviroment'
import axios from 'axios'
import logo from '../../assests/logo.png'
const { Search } = Input;
const content = ({ data, logout }) => {

    return (
        <div>
            <Row style={{ fontWeight: 'bold' }}>{data.userName} </Row>
            <Row>{data.email}</Row>
            <Row>{data.phone}</Row>
            <Row onClick={e => { e.preventDefault(); window.location = '/history' }} style={{ cursor: 'pointer' }}>History</Row>
            <Row><i onClick={e => logout(e)} style={{ color: '#FACC2E', cursor: 'pointer' }}>Log out</i></Row>
        </div>
    )
}
class Dashboard extends React.Component {
    state = {
        current: "order",
        visible: false,
        products: [],
        orders: [],
        index: 0,
        isEdit: [],
        total: 0,
        loading: false

    };
    logout = (e) => {
        //  e.preventDefault();
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('userInfo');
        message.success("log out succesfully!");
        window.location = "/";
    }
    handleClick = e => {

        this.setState({ current: e.key });
        this.getData();
    };
    getData = async () => {
        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        if (userId) {
            this.state.index = this.state.index + 1;
            let payload = {
                token, userId,
                pageSize: 20,
                currentPage: this.state.index,
                state: 'pending'
            }
            // if (this.state.current == 'product') axios.post(server + 'api/ProductDetails/admin', payload).then(resp => {
            //     console.log(resp)
            //     this.state.products = resp.data.data != null ? resp.data.data : [];
            //     this.state.total = resp.data.data != null ? resp.data.total : 0;
            //     this.setState(this.state)
            // }).catch(e => {
            //     throw e;
            // });
            // else 
            axios.post(server + 'api/Orders/list-order', payload).then(resp => {
                console.log(resp)
                this.state.orders = resp.data.data != null ? resp.data.data : [];
                this.state.total = resp.data.data != null ? resp.data.total : 0;
                this.setState(this.state)
            }).catch(e => {
                throw e;
            });
        }
    }
    componentDidMount() {
        this.getData()
        // Array.apply(null, Array(3)).map(String.prototype.valueOf, "hi")
    }

    setVisible = (e) => {
        this.setState({
            visible: e
        })
    }
    onSearch = (e) => {
        window.location = "/admin/search/" + e;
    }
    delete = () => { }
    submit = () => { }
    edit = (record) => {
        this.state.isEdit[record] = true;
        this.setState(this.state);
    }
    update = () => {

    }
    render() {
        let userInfo = reactLocalStorage.get("token");
        // if (!userInfo.isAdmin) window.location = "/";
        const columnProduct = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                sorter: (a, b) => a.name.length - b.name.length,

                ellipsis: true,
                render: (text, record) => <input value={text} disabled={!this.state.isEdit[record]} />
            },
            {
                title: 'Price',
                dataIndex: 'originPrice',
                key: 'originPrice',
                sorter: (a, b) => a.originPrice - b.originPrice,

                ellipsis: true,
                render: (text, record) => <input value={text} disabled={!this.state.isEdit[record]} />
            }, {
                title: 'Sale price',
                dataIndex: 'salePrice',
                key: 'salePrice',
                sorter: (a, b) => a.salePrice - b.salePrice,

                render: (text, record) => <input value={text} disabled={!this.state.isEdit[record]} />
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                render: (text, record) => <input value={text} disabled={!this.state.isEdit[record]} />
            }, {
                title: 'Category',
                dataIndex: 'category',
                render: (text, record) => <input value={text} disabled={!this.state.isEdit[record]} />
            },
            {
                title: 'SubCategory',
                dataIndex: 'subCategory',
                render: (text, record) => <input value={text} disabled={!this.state.isEdit[record]} />

            }, {
                title: "Action",
                key: "action",
                render: record => (
                    <Space size="middle">
                        {this.state.isEdit && <SaveOutlined onClick={this.update(record)} />}
                        <DeleteOutlined onClick={record => this.delete(record)} />
                        <EditOutlined onClick={record => this.edit(record)} />
                    </Space>
                )
            }
        ];
        const columnOrder = [
            {
                title: 'Order',
                dataIndex: 'order',
                key: 'order',
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                key: 'amount',
            },
            {
                title: 'Receiver',
                dataIndex: 'receiver',
                key: 'receiver',
            },
            {
                title: 'User name',
                dataIndex: 'userName',
            }, {
                title: 'Address',
                dataIndex: 'address'
            },
            {
                title: 'Create date',
                dataIndex: 'createAt',

            }, {
                title: 'State',
                dataIndex: 'state',
                key: 'state',
            },
            {
                title: "Action",
                key: "action",
                render: record => (
                    <Space size="middle">
                        <DeleteOutlined onClick={() => this.delete(record)} />
                        <CheckOutlined onClick={() => this.submit(record)} />
                    </Space>
                )
            }
        ];

        // if (userInfo.isAdmin)
        return (
            <div >
                <Row align="middle" justify="space-between" className="header"   >

                    <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                        <Menu.Item key="home" >
                            <a href="/">Shop</a>
                        </Menu.Item>
                        <Menu.Item key="product"> Product</Menu.Item>
                        <Menu.Item key="order">
                            Order
                        </Menu.Item>
                    </Menu>
                    <div className="logo item-header">
                        <Image preview={false}
                            width={100}
                            src={logo}
                        /></div>

                    <div className="item-header float-right">

                        <Search placeholder="input search text" onSearch={this.onSearch} enterButton style={{ marginRight: "15px" }} />
                        <Popover placement="bottomRight" content={content({ data: userInfo, logout: this.logout })} trigger="click">
                            <UserOutlined style={{
                                fontSize: '25px', marginRight: "25px",
                                paddingBottom: '4px'
                            }} />
                        </Popover>
                    </div>
                </Row>
                <Row justify="space-around" align="middle">
                    {this.state.current == 'product' && <Button> Create product</Button>}

                </Row>
                <Row><Pagination defaultCurrent={this.state.index} total={this.state.total} pageSize={20} onChange={this.getData} /></Row>
                <Table columns={this.state.current == 'product' ? columnProduct : columnOrder} dataSource={this.state.current == 'product' ? this.state.products : this.state.orders}

                    loading={this.state.loading}
                />

            </div >

        )
    }


}
export default Dashboard;