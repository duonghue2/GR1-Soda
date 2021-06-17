import { Menu, Image, Row, Input, Select, message, Popover } from 'antd';
import { ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import React from 'react'
import logo from '../../assests/logo.png'
import { reactLocalStorage } from 'reactjs-localstorage';
import Login from '../login/Login'
import './Header.css'
const { SubMenu } = Menu;
const { Option } = Select;

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

class Header extends React.Component {
    state = {
        current: 'home',
        visible: false,

        className: "Hidden",
        isLogin: false,

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
        this.props.history.push("/");
    }
    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };
    login = (e) => {

        e.preventDefault();
        if (this.state.userInfor == null)
            this.setState({
                visible: !this.state.visible
            })
    }
    componentDidMount() {

        this.state.userInfor = reactLocalStorage.getObject('userInfo');
        if (!this.state.userInfor.userId) this.state.userInfor = null;
        this.setState(this.state);
    }
    setVisible = (e) => {
        this.setState({
            visible: e
        })
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
    redirect = (e) => {
        window.location = "/" + e;
    }
    onSearch = (e) => {
        window.location = "/search/" + e;
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

                            <SubMenu key="women" title="Women" onTitleClick={() => this.redirect("women")}>


                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/dress">
                                        Dress
                                    </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/bags">
                                        Bag
                                    </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/glasses">
                                        Glasses
                                    </a>
                                </Menu.Item>
                                <Menu.Item>
                                    <a rel="noopener noreferrer" href="/women/jacket">
                                        Jacket
                                    </a>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu key="man" title="Men" onTitleClick={() => this.redirect("men")}>

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
                                        Jacket
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
                        <Search placeholder="input search text" onSearch={this.onSearch} enterButton style={{ marginRight: "15px" }} />
                        {/* <SearchOutlined style={{ fontSize: '25px', marginRight: "25px", fontWeight: 'bold' }} /> */}
                        <a href='/cart'><ShoppingCartOutlined style={{ fontSize: '25px', marginRight: "25px" }} /></a>
                        {this.state.userInfor && <Popover placement="bottomRight" content={content({ data: this.state.userInfor, logout: this.logout })} trigger="click">
                            <UserOutlined style={{ fontSize: '25px', marginRight: "25px" }} />
                        </Popover>}
                        {!this.state.userInfor && <UserOutlined style={{ fontSize: '25px', marginRight: "25px" }} onClick={e => this.login(e)} />
                        }
                    </div>
                    <Login visible={this.state.visible} setVisible={this.setVisible} />

                </Row>

            </div >
        );
    }
}
export default Header;




