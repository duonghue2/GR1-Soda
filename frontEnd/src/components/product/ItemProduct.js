import React from 'react';
import { Image, Row, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons'
import ProductDetail from './ProductDetail'
import defaultImage from '../../assests/Product/1.jpg'
import './ItemProduct.css'
class ItemProduct extends React.Component {
    state = {
        className: "Hidden",
        visible: false
    }
    showCart = () => {
        this.setState({ className: "Display" })
    }
    hiddenCart = () => {
        this.setState({ className: "Hidden" })
    }
    addToCart = (i) => {


        let listProduct = [];
        let item = {};
        let flag = 0;

        let j = JSON.parse(JSON.parse(localStorage.getItem("Cart")));
        if (!j) {
            listProduct.push(item);
        }
        else {

            listProduct = [...j];
            listProduct.forEach(item => {
                if (item.id === i.id) {
                    item.qty++;
                    flag = 1;
                }
            })
            if (flag === 0) listProduct.push(i);
        }

        localStorage.setItem("Cart", JSON.stringify(JSON.stringify(listProduct)));
        message.success('Add ' + i.name + ' into cart');


    }
    addToWishlist = () => { }
    showDetail = () => {
        this.setState({
            visible: true
        })
    }
    setVisible = (e) => {
        this.setState({
            visible: e
        })
    }


    render() {
        const { match, location, history } = this.props
        // console.log(this.props.product)
        return (
            <div style={{ paddingLeft: "40px", paddingRight: "40px" }} >
                <div style={{ position: "relative" }}>
                    <Image src={this.props.product.images[0] || defaultImage} alt="" onMouseMove={this.showCart} onMouseOut={this.hiddenCart} preview={false} onClick={this.showDetail} />
                    <Row align="middle" justify="center" className={this.state.className} onMouseMove={this.showCart} onMouseOut={this.hiddenCart}>
                        <div className="circle" onClick={() => this.addToCart(this.props.product)}><ShoppingCartOutlined style={{ color: 'white', fontSize: "32px", alignSelf: 'center', paddingTop: "5px" }} /></div>
                        <div className="circle" onClick={this.addToWishlist}><HeartOutlined style={{ color: 'white', fontSize: "32px", alignSelf: 'center', paddingTop: "5px" }} /></div>
                    </Row>
                    {this.props.product.state && <div className={this.props.product.state == "new" ? "new" : "sale"}>
                        <span className="pl-5 p-auto"> {this.props.product.state}</span>
                    </div>}

                </div>
                <div className="mt-5 mb-5">
                    <Row align="middle" justify="center">
                        <span className="nameProduct" onClick={() => history.push('/products/' + this.props.product.id)}>{this.props.product.name}</span>
                    </Row>
                    <Row align="middle" justify="center">
                        <span className="bold">{this.props.product.detail[0] ? this.props.product.detail[0].price : 10}</span>

                    </Row>
                </div>
                <ProductDetail visible={this.state.visible} product={this.props.product} setVisible={this.setVisible} />
            </div>
        )
    }
}
export default ItemProduct