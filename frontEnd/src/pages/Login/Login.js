import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, message } from 'antd';
import axios from 'axios'
import { server } from '../../enviroment'
import { reactLocalStorage } from 'reactjs-localstorage';

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 3,
            offset: 1
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 18,
        },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {

            offset: 5,
            span: 15
        },
        sm: {
            span: 16,
            offset: 5,
        },
    },
};
const tailFormItemLayoutSubmit = {
    wrapperCol: {
        xs: {

            offset: 4,
            span: 18
        },
        sm: {
            offset: 4,
            span: 18,

        },
    },
};

class Login extends React.Component {
    onFinish = async (values) => {

        let payload = {

            email: values.email,
            password: values.password,

        }

        await axios.post(server + 'api/Users/login', payload).then((response) => {

            if (response.data.status == 1) {
                reactLocalStorage.set('token', response.data.token);

                reactLocalStorage.setObject('userInfo', response.data.data);

                message.success(response.data.message);
                window.location = "/"
            }
            else message.error(response.data.message)



        }, (error) => {
            message.error("Some error occurs, pls try again");
        });

    };

    prefixSelector =
        <Form.Item name="prefix" noStyle>
            <Select defaultValue="84"
                style={{
                    width: 70,
                }}
            >
                <Option value="84">+84</Option>
                <Option value="87">+87</Option>
            </Select>
        </Form.Item>






    render() {
        let token = reactLocalStorage.get("token");
        if (token) window.location = "/"

        if (!token)
            return (
                <div className="signup">
                    <Row align="middle" justify="center" >
                        <Col >
                            <div style={{ width: '45vw' }} className="box">
                                <Form
                                    {...formItemLayout}
                                    labelAlign="left"
                                    name="register"
                                    onFinish={this.onFinish}
                                    initialValues={{

                                        prefix: '84',
                                    }}
                                    scrollToFirstError
                                >
                                    <p style={{ fontSize: "25px", fontWeight: "bold", textAlign: "center" }}>Welcome to Soda boutique!</p>
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
                                        <Input />
                                    </Form.Item>

                                    <Form.Item
                                        name="password"
                                        label="Password"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                        ]}
                                        hasFeedback
                                    >
                                        <Input.Password />
                                    </Form.Item>

                                    <Row style={{ marginBottom: "20px" }}>
                                        <Col span={5} offset={4}>
                                            <a className="forgotPass" href="/forgotPassword">Forgot password?</a>
                                            <a className='register' href='/signup' >Register</a>
                                        </Col>
                                    </Row>
                                    <Form.Item style={{ textAlign: 'center' }}  {...tailFormItemLayoutSubmit} >
                                        <button className="btn-checkout btn-signup"  >

                                            <div style={{

                                                fontSize: '25px'
                                            }}>Login
                                            </div>
                                        </button>
                                    </Form.Item>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </div>
            );
    }
};

export default Login;