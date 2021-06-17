import React from 'react';
import { Row, InputNumber } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { currencyFormat } from '../../utils/function'
import './rowCart.css'
class RowCart extends React.Component {

    render() {

        return (
            <div className="mt-5">
                <Row align="middle" justify="space-between" style={{ width: "50vw" }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <img src={this.props.product.image} width="150" height="150" />
                        <a className="cartItem ml-5" href={"/products/" + this.props.product.id}>{this.props.product.name}</a></div>
                    <div className="cartItem">Size: {this.props.product.size ? this.props.product.size : "One size"}</div>
                    <div className="cartItem"> Qty:   <InputNumber value={this.props.product.qty} max={this.props.product.maxQty} min={1} className={this.props.isCheckout ? "checkout-input" : "cart-input"} type="number" onChange={e => this.props.onChangeQty(this.props.product.id, e)} disabled={this.props.isCheckout} /></div>
                    <div className="cartItem"> {currencyFormat(this.props.product.price)}</div>
                    {!this.props.isCheckout &&
                        <div className="cartItem"> <CloseOutlined onClick={() => this.props.delete(this.props.product.id)} /></div>}
                </Row>

            </div>
        )
    }
}
export default RowCart;