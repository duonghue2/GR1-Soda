
import React from 'react';
import { Row, Modal, Form, Input, message } from 'antd';
import { server } from '../../enviroment'
import axios from 'axios'
import { reactLocalStorage } from 'reactjs-localstorage';

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
class Login extends React.Component {
    state = {

        email: {
            error: null,
            validation: "",
            value: null,
        },
        password: {
            error: null,
            validation: "",
            value: null
        },
        userInfor: null
    };
    logout = (e) => {
        //  e.preventDefault();
        reactLocalStorage.remove('token');
        reactLocalStorage.remove('userInfo');
        reactLocalStorage.remove('Cart');
        this.state.userInfor = null;
        this.state.email = {
            error: null,
            validation: "",
            value: null,
        };
        this.state.password = {
            error: null,
            validation: "",
            value: null
        };
        this.setState(this.state);

        message.success("log out succesfully!");
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };
    login = (e) => {
        e.preventDefault();
        if (this.state.userInfor == null)
            this.setState({
                visible: true
            })
    }
    componentDidMount() {

        this.state.userInfor = reactLocalStorage.getObject('userInfo');
    }

    handleSubmit = async () => {
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
            try {
                await axios.post(server + 'api/Users/login', { email: email, password: password }).then((response) => {

                    if (response.data.status == 1) {
                        reactLocalStorage.set('token', response.data.token);
                        debugger;
                        reactLocalStorage.setObject('userInfo', response.data.data);
                        this.state.userInfor = response.data.data;
                        message.success(response.data.message);
                        this.props.setVisible(false);
                    }
                    else message.error(response.data.message)

                }, (error) => {
                    message.error("Some error occurs, pls try again");
                });

            } catch (error) {

            }
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
        return (


            <Modal
                title=" Login"
                width={650}
                okText="Submit"
                centered
                visible={this.props.visible}
                onCancel={() => this.props.setVisible()}
                onOk={this.handleSubmit}

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
                        <a className='register' href='/signup' >Register</a>
                    </Row>

                </Form>
            </Modal>

        )
    }
}
export default Login;