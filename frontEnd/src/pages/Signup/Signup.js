import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Form, Input, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import './Signup.css'
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
            offset: 1
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

            offset: 5,
            span: 16
        },
        sm: {
            offset: 5,
            span: 16,

        },
    },
};

class Signup extends React.Component {
    onFinish = (values) => {
        console.log('Received values of form: ', values);
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
        return (
            <div className="signup">
                <Row align="middle" justify="center" >
                    <Col >
                        <div style={{ width: '50vw' }} className="box">
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

                                <Form.Item
                                    name="confirm"
                                    label="Confirm Password"
                                    dependencies={['password']}
                                    hasFeedback
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please confirm your password!',
                                        },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }

                                                return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    name="nickname"
                                    label="Nickname"
                                    tooltip="What do you want others to call you?"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your nickname!',
                                            whitespace: true,
                                        },
                                    ]}
                                >
                                    <Input />
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
                                        addonBefore={this.prefixSelector}
                                        style={{
                                            width: '100%',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="agreement"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            validator: (_, value) =>
                                                value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
                                        },
                                    ]}
                                    {...tailFormItemLayout}
                                >
                                    <Checkbox>
                                        I have read the <a href="">agreement</a>
                                    </Checkbox>
                                </Form.Item>
                                <Form.Item style={{ textAlign: 'center' }}  {...tailFormItemLayoutSubmit} >
                                    <button className="btn-checkout btn-signup" onClick={e => this.checkout(e)}  >

                                        <div style={{

                                            fontSize: '25px'
                                        }}>Register
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

export default Signup;