import React from 'react';
import { Modal, Row, Carousel, Image, Col, InputNumber, message } from 'antd';
import { ShoppingCartOutlined, HeartOutlined, StarFilled } from '@ant-design/icons'
import { currencyFormat } from '../../utils/function'
import './ItemProduct.css'
import { reactLocalStorage } from 'reactjs-localstorage';
import { server } from '../../enviroment'
import Login from '../login/Login'
import axios from 'axios';
class ProductDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      detailId: 0,
      max: 10,
      qty: 0,
      price: this.props.product.detail[0] ? this.props.product.detail[0].price : 0
    }
  }

  onChange = (e) => {
    //add to order
    this.state.qty = e; this.setState(this.state);
    console.log("number:", e)
  }
  handleSize = (e) => {
    this.state.detailId = e;
    this.state.max = this.props.product.detail[e].quantity;
    this.state.price = this.props.product.detail[e].price;
    console.log(this.props.product.detail[e].price)
    this.setState(this.state)
  }
  addToCart = async () => {
    let token = reactLocalStorage.get("token");
    let userInfo = reactLocalStorage.getObject("userInfo");

    if (token) {
      const payload = {
        userId: userInfo.userId,
        productDetailId: this.props.product.detail[this.state.detailId].id,
        quantity: this.state.qty || 1,
        amount: this.state.price,
        token
      }

      await axios.post(server + 'api/Carts/Create', payload).then((response) => {

        if (response.status == 201)
          message.success("Add item into cart successfully!")

      }, (error) => {
        message.error("Some error occurs, pls try again");
      });

      this.props.setVisible(false);
    }
    else {
      this.state.isLogin = true;
      this.setState(this.state);
    }
  }
  login = (e) => {
    e.preventDefault();

    this.setState({
      visible: !this.state.visible
    })
  }
  render() {
    return (
      <div>
        <Modal
          centered
          visible={this.props.visible}
          onCancel={() => this.props.setVisible(false)}
          closable={true}
          width={1000}
          footer={null}
        >
          <Row >
            <Col lg={12} xs={12} md={12}>
              <Carousel autoplay={true} effect="fade">
                {this.props.product.images.map((item, index) => (
                  <div key={index}>
                    <Image src={item} alt={index} />
                  </div>
                ))
                }
              </Carousel>
            </Col >
            <Col lg={12} xs={12} md={12} className="pl-5 text-center ">
              <Row align="middle" justify="center" >
                <h1 style={{ fontSize: "32px" }} className="mt-5"> <a href={"/products/" + this.props.product.id}>{this.props.product.name}</a></h1>
              </Row>
              <Row align="middle" justify="center">
                <p style={{ fontSize: "18px", paddingRight: "15px" }}>{this.props.product.description.toLowerCase()}</p>
              </Row>
              <Row align="middle" justify="center">
                <span><StarFilled style={{ color: "#ffb136" }} /> <StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /></span>

              </Row>
              <Row align="middle" justify="center"> (0 customer reviews)</Row>
              <br />
              <Row align="middle" justify="center">
                {this.props.product.originPrice != this.state.price && <span className="price" style={{ textDecorationLine: 'line-through', marginRight: "10px" }}>{currencyFormat(this.props.product.originPrice)}</span>}<span className="price">{currencyFormat(this.state.price)}</span>
              </Row>
              <br />

              <Row align="middle" justify="center" className="mb-3">
                {this.props.product.detail.map((item, index) => item.size && <button className="size" key={index} onClick={() => this.handleSize(index)}>
                  {item.size}
                </button>)}
              </Row>
              <br />
              <Row align="middle" justify="center">
                <InputNumber min={1} max={this.state.max} defaultValue={1} onChange={e => this.onChange(e)} size="large" />
                <button className="primary-btn" onClick={this.addToCart}> <ShoppingCartOutlined style={{ color: 'white', fontSize: "28px", alignSelf: 'center' }} /><span style={{ paddingLeft: "5px", fontSize: "20px" }}>  Add to cart </span></button>
                <button className="wishlist" onClick={this.addToWishlist} > <HeartOutlined style={{ fontSize: "28px", alignSelf: 'center', color: "#909097" }} /></button>
              </Row>
              <br />
              <br />
              <br />
              <hr />
              <Row algin="middle" justify="center">
                Category: <span className="bold">{this.props.product.category}</span>
              </Row>
            </Col>
          </Row>

        </Modal>
        <Login visible={this.state.isLogin} setVisible={this.login} />
      </div>
    )
  }
}
export default ProductDetail;