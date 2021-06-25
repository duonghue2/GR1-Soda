import React from 'react';
import { Menu, Row, Popover, Table, Space, Input, message, Image, Button, Pagination, Modal } from 'antd';
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
        current: "product",
        visible: false,
        products: [],
        orders: [],
        index: 0,
        isEdit: [],
        total: 0,
        loading: false,
        selectedRows: [],
        isSave: false,
        currentPage: 1,
        update: {},
        selectedRowKeys: [],


    };
    logout = (e) => {
        //  e.preventDefault();
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('userInfo');
        message.success("log out succesfully!");
        window.location = "/";
    }
    handleClick = e => {
        debugger;
        this.state.current = e.key;
        this.state.currentPage = 1;
        this.state.selectedRows = [];
        this.state.isSave = false;
        this.state.index = 0;
        this.state.loading = true;

        this.getData(1)
    };
    getData = async (x) => {
        this.state.isSave = false;
        this.state.isEdit.forEach(element => {
            element = false;
        })
        this.state.selectedRowKeys = [];
        this.state.selectedRows = []
        debugger
        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        if (userId) {
            this.state.currentPage = x;
            let payload = {
                token, userId,
                pageSize: 9,
                currentPage: x,
                state: 'pending'
            }
            if (this.state.current == 'product') axios.post(server + 'api/ProductDetails/admin', payload).then(resp => {
                console.log(resp)
                this.state.loading = false;
                this.state.products = resp.data.data != null ? resp.data.data : [];
                this.state.products = this.state.products.map((item, index) => ({ key: index, ...item }));
                this.state.total = resp.data.data != null ? resp.data.total : 0;
                this.setState(this.state)
            }).catch(e => {
                throw e;
            });
            else
                axios.post(server + 'api/Orders/list-order', payload).then(resp => {
                    console.log(resp)
                    this.state.loading = false;
                    this.state.orders = resp.data.data != null ? resp.data.data : [];
                    this.state.orders = this.state.orders.map((item, index) => ({ key: index, ...item }));
                    this.state.total = resp.data.data != null ? resp.data.total : 0;
                    this.setState(this.state)
                }).catch(e => {
                    throw e;
                });
        }
    }
    componentDidMount() {
        this.getData(1)
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
    delete = (e) => {
        e.preventDefault();
        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        this.state.loading = true;


        this.state.selectedRows.forEach(element => {
            let payload = {
                token, userId,
                id: element.productDetailId
            }
            axios.post(server + 'api/ProductDetails/admin/delete', payload).then(resp => {
                if (resp.data.data) {
                    this.getData(this.state.currentPage);
                }
            }).catch(e => {
                throw e;
            });
        });

    }
    submit = (e) => {
        e.preventDefault();
    }
    edit = (e) => {
        e.preventDefault();

        let key = this.state.selectedRows[0].key;
        this.state.isSave = true;
        this.state.isEdit[key] = true;

        this.setState(this.state);
    }
    update = (e) => {
        e.preventDefault();
        debugger;
        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        this.state.update.token = token;
        this.state.update.userId = userId
        if (this.state.current == 'product') axios.post(server + 'api/ProductDetails/admin/update', this.state.update).then(resp => {
            debugger
            if (resp.data.data) {
                window.location.reload()

                // this.getData(this.state.currentPage);

            }

        }).catch(e => {
            throw e;
        });
    }
    handleChange(record, e) {
        debugger
        let update = record;
        update[e.target.name] = e.target.value;
        this.setState({ update: update })
        console.log(update)

    }
    showModal = (e) => {
        e.preventDefault()
        this.state.visible = !this.state.visible;
        this.setState(this.state);
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

                render: (text, record, index) => <Input defaultValue={text} name="name" onChange={e => this.handleChange(record, e)} disabled={!this.state.isEdit[index]} />
            },
            {
                title: 'Price',
                dataIndex: 'originPrice',
                key: 'originPrice',
                sorter: (a, b) => a.originPrice - b.originPrice,

                ellipsis: true,
                render: (text, record, index) => <Input value={text} disabled={!this.state.isEdit[index]} />
            }, {
                title: 'Sale price',
                dataIndex: 'salePrice',
                key: 'salePrice',
                sorter: (a, b) => a.salePrice - b.salePrice,

                render: (text, record, index) => <Input value={text} disabled={!this.state.isEdit[index]} />
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                render: (text, record, index) => <Input value={text} disabled={!this.state.isEdit[index]} />
            }, {
                title: 'Category',
                dataIndex: 'category',
                render: (text, record, index) => <Input value={text} disabled={!this.state.isEdit[index]} />
            },
            {
                title: 'SubCategory',
                dataIndex: 'subCategory',
                render: (text, record, index) => <Input value={text} disabled={!this.state.isEdit[index]} />

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
            }
        ];
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({ selectedRows, selectedRowKeys })

            }
        };

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
                <Row justify="start" align="middle" style={{ marginBottom: '15px' }}>
                    {this.state.current == 'product' && <Button onClick={e => this.showModal(e)}> Create product</Button>}
                    {this.state.selectedRows.length == 1 && this.state.current == 'product' && !this.state.isSave && <Button onClick={e => this.edit(e)}>  <EditOutlined />Edit</Button>}
                    {this.state.selectedRows.length == 1 && this.state.current == 'product' && this.state.isSave && <Button onClick={e => this.update(e)}>  <EditOutlined />Save</Button>}
                    {this.state.selectedRows.length > 0 && <Button onClick={e => this.delete(e)} >  <DeleteOutlined />Delete</Button>}
                    {this.state.selectedRows.length > 0 && this.state.current == 'order' && <Button onClick={e => this.submit(e)} >   <CheckOutlined />Approve</Button>}
                </Row>
                <Row style={{ marginBottom: '15px' }}><Pagination defaultCurrent={1} current={this.state.currentPage} total={this.state.total} pageSize={9} onChange={(x) => this.getData(x)} /></Row>
                {this.state.current == 'product' && <Table columns={columnProduct} dataSource={this.state.products}

                    rowSelection={{ ...rowSelection }}
                    loading={this.state.loading}

                />}
                {this.state.current == 'order' && <Table columns={columnOrder} dataSource={this.state.orders}
                    rowSelection={{ ...rowSelection }}
                    loading={this.state.loading}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {
                                debugger;
                                this.edit(rowIndex);

                            }
                        }
                    }}
                />}
                <Modal
                    title="Modal 1000px width"
                    centered
                    visible={this.state.visible}
                    onOk={(e) => this.submit(e)}
                    onCancel={(e) => this.showModal(e)}
                    width={1000}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>

            </div >

        )
    }


}
export default Dashboard;