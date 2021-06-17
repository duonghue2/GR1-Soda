import React from 'react';
import { Row, Col, Tabs, message } from 'antd'
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import { server } from '../../enviroment'

import { reactLocalStorage } from 'reactjs-localstorage';
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
import Login from '../../components/login/Login'
import Footer from '../footer/Footer';
const { TabPane } = Tabs;
class History extends React.Component {
    state = {
        purchase: [],
        isLogin: false,
    }
    async componentDidMount() {
        let token = reactLocalStorage.get("token");
        let userInfo = reactLocalStorage.getObject("userInfo");
        if (userInfo) {
            var payload = {
                userId: userInfo.userId,
                token
            }
            axios.post(server + 'api/Orders/purchase', payload).then(resp => {
                debugger;
                this.state.purchase = resp.data.data != null ? resp.data.data : [];
                console.log(this.state.purchase)
                this.setState(this.state)
            }).catch(e => {
                throw e;
            });
        } else {
            this.login();
        }
    }

    render() {
        let token = reactLocalStorage.get("token");
        if (!token) window.location = "/login"
        if (token)
            return (
                <div className='flex-center'>
                    <Header></Header>
                    <div>
                        <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>
                            <Row align="middle" justify="center" style={{ fontSize: "25px", fontWeight: "bold" }}>History purchase</Row>
                            {this.state.purchase.map((item, index) =>
                                <div key={index} style={{ marginTop: '20px', marginBottom: "20px" }}>
                                    <Row justify="center" >
                                        <div style={{ border: "1px solid #8d9196", width: "50vw", marginBottom: '10px ' }}></div>

                                    </Row>
                                    <Row align="middle" justify="center" style={{ fontSize: "25px", fontWeight: "bold" }}> <span style={{ padding: "35px" }}>Order #{item.order.id.substring(0, 4)}</span> - <span style={{ padding: "35px" }}>{currencyFormat(item.order.amount)}</span> - <span style={{ padding: "35px" }}>{item.order.state}</span></Row>
                                    <Row align="middle" justify="center" key={index}>


                                        {item.details.map(data => (<RowCart product={data} isCheckout={true}>
                                        </RowCart>
                                        ))}






                                    </Row>

                                </div>
                            )}

                        </div>

                    </div>
                    <Footer />
                </div>
            )
    }
}
export default History;
