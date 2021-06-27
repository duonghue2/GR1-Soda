import React from 'react';
import { Menu, Row, Popover, Table, Form, Input, message, Image, Button, Pagination, Modal, InputNumber, Col, Steps, Select } from 'antd';
import { DeleteOutlined, UserOutlined, EditOutlined, CheckOutlined, SaveOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { reactLocalStorage } from 'reactjs-localstorage';
import { currencyFormat } from '../../utils/function'
import { server } from '../../enviroment'
import RowCart from '../../components/rowCart/rowCart'
import axios from 'axios'
import logo from '../../assests/logo.png'
const { Search } = Input;
const { TextArea } = Input;
const { Option } = Select;
const { Step } = Steps;
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
const { SubMenu } = Menu;

class Dashboard extends React.Component {
    state = {
        current: "product",
        visible: true,
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
        listDetail: [],
        idOrder: "",
        purchase: {
            order: {},
            details: []
        },
        step: "",
        currentStep: 1,
        orderstate: null



    };
    logout = (e) => {
        //  e.preventDefault();
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('userInfo');
        message.success("log out succesfully!");
        window.location = "/";
    }
    getDetailOrder = () => {
        var id = this.state.idOrder;
        axios.get(server + 'api/Orders/' + id).then(resp => {
            console.log(resp.data)
            this.state.purchase = resp.data.data != null ? resp.data.data : {};
            let orderstate = this.state.purchase.order.state
            if (orderstate == "cancel") this.state.step = "error";
            else if (orderstate == "deliveried") this.state.step = "finish";
            else this.state.step = "process"
            if (orderstate == 'pending') this.state.currentStep = 1;
            else if (orderstate == "approved") this.state.currentStep = 2;
            else if (orderstate == 'in process') this.state.currentStep = 3;
            else if (orderstate == 'deliveried') this.state.currentStep = 4;
            else this.state.currentStep = 1;

            this.setState(this.state)
        }).catch(e => {
            throw e;
        });
    }
    handleClick = e => {
        debugger;
        this.state.current = e.key;
        if (e.key == 'product' || e.key == "order") {
            this.state.currentPage = 1;
            this.state.selectedRows = [];
            this.state.isSave = false;
            this.state.index = 0;
            this.state.loading = true;

            this.getData(1, null)
        } else if (e.key == "create") this.setState(this.state);

    };
    approved = (name, event) => {
        debugger
        event.preventDefault();


        axios.patch(server + 'api/Orders/' + this.state.idOrder + "?state=" + name).then(resp => {
            if (resp.data) {
                this.getDetailOrder()
            }
            else message.error("Server internal errors");

        }).catch(e => {
            throw e;
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.products !== this.state.products) {
            this.setState(this.state);
        }
    }
    getData = async (x, name) => {
        this.state.isSave = false;
        this.state.isEdit.forEach(element => {
            element = false;
        })
        this.state.selectedRowKeys = [];
        this.state.selectedRows = [];
        this.state.update = {};
        debugger
        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        if (userId) {
            this.state.currentPage = x;
            let payload = {
                token, userId,
                pageSize: 9,
                currentPage: x,
                state: this.state.orderstate,
                name
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
        this.getData(1, null)
        // Array.apply(null, Array(3)).map(String.prototype.valueOf, "hi")
    }

    setVisible = (e) => {
        this.setState({
            visible: e
        })
    }
    onSearch = (e) => {
        if (this.state.current == "order" || this.state.current == "detailOrder") {
            this.state.current = "order";
            this.state.orderstate = null;
            this.state.currentPage = 1;
            this.state.selectedRows = [];
            this.state.isSave = false;
            this.state.index = 0;
            this.state.loading = true;
            this.getData(1, e);

        }
        else {
            this.state.current = "product"
            this.state.currentPage = 1;
            this.state.selectedRows = [];
            this.state.isSave = false;
            this.state.index = 0;
            this.state.loading = true;
            this.getData(1, e);
        }
    }
    delete = (e) => {
        e.preventDefault();
        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        this.state.loading = true;

        this.state.selectedRows.forEach(async (element) => {


            let payload = {
                token, userId,
                id: this.state.current == "product" ? element.productDetailId : element.id
            }
            if (this.state.current == "product")
                axios.post(server + 'api/ProductDetails/admin/delete', payload).then(resp => {
                    if (resp.data.data) {
                        this.getData(this.state.currentPage, null);
                    }
                }).catch(e => {
                    throw e;
                });
            else {
                await axios.post(server + 'api/Orders/admin/delete', payload).then(resp => {
                    if (resp.data) {
                        this.getData(this.state.currentPage, null);
                    }
                }).catch(e => {
                    throw e;
                });
            }
        });


    }
    AddProduct = (e) => {
        console.log(e);
        let images = [e.image1, e.image2, e.image3]
        var payload = { ...e, images };
        axios.post(server + 'api/Products', payload).then(resp => {
            debugger;
            if (resp.data) {
                this.message.success("Create successfully");
            }
        }).catch(e => {
            throw e;
        });
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
    // approveMany = (e) => {
    //     e.preventDefault();
    //     this.state.selectedRows.forEach(element => {
    //         await axios.patch(server + 'api/Orders/' + element.id + "?state=approved").then(resp => {
    //             if (!resp.data)
    //                 message.error("Server internal errors");

    //         }).catch(e => {
    //             throw e;
    //         });
    //     });
    //     this.getData(1, null);
    // }
    showModal = (e) => {
        e.preventDefault()
        this.state.visible = !this.state.visible;
        this.setState(this.state);
    }
    createProduct = (e) => {
        e.preventDefault();
        this.state.current = "create";
        this.setState(this.state);
    }
    handleChangeOrderState = (e) => {

        let token = reactLocalStorage.get("token");
        let userId = reactLocalStorage.getObject("userInfo").userId;
        this.state.orderstate = e;
        if (userId) {
            this.state.currentPage = 1;
            let payload = {
                token, userId,
                pageSize: 9,
                currentPage: 1,
                state: e
            }
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

                render: (text, record, index) => <Input value={text} name="name" onChange={e => this.handleChange(record, e)} disabled={!this.state.isEdit[index]} />
            },
            {
                title: 'Price',
                dataIndex: 'originPrice',
                key: 'originPrice',
                sorter: (a, b) => a.originPrice - b.originPrice,

                ellipsis: true,
                render: (text, record, index) => <Input value={text} name="originPrice" disabled={!this.state.isEdit[index]} onChange={e => this.handleChange(record, e)} />
            }, {
                title: 'Sale price',
                dataIndex: 'salePrice',
                key: 'salePrice',
                sorter: (a, b) => a.salePrice - b.salePrice,

                render: (text, record, index) => <Input value={text} name="salePrice" disabled={!this.state.isEdit[index]} onChange={e => this.handleChange(record, e)} />
            },
            {
                title: 'Size',
                dataIndex: 'size',
                key: 'size',
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                render: (text, record, index) => <Input value={text} name="quantity" disabled={!this.state.isEdit[index]} onChange={e => this.handleChange(record, e)} />
            }, {
                title: 'Category',
                dataIndex: 'category',
                render: (text, record, index) =>
                    <select placeholder="Select category" name="category" value={text} disabled={!this.state.isEdit[index]} className="select-admin" onChange={e => this.handleChange(record, e)}>
                        <option value="Women">Women</option>
                        <option value="Men">Men</option>
                        <option value="Unisex">Unisex</option>

                    </select>

            },
            {
                title: 'SubCategory',
                dataIndex: 'subCategory',
                render: (text, record, index) => <Input name="subCategory" value={text} disabled={!this.state.isEdit[index]} onChange={e => this.handleChange(record, e)} />

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
                        {/* <Menu.Item key="product"> Product</Menu.Item> */}
                        <SubMenu key="product" title="Product" onTitleClick={this.handleClick}>


                            <Menu.Item key="create">

                                Create Product

                            </Menu.Item>
                        </SubMenu>
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
                <Row align="middle" justify="space-between" style={{ marginBottom: '15px', marginLeft: "25px" }}>
                    <div >
                        {this.state.current == 'product' && <Button onClick={e => this.createProduct(e)} className="ant-btn-primary function">  <PlusOutlined />Create Product</Button>}

                        {this.state.selectedRows.length == 1 && this.state.current == 'product' && !this.state.isSave && <Button onClick={e => this.edit(e)} className="ant-btn-primary function">  <EditOutlined />Edit</Button>}
                        {this.state.selectedRows.length == 1 && this.state.current == 'product' && this.state.isSave && <Button onClick={e => this.update(e)} className=" function ant-btn-primary">  <EditOutlined />Save</Button>}
                        {this.state.selectedRows.length > 0 && (this.state.orderstate == "cancel" || this.state.current == "product") && <Button onClick={e => this.delete(e)} className=" function" >  <DeleteOutlined />Delete</Button>}
                    </div><div>
                        {this.state.current == 'order' && <Select placeholder="order state" style={{ width: 150, fontSize: "15px" }} onChange={this.handleChangeOrderState} value={this.state.orderstate}>
                            <Option value="pending">Pending</Option>
                            <Option value="approved">Approved</Option>
                            <Option value="deliveried">Deliveried</Option>
                            <Option value="cancel">Cancel</Option>
                        </Select>}
                    </div>
                    {(this.state.current == 'product' || this.state.current == "order") && <Pagination defaultCurrent={1} current={this.state.currentPage} total={this.state.total} pageSize={9} onChange={(x) => this.getData(x, null)} />}
                </Row>
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
                                event.preventDefault();
                                this.state.current = "detailOrder";
                                this.state.idOrder = record.id;
                                this.getDetailOrder();


                            }
                        }
                    }}
                />}

                {this.state.current == 'create' && <Row align="middle" justify="center"><div style={{ width: '50%' }}><Form
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={this.AddProduct}
                    size="middle"

                >
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" >
                            Submit
                        </Button>
                    </Form.Item>
                    <Form.Item
                        label="Product Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input product name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Category"
                        name="category"
                        rules={[{ required: true, message: 'Please input category!' }]}
                    >
                        <Select placeholder="Select category">
                            <Option value="Women">Women</Option>
                            <Option value="Men">Men</Option>
                            <Option value="Unisex">Unisex</Option>

                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="originPrice"
                        rules={[{ required: true, message: 'Please input price!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image 1"
                        name="image1"
                        rules={[{ required: true, message: 'Please input image!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image 2"
                        name="image2"
                        rules={[{ required: true, message: 'Please input image!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Image 3"
                        name="images3"

                    >
                        <Input />

                    </Form.Item>


                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: true, message: 'Please input description!' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.List name="detail" >
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Row key={key} style={{ marginBottom: 8, width: "70%", float: 'right' }} align="middle" justify="space-between" >
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'size']}
                                            fieldKey={[fieldKey, 'size']}
                                            rules={[{ required: true, message: 'Missing first name' }]}
                                        >
                                            <Input placeholder="size" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            fieldKey={[fieldKey, 'pice']}

                                        >
                                            <InputNumber placeholder="sale price" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quantity']}
                                            fieldKey={[fieldKey, 'quantity']}

                                        >
                                            <InputNumber placeholder="quantity" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'subCategory']}
                                            fieldKey={[fieldKey, 'subCategory']}

                                        >
                                            <Input placeholder="Sub-category" />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Row>
                                ))}
                                <Row align="middle" justify="center" style={{ width: '-webkit-fill-available' }} >
                                    <Form.Item>
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} style={{ width: 'max-content' }}>
                                            Add detail
                                        </Button>
                                    </Form.Item>
                                </Row>
                            </>
                        )}
                    </Form.List>
                </Form></div></Row>}
                {this.state.current == 'detailOrder' && <div>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>

                        <div style={{ marginTop: '20px', marginBottom: "20px" }}>
                            <Row justify="space-between" >
                                <div style={{ fontSize: "25px", fontWeight: "bold" }}> <span style={{ padding: "35px" }}>Order #{this.state.purchase.order.id && this.state.purchase.order.id.substring(0, 4)}</span></div>
                                <div style={{ width: "50vw", marginRight: "35px" }}>
                                    <Steps direction="horizontal" current={this.state.currentStep} status={this.state.step}>
                                        <Step title="Pending"></Step>
                                        {this.state.purchase.order.state == "cancel" && <Step title="Cancel" />}
                                        <Step title="Approved"></Step>
                                        <Step title="In Progress" />
                                        <Step title="Deliveried"></Step>

                                    </Steps>
                                </div>

                            </Row>
                            <Row align="middle" justify="space-between">

                                <div style={{ fontSize: "23px", marginLeft: "35px" }}>Total <span style={{ fontSize: "23px", fontWeight: "bold" }}>{currencyFormat(this.state.purchase.order.amount)}</span> </div>


                                <div style={{ marginRight: "25px" }}>
                                    {this.state.purchase.order.state == 'pending' && <Button type="button" onClick={e => this.approved("approved", e)} style={{ marginRight: "15px" }}>Approved</Button>}
                                    {this.state.purchase.order['state'] == 'pending' && <Button type="button" onClick={e => this.approved("cancel", e)} style={{ marginRight: "15px" }} >Cancel</Button>}
                                    {this.state.purchase.order.state == 'approved' && <Button type="button" onClick={e => this.approved("in progress", e)} style={{ marginRight: "15px" }}>In progress</Button>}
                                    {this.state.purchase.order.state == 'in progress' && <Button type="button" onClick={e => this.approved("deliveried", e)} style={{ marginRight: "15px" }}>Deliveried</Button>}
                                </div>
                            </Row>
                            <div style={{ textAlign: "center", fontSize: '22px', fontWeight: "bold", marginBottom: "15px" }}>Order details</div>
                            <Row justify="center" align="middle">
                                <div style={{ width: "70vw" }}>
                                    <Form

                                        labelCol={{ span: 3, offset: 5 }}
                                        labelAlign="left"
                                        name="order"
                                        initialValues={{

                                            prefix: '84',
                                        }}
                                        scrollToFirstError={true}
                                    >

                                        <Form.Item
                                            name="receiver"
                                            label="Receiver "

                                            style={{
                                                display: 'flex', justifyContent:
                                                    'center', width: 'calc(80% - 8px)'
                                            }}
                                        >
                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.receiver}</span>

                                        </Form.Item>
                                        <Form.Item
                                            name="phone"
                                            label="Phone Number"

                                            style={{
                                                display: 'flex', justifyContent:
                                                    'center', width: 'calc(80% - 8px)'
                                            }}
                                        >
                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.phoneNumber}</span>

                                        </Form.Item>

                                        <Input.Group compact style={{
                                            display: 'flex', justifyContent:
                                                'space-between', width: 'calc(75% - 8px)', marginLeft: '11%'
                                        }}>
                                            <Form.Item name='province'
                                                label="Province"
                                                labelCol={{ span: 4, offset: 5 }}
                                                style={{
                                                    display: 'flex', justifyContent:
                                                        'space-around', width: '33%'
                                                }} >
                                                <div style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "15px" }}>{this.state.purchase.order.province}</div>

                                            </Form.Item>
                                            <Form.Item name='district' style={{
                                                display: 'flex', justifyContent:
                                                    'space-around', width: '33%', textAlign: "center"
                                            }}
                                                labelCol={{ span: 4, offset: 8 }}
                                                label="District"
                                            >
                                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.district}</span>


                                            </Form.Item>
                                            <Form.Item name='ward' label="Ward" style={{
                                                display: 'flex', justifyContent:
                                                    'space-around', width: '33%'
                                            }}
                                                labelCol={{ span: 6, offset: 2 }}
                                            >
                                                <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.ward}</span>


                                            </Form.Item>
                                        </Input.Group>

                                        <Form.Item
                                            name="address"
                                            label="Address"
                                            tooltip="Address receive package"
                                            style={{
                                                display: 'flex', justifyContent:
                                                    'space-around', width: 'calc(80% - 8px)'
                                            }}

                                        >
                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.address}</span>


                                        </Form.Item>
                                    </Form>
                                </div>
                            </Row>
                            <Row align="middle" justify="center" >
                                {this.state.purchase.details.map(data => (<RowCart product={data} isCheckout={true}>
                                </RowCart>
                                ))}
                            </Row>
                            <Row justify="end" style={{ width: "70vw" }}>
                                <Col span={2} offset={7} style={{ fontSize: "24px" }}>Total:</Col>
                                <Col span={2} offset={1} style={{ fontSize: "24px", fontWeight: "bold" }}>
                                    {currencyFormat(this.state.purchase.order.amount)}</Col>
                            </Row>

                        </div>


                    </div>

                </div>}


            </div >

        )
    }


}
export default Dashboard;