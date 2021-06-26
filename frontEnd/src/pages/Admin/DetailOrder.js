import React from 'react';
import { Row, Menu, Image, Input, Popover, Button } from 'antd'
import RowCart from '../../components/rowCart/rowCart'
import { UserOutlined } from '@ant-design/icons'
import logo from '../../assests/logo.png'
import { server } from '../../enviroment'
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
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
class DetailOrder extends React.Component {
    state = {
        purchase: {
            order: {},
            details: []
        },

    }
    async componentDidMount() {
        const { match: { params } } = this.props;
        let id = params.id;
        axios.get(server + 'api/Orders/' + id).then(resp => {
            console.log(resp.data)
            this.state.purchase = resp.data.data != null ? resp.data.data : {};
            this.setState(this.state)
        }).catch(e => {
            throw e;
        });
    }
    approved = (e) => {
        debugger

        const { match: { params } } = this.props;
        let id = params.id;
        axios.patch(server + 'api/Orders/' + id, e).then(resp => {

            this.state.purchase = resp.data.data != null ? resp.data.data : {};
            this.setState(this.state)
        }).catch(e => {
            throw e;
        });
    }

    render() {
        let userInfo = reactLocalStorage.get("token");
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

                <div>
                    <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>

                        <div style={{ marginTop: '20px', marginBottom: "20px" }}>
                            <Row justify="space-between" >
                                <div style={{ fontSize: "25px", fontWeight: "bold" }}> <span style={{ padding: "35px" }}>Order #{this.state.purchase.order.id && this.state.purchase.order.id.substring(0, 4)}</span></div>
                                <Row align="middle" justifyContent="space-around" style={{ width: "20vw" }}>
                                    {this.state.purchase.order.state == 'pending' && <Button type="button" onClick={e => this.approved("approved")}>Approved</Button>}
                                    {this.state.purchase.order['state'] == 'pending' && <Button type="button" onClick={this.approved("cancel")} >Cancel</Button>}
                                    {this.state.purchase.order.state == 'approved' && <Button type="button" onClick={this.approved("in progress")}>In progress</Button>}
                                    {this.state.purchase.order.state == 'in progress' && <Button type="button" onClick={this.approved("deliveried")}>Deliveried</Button>}
                                </Row>
                            </Row>
                            <Row>
                                <div>Total <span style={{ padding: "35px" }}>{currencyFormat(this.state.purchase.order.amount)}</span> </div>
                                <div>State <span style={{ padding: "35px" }}>{this.state.purchase.order['state']}</span></div>
                            </Row>

                            <Row align="middle" justify="center" >
                                {this.state.purchase.details.map(data => (<RowCart product={data} isCheckout={true}>
                                </RowCart>
                                ))}
                            </Row>

                        </div>


                    </div>

                </div>

            </div>
        )
    }
}
export default DetailOrder;
