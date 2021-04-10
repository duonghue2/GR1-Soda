import React from 'react';
import { Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import './rowCart.css'
class RowCart extends React.Component {
    delete = (id) => {
        let data = localStorage.getItem('Cart');
        console.log(data);
    }
    render() {
        console.log(this.props.product)
        return (
            <div style={{ display: "flex", justifyContent: "center" }} className="mt-5">
                <Row align="middle" justify="space-between" style={{ width: "50vw" }}>
                    <div><img src={this.props.product.url} width="150" height="150" /> <a className="cartItem ml-5" href={"/products/" + this.props.product.id}>{this.props.product.name}</a></div>
                    <div className="cartItem"> Qty:   {this.props.product.qty} </div>
                    <div className="cartItem"> {this.props.product.price}</div>
                    <div className="cartItem"> <CloseOutlined onClick={() => this.delete(this.props.product.id)} /></div>
                </Row>
            </div>
        )
    }
}
export default RowCart;