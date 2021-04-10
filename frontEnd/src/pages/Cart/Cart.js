import React from 'react';
import { Row, Col, Tabs } from 'antd'
import { Footer } from 'antd/lib/layout/layout';
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import Image from '../../assests/Product/1.jpg'
import './Cart.css'
const { TabPane } = Tabs;
const product = {
  name: "Blue raincoat",
  id: 1,
  url: Image,
  quantity: 6,
  price: 30000
}
class Cart extends React.Component {
  state = {
    listProduct: [],
    wishlist: []
  }
  componentDidMount() {
    let cart = localStorage.getItem("Cart");
    if (cart.length != 0) {
      cart = JSON.parse(JSON.parse(cart));
    }
    else cart = [];
    let wishlist = localStorage.getItem("Wishlist");
    if (wishlist && wishlist.length != 0) {
      wishlist = JSON.parse(JSON.parse(wishlist));
    }
    else wishlist = []
    this.setState({
      wishlist: wishlist
    })
  }
  render() {
    return (
      <div className='flex-center'>
        <Header></Header>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>

            <Tabs defaultActiveKey="1" onChange={this.callback} centered={true}>
              <TabPane tab={<Row justify="center" align="middle">

                Shopping Cart
          <div className="qty">
                  {this.state.listProduct.length}
                </div>
              </Row>} key="1">

                <Row align="middle" justify="center">
                  {this.state.listProduct.map(item => (<RowCart product={item}>
                  </RowCart>
                  ))}
                  {this.state.listProduct.length != 0 && <div className="btn-checkout">

                    <span>{this.state.total}</span>|<span>CHECKOUT</span>

                  </div>}

                  {this.state.listProduct.length === 0 && <div>
                    <span>No product in the cart</span>
                  </div>}
                </Row>

              </TabPane>
              <TabPane tab={
                <Row justify="center" align="middle">Wishlist
               <div className="qty">
                    {this.state.listProduct.length}
                  </div>
                </Row>
              } key="2">
                {this.state.wishlist.map(item => (<RowCart product={item}>
                </RowCart>
                ))}


                {this.state.wishlist.length === 0 && <div>
                  <span>No product in the wishlist</span>
                </div>}
              </TabPane>
              <TabPane tab="Other Tracking" key="3">

              </TabPane>

            </Tabs>

          </div>

        </div>
      </div>
    )
  }
}
export default Cart;
