import React, { useState } from 'react';
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import { server } from '../../enviroment'

import { reactLocalStorage } from 'reactjs-localstorage';
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
import { Form, Input, Select, Button, Row, message } from 'antd';
import Siginup from '../Signup/Signup';
import './Checkout.css';
import Footer from '../../components/footer/Footer';
const { Option } = Select;
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            defaultValue: {
                province: null,

            },
            listProduct: [],
            total: 0,
            province: [],
            district: [],
            ward: []
        }

    }
    onFinish = (e) => {
        // e.preventDefault();

        e.userId = reactLocalStorage.getObject("userInfo").userId;
        console.log(e)
        axios.post(server + 'api/Orders', e).then(resp => {
            if (resp.status == 200) {
                message.success("Create successfull new order");
                this.props.history.push("/history");
            }
        }).catch(e => {
            throw e;
        });
    };

    componentDidMount() {
        let isLogin = reactLocalStorage.get("token");
        let userInfo = reactLocalStorage.getObject("userInfo");


        axios.get(server + 'api/Carts/get-detail-by-user/' + userInfo.userId).then(resp => {


            this.state.listProduct = resp.data.data != null ? resp.data.data.listProduct : [];
            this.state.total = resp.data.data != null ? resp.data.data.total : 0;
            this.setState(this.state)
        }).catch(e => {
            throw e;
        });

        axios.get("https://vapi.vnappmob.com/api/province").then(resp => {

            this.state.province = [...resp.data.results];
            this.state.defaultValue.province = this.state.province[0].province_name
            this.setState(this.state)
        })

    }
    loadDistrict = (e) => {
        let id = this.state.province.find(s => s.province_name == e).province_id;
        if (id) axios.get("https://vapi.vnappmob.com/api/province/district/" + id).then(resp => {
            this.state.district = resp.data.results;
            this.setState(this.state);
        })
    }
    loadWard = (e) => {
        let id = this.state.district.find(s => s.district_name == e).district_id;

        if (id) axios.get("https://vapi.vnappmob.com/api/province/ward/" + id).then(resp => {
            debugger
            this.state.ward = resp.data.results;
            this.setState(this.state);
        })
    }
    prefixSelector =
        <Form.Item noStyle>
            <Select defaultValue="84"
                style={{
                    width: 70,
                }}
            >
                <Option value="84" >+84</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>

    render() {
        let token = reactLocalStorage.get("token");
        if (!token) window.location = "/"
        let userInfo = reactLocalStorage.getObject("userInfo");
        if (token)
            return (
                <div className='flex-center-checkout'>
                    <Header />
                    <div className="inline">

                        <div style={{ textAlign: "center", fontSize: '22px', fontWeight: "bold", marginBottom: "15px" }}>Order details</div>
                        <Form

                            labelCol={{ span: 3, offset: 2 }}
                            labelAlign="left"
                            name="order"
                            onFinish={e => this.onFinish(e)}
                            initialValues={{

                                prefix: '84',
                            }}
                            scrollToFirstError={true}
                        >

                            <Form.Item
                                name="email"
                                label="E-mail"
                                rules={[
                                    {
                                        type: 'email',
                                        message: 'The input is not valid E-mail!',
                                    },
                                    {
                                        required: true,
                                        message: 'Please input your E-mail!',
                                    },
                                ]}
                                style={{
                                    display: 'flex', justifyContent:
                                        'center', width: 'calc(80% - 8px)'
                                }}
                            >
                                <Input value={userInfo.email} />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                label="Phone Number"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    },
                                ]}
                                style={{
                                    display: 'flex', justifyContent:
                                        'center', width: 'calc(80% - 8px)'
                                }}
                            >
                                <Input
                                    addonBefore={this.prefixSelector}
                                    style={{
                                        width: '100%',
                                    }}
                                    value={userInfo.phone}
                                />
                            </Form.Item>

                            <Input.Group compact style={{
                                display: 'flex', justifyContent:
                                    'space-between', width: 'calc(75% - 8px)', marginLeft: '5%'
                            }}>
                                <Form.Item name='province'
                                    label="Province" rules={[
                                        {
                                            required: true,
                                            message: "Please input your province"
                                        }
                                    ]}
                                    labelCol={{ span: 10, offset: 1 }}
                                    style={{
                                        display: 'flex', justifyContent:
                                            'space-around', width: '33%'
                                    }} >
                                    <Select
                                        onChange={e => this.loadDistrict(e)} defaultValue={this.state.defaultValue.province}
                                    >
                                        {this.state.province.map((data, index) =>

                                            <Option value={data.province_name} key={index} >{data.province_name}</Option>
                                        )}

                                    </Select>
                                </Form.Item>
                                <Form.Item name='district' style={{
                                    display: 'flex', justifyContent:
                                        'space-around', width: '33%'
                                }}
                                    labelCol={{ span: 7, offset: 2 }}
                                    label="District" rules={[
                                        {
                                            required: true,
                                            message: "Please input your disctric"
                                        }
                                    ]} >
                                    <Select
                                        onChange={e => this.loadWard(e)}
                                    >
                                        {this.state.district.map((data, index) => <Option value={data.district_name} key={index} >{data.district_name}</Option>)}

                                    </Select>
                                </Form.Item>
                                <Form.Item name='ward' label="Ward" style={{
                                    display: 'flex', justifyContent:
                                        'space-around', width: '33%'
                                }}
                                    labelCol={{ span: 6, offset: 2 }}
                                    rules={[
                                        {
                                            required: false,
                                            message: "Please input your ward"
                                        }
                                    ]} >
                                    <Select

                                    >
                                        {this.state.ward.map((data, index) => <Option value={data.ward_name} key={index} >{data.ward_name}</Option>)}

                                    </Select>
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
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your address!',
                                        whitespace: true,
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Row align="middle" justify="center">
                                {this.state.listProduct && this.state.listProduct.map(item => (<RowCart product={item} isCheckout={true}>
                                </RowCart>
                                ))}
                                <Row align="middle" justify="space-around" style={{ width: '50vw', marginBottom: "50px", marginTop: '20px', fontSize: '25px', textAlign: 'right' }}><div style={{ width: '20%' }}>Shipping cost</div> <div style={{ width: "40%", textAlign: 'right' }}>0</div></Row>

                                <Row align="middle" justify="end" style={{ width: '50vw', marginBottom: "50px", marginTop: '20px' }}>


                                    <button className="btn-checkout" style={{ cursor: 'pointer' }}  >

                                        <div style={{
                                            // width: '201px',
                                            fontSize: '25px'
                                        }}><span style={{ marginRight: "20px" }}>Total :  {currencyFormat(this.state.total)}</span>
                                            | SUBMIT
                                        </div>
                                    </button>
                                </Row>



                            </Row>




                        </Form>
                    </div>
                    <Footer />
                </div>
            )
    }
}


const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 2,
            offset: 3
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
            offset: 1
        },
    },
    labelAlign: 'left'
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};



export default Checkout;