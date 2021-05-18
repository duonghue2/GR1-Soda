import React from 'react';
import { Row, Col, Tabs } from 'antd'
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import './Cart.css'
import { reactLocalStorage } from 'reactjs-localstorage';
const { TabPane } = Tabs;
class Cart extends React.Component {
  state = {
    listProduct: [],
    wishlist: []
  }
  componentDidUpdate(prevState) {
    let cart = reactLocalStorage.getObject("Cart");
    let wishlist = reactLocalStorage.getObject("Wishlist");
    if (cart.length != prevState.cart.length) {
      this.state.cart = cart

    }
    if (wishlist.length != prevState.wishlist.length) {
      this.state.wishlist = wishlist
    }
    this.setState(cart, wishlist)
  }
  componentDidMount() {
    let cart = reactLocalStorage.getObject("Cart");

    let wishlist = reactLocalStorage.getObject("Wishlist");

    this.setState({
      wishlist: wishlist,
      cart: cart
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
                {!this.state.wishlist.length && this.state.wishlist.map(item => (<RowCart product={item}>
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
