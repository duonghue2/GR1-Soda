import { Menu, Image, Row, Modal, Form, Input, DatePicker, TimePicker, Select, Cascader, InputNumber } from 'antd';
import { SearchOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'

import React from 'react'
import logo from '../../assests/logo.png'
import Banner from '../banner/Banner'
import './Header.css'
const { SubMenu } = Menu;
const { Option } = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 5,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 12,
        },
    },
};
class Header extends React.Component {
    state = {
        current: 'home',
        visible: false,
        email: {
            error: null,
            validation: "",
            value: null,
        },
        password: {
            error: null,
            validation: "",
            value: null
        }
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };
    login = () => {
        this.setState({
            visible: true
        })
    }
    handleSubmit = () => {
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        if (!email) {
            this.state.email.validation = "error";
            this.state.email.error = "Email is not empty"

        }

        if (!password) {
            this.state.password.validation = "error";
            this.state.password.error = "Password is not empty"
        }
        if (email && password) {
            // post data to server;
        }


        this.setState(this.state)

    }
    handleCancel = () => {

        this.setState({
            email: {
                error: null,
                validation: ""
            },
            password: {
                error: null,
                validation: ""
            },
            visible: false
        })
    }

    render() {
        const { current } = this.state;

        return (
            <div >
                <Row align="middle" justify="space-between" className="header"   >
                    <div className="item-header">
                        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                            <Menu.Item key="home" >
                                <a href="/">Home</a>
                            </Menu.Item>

                            <SubMenu key="women" title="Women">

                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/shirt">
                                        Shirt
                                       </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/pants">
                                        Pants
                                      </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/dress">
                                        Dress
                                   </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/bags">
                                        Bags
                                   </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/glasses">
                                        Glasses
                                 </a>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="man" title="Men">

                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/man/shirt">
                                        Shirt
                                  </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/man/pants">
                                        Pants
                                  </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/man/jackets">
                                        Jackets
                                     </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/man/bags">
                                        Bags
                               </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/man/glasses">
                                        Glasses
                                     </a>
                                </Menu.Item>
                            </SubMenu>
                            <Menu.Item key="contact">
                                Contact
            </Menu.Item>
                        </Menu>
                    </div>
                    <div className="logo item-header">
                        <Image preview={false}
                            width={100}
                            src={logo}
                        /></div>

                    <div className="item-header float-right">
                        <SearchOutlined style={{ fontSize: '25px', marginRight: "25px", fontWeight: 'bold' }} />
                        <a href='/cart'><ShoppingCartOutlined style={{ fontSize: '25px', marginRight: "25px" }} /></a>
                        <UserOutlined style={{ fontSize: '25px', marginRight: "25px" }} onClick={this.login} />

                    </div>
                    <Modal
                        title=" Login"
                        width={650}
                        okText="Submit"
                        centered
                        visible={this.state.visible}
                        onOk={this.handleSubmit}
                        onCancel={this.handleCancel}
                    >
                        <Form {...formItemLayout} onSubmit={this.handleSubmit} >
                            <Form.Item name="email"

                                validateStatus={this.state.email.validation}
                                help={this.state.email.error}

                                rules={[{
                                    required: true

                                }]}
                                label="Email"
                                hasFeedback
                            >
                                <Input placeholder="Enter your email" id="email" />
                            </Form.Item>
                            <Form.Item label="Password" name='password'
                                validateStatus={this.state.password.validation}
                                help={this.state.password.error}
                                hasFeedback rules={[{
                                    required: true

                                }]}>
                                <Input.Password allowClear placeholder="Enter your password" id="password" />
                            </Form.Item>

                            <Row style={{ marginLeft: '115px' }}>
                                <a className="forgotPass" href="/forgotPassword">Forgot password?</a>
                                <a className='register' href='/register' >Register</a>
                            </Row>

                        </Form>
                    </Modal>
                </Row>

            </div>
        );
    }
}
export default Header;




