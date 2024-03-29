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
        window.location = "/";
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

                    <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                        <Menu.Item key="home" >
                            <a href="/">Home</a>
                        </Menu.Item>

                        <SubMenu key="women" title="Women" onTitleClick={() => this.redirect("women")}>


                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/women/dress">
                                    Dress
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/women/bags">
                                    Bag
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/women/glasses">
                                    Glasses
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/women/jacket">
                                    Jacket
                                </a>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="man" title="Men" onTitleClick={() => this.redirect("men")}>

                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/men/shirt">
                                    Shirt
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/men/pants">
                                    Pants
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/men/jacket">
                                    Jacket
                                </a>
                            </Menu.Item>
                            <Menu.Item>
                                <a rel="noopener noreferrer" href="/gender/men/glasses">
                                    Glasses
                                </a>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="unisex" title="Unisex" onTitleClick={() => this.redirect("unisex")}>
                        </SubMenu>
                        <Menu.Item key="contact">
                            Contact
                        </Menu.Item>
                    </Menu>
                    <div className="logo item-header">
                        <Image preview={false}
                            width={100}
                            src={logo}
                        /></div>

                    <div className="item-header float-right">

                        <Search placeholder="input search text" onSearch={this.onSearch} enterButton style={{ marginRight: "15px" }} />

                        <a href='/cart'><ShoppingCartOutlined style={{ fontSize: '25px', marginRight: "25px" }} /></a>



                        {this.state.userInfor &&

                            <Popover placement="bottomRight" content={content({ data: this.state.userInfor, logout: this.logout })} trigger="click">
                                <UserOutlined style={{
                                    fontSize: '25px', marginRight: "25px",
                                    paddingBottom: '4px'
                                }} />
                            </Popover>
                        }
                        {this.state.userInfor && this.state.userInfor.isAdmin && <a href="/admin" style={{ fontSize: "20px", fontWeight: "bold", marginRight: "15px" }} >Admin</a>}
                        {!this.state.userInfor &&

                            <a href='/login' style={{ fontSize: "20px", fontWeight: "bold", marginRight: "15px" }}>Login</a>}
                        {!this.state.userInfor && <a href="/signup" style={{ fontSize: "20px", fontWeight: "bold", marginRight: "30px" }}>Signup</a>
                        }

                    </div>


                    <Login visible={this.state.visible} setVisible={this.setVisible} />

                </Row>

            </div >
        );
    }
}
export default Header;




