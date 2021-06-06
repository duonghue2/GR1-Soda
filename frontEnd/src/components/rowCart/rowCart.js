import React from 'react';
import { Row } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { currencyFormat } from '../../utils/function'
import './rowCart.css'
class RowCart extends React.Component {
    delete = (id) => {
        let data = localStorage.getItem('Cart');
        console.log(data);
    }
    render() {
        console.log(this.props.product)
        return (
            <div className="mt-5">
                <Row align="middle" justify="space-between" style={{ width: "50vw" }}>
                    <div>
                        <img src={this.props.product.image} width="150" height="150" />
                        <a className="cartItem ml-5" href={"/products/" + this.props.product.id}>{this.props.product.name}</a></div>
                    <div className="cartItem"> Qty:   <input value={this.props.product.qty} type="number" onChange={(e) => this.props.onchangeQty(this.props.product.id, e)} /></div>
                    <div className="cartItem"> {currencyFormat(this.props.product.price)}</div>
                    <div className="cartItem"> <CloseOutlined onClick={() => this.delete(this.props.product.detailId)} /></div>
                </Row>

            </div>
        )
    }
}
export default RowCart;