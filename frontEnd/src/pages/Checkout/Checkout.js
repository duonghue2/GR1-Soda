import React, { useState } from 'react';
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import { server } from '../../enviroment'

import { reactLocalStorage } from 'reactjs-localstorage';
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
import { Form, Input, Select, Button, Row } from 'antd';
import Siginup from '../Signup/Signup';
const { Option } = Select;
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userInfo: {
                email: null,
                phone: null,
                userName: null
            }
        }
    }

    componentDidMount() {
        let isLogin = reactLocalStorage.get("token");
        let userInfo = reactLocalStorage.getObject("userInfo");
        if (userInfo) {
            this.state.userInfo = userInfo;
            axios.get(server + 'api/Carts/get-detail-by-user/' + userInfo.userId).then(resp => {

                console.log(resp.data);
                this.state.listProduct = resp.data.data.listProduct;
                this.state.total = resp.data.data.total;
                this.setState(this.state)
            }).catch(e => {
                throw e;
            });
        }
        axios.get("https://dc.tintoc.net/app/api-customer/public/provinces").then(resp => {

        })
    }
    render() {
        return (
            <div className='flex-center'>
                <Header />
                <div>
                    <div>Bill details</div>
                    <OrderDetail />
                </div>
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
            span: 8,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 16,
        },
    },
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

const OrderDetail = () => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>
    );
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);
    return (
        <Form
            {...formItemLayout}
            form={form}
            name="order"
            onFinish={onFinish}
            initialValues={{

                prefix: '84',
            }}
            scrollToFirstError
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
            >
                <Input value={this.props.userInfo.email} />
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
            >
                <Input
                    addonBefore={prefixSelector}
                    style={{
                        width: '100%',
                    }}
                    value={this.props.userInfo.phone}
                />
            </Form.Item>

            <Form.Item
                name="address"
                label="Address"
                tooltip="Address receive package"
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
                {this.state.listProduct && this.state.listProduct.map(item => (<RowCart product={item}>
                </RowCart>
                ))}


                {this.state.listProduct.length != 0 && <Row align="middle" justify="end" style={{ width: '50vw' }}>

                    <div style={{
                        width: '201px',
                        fontSize: '25px'
                    }}><span style={{ marginRight: "20px" }}>Total : </span> {currencyFormat(this.state.total)}</div>

                </Row>
                }


            </Row>



            <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    Submit
        </Button>
            </Form.Item>
        </Form>
    );
};


export default Checkout;