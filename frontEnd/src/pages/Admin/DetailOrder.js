import React from 'react';
import { Row, Menu, Image, Input, Popover, Button, Form, Select, Col, Steps } from 'antd'
import RowCart from '../../components/rowCart/rowCart'
import { UserOutlined } from '@ant-design/icons'
import logo from '../../assests/logo.png'
import { server } from '../../enviroment'
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
import { reactLocalStorage } from 'reactjs-localstorage';
const { Search } = Input;
const { Step } = Steps;
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
        step: "",
        current: 1

    }
    async componentDidMount() {
        const { match: { params } } = this.props;
        let id = params.id;
        axios.get(server + 'api/Orders/' + id).then(resp => {
            console.log(resp.data)
            this.state.purchase = resp.data.data != null ? resp.data.data : {};
            let orderstate = this.state.purchase.order.state
            if (orderstate == "cancel") this.state.step = "error";
            else if (orderstate == "deliveried") this.state.step = "finish";
            else this.state.step = "process"
            if (orderstate == 'pending') this.state.current = 1;
            else if (orderstate == "approved") this.state.current = 2;
            else if (orderstate == 'in process') this.state.current = 3;
            else if (orderstate == 'deliveried') this.state.current = 4;
            else this.state.current = 5;

            this.setState(this.state)
        }).catch(e => {
            throw e;
        });
    }
    approved = (name, event) => {
        debugger
        event.preventDefault();
        const { match: { params } } = this.props;
        let id = params.id;

        axios.patch(server + 'api/Orders/' + id + "?state=" + name).then(resp => {

            this.state.purchase = resp.data.data != null ? resp.data.data : {};
            this.setState(this.state)
        }).catch(e => {
            throw e;
        });
    }

    render() {
        let userInfo = reactLocalStorage.get("token");
        return (



            <div>
                <div style={{ display: "flex", justifyContent: "center", flexDirection: 'column' }}>

                    <div style={{ marginTop: '20px', marginBottom: "20px" }}>
                        <Row justify="space-between" >
                            <div style={{ fontSize: "25px", fontWeight: "bold" }}> <span style={{ padding: "35px" }}>Order #{this.state.purchase.order.id && this.state.purchase.order.id.substring(0, 4)}</span></div>
                            <div style={{ width: "50vw", marginRight: "35px" }}>
                                <Steps direction="horizontal" current={this.state.current} status={this.state.step}>
                                    <Step title="Pending"></Step>
                                    <Step title="Approved"></Step>
                                    <Step title="In Progress" />
                                    <Step title="Deliveried"></Step>
                                    {this.state.purchase.order.state == "cancel" && <Step title="Cancel" />}
                                </Steps>
                            </div>

                        </Row>
                        <Row align="middle" justify="space-between">

                            <div style={{ fontSize: "23px", marginLeft: "35px" }}>Total <span style={{ fontSize: "23px", fontWeight: "bold" }}>{currencyFormat(this.state.purchase.order.amount)}</span> </div>


                            <div style={{ marginRight: "25px" }}>
                                {this.state.purchase.order.state == 'pending' && <Button type="button" onClick={e => this.approved("approved", e)} style={{ marginRight: "15px" }}>Approved</Button>}
                                {this.state.purchase.order['state'] == 'pending' && <Button type="button" onClick={e => this.approved("cancel", e)} style={{ marginRight: "15px" }} >Cancel</Button>}
                                {this.state.purchase.order.state == 'approved' && <Button type="button" onClick={e => this.approved("in progress", e)} style={{ marginRight: "15px" }}>In progress</Button>}
                                {this.state.purchase.order.state == 'in progress' && <Button type="button" onClick={e => this.approved("deliveried", e)} style={{ marginRight: "15px" }}>Deliveried</Button>}
                            </div>
                        </Row>
                        <div style={{ textAlign: "center", fontSize: '22px', fontWeight: "bold", marginBottom: "15px" }}>Order details</div>
                        <Row justify="center" align="middle">
                            <div style={{ width: "70vw" }}>
                                <Form

                                    labelCol={{ span: 3, offset: 5 }}
                                    labelAlign="left"
                                    name="order"
                                    initialValues={{

                                        prefix: '84',
                                    }}
                                    scrollToFirstError={true}
                                >

                                    <Form.Item
                                        name="receiver"
                                        label="Receiver "

                                        style={{
                                            display: 'flex', justifyContent:
                                                'center', width: 'calc(80% - 8px)'
                                        }}
                                    >
                                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.receiver}</span>

                                    </Form.Item>
                                    <Form.Item
                                        name="phone"
                                        label="Phone Number"

                                        style={{
                                            display: 'flex', justifyContent:
                                                'center', width: 'calc(80% - 8px)'
                                        }}
                                    >
                                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.phoneNumber}</span>

                                    </Form.Item>

                                    <Input.Group compact style={{
                                        display: 'flex', justifyContent:
                                            'space-between', width: 'calc(75% - 8px)', marginLeft: '11%'
                                    }}>
                                        <Form.Item name='province'
                                            label="Province"
                                            labelCol={{ span: 4, offset: 5 }}
                                            style={{
                                                display: 'flex', justifyContent:
                                                    'space-around', width: '33%'
                                            }} >
                                            <div style={{ fontSize: "18px", fontWeight: "bold", marginLeft: "15px" }}>{this.state.purchase.order.province}</div>

                                        </Form.Item>
                                        <Form.Item name='district' style={{
                                            display: 'flex', justifyContent:
                                                'space-around', width: '33%', textAlign: "center"
                                        }}
                                            labelCol={{ span: 4, offset: 8 }}
                                            label="District"
                                        >
                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.district}</span>


                                        </Form.Item>
                                        <Form.Item name='ward' label="Ward" style={{
                                            display: 'flex', justifyContent:
                                                'space-around', width: '33%'
                                        }}
                                            labelCol={{ span: 6, offset: 2 }}
                                        >
                                            <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.ward}</span>


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

                                    >
                                        <span style={{ fontSize: "18px", fontWeight: "bold" }}>{this.state.purchase.order.address}</span>


                                    </Form.Item>
                                </Form>
                            </div>
                        </Row>
                        <Row align="middle" justify="center" >
                            {this.state.purchase.details.map(data => (<RowCart product={data} isCheckout={true}>
                            </RowCart>
                            ))}
                        </Row>
                        <Row justify="end" style={{ width: "70vw" }}>
                            <Col span={2} offset={7} style={{ fontSize: "24px" }}>Total:</Col>
                            <Col span={2} offset={1} style={{ fontSize: "24px", fontWeight: "bold" }}>
                                {currencyFormat(this.state.purchase.order.amount)}</Col>
                        </Row>

                    </div>


                </div>

            </div>


        )
    }
}
export default DetailOrder;
