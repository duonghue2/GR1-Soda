import React from 'react';
import { Row, Col, Tabs, message } from 'antd'
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import { server } from '../../enviroment'
import './Cart.css'
import { reactLocalStorage } from 'reactjs-localstorage';
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
const { TabPane } = Tabs;
class Cart extends React.Component {
  state = {
    listProduct: [],
    wishlist: []
  }
  // componentDidUpdate(prevState) {
  //   let cart = reactLocalStorage.getObject("Cart");
  //   let wishlist = reactLocalStorage.getObject("Wishlist");
  //   if (cart.length != prevState.cart.length) {
  //     this.state.cart = cart

  //   }
  //   if (wishlist.length != prevState.wishlist.length) {
  //     this.state.wishlist = wishlist
  //   }
  //   this.setState(cart, wishlist)
  // }
  onchangeQty(id, qty) {

    let change = this.state.listProduct.find(s => s.id = id);
    change.qty = qty;
    this.setState(this.state);
  }
  async componentDidMount() {
    let isLogin = reactLocalStorage.get("token");
    let userInfo = reactLocalStorage.getObject("userInfo");
    if (userInfo) {
      debugger
      axios.get(server + 'api/Carts/get-detail-by-user/' + userInfo.userId).then(resp => {
        this.state.listProduct = resp.data.data.listProduct;
        this.state.total = resp.data.data.total;
        this.setState(this.state)
      }).catch(e => {
        throw e;
      });
    } else message.warning("Login to see your cart");
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
                  {this.state.listProduct && this.state.listProduct.length || 0}
                </div>
              </Row>} key="1">

                <Row align="middle" justify="center">
                  {this.state.listProduct && this.state.listProduct.map(item => (<RowCart product={item} onChangeQty={x => this.onchangeQty(x)}>
                  </RowCart>
                  ))}


                  {this.state.listProduct.length != 0 && <Row align="middle" justify="end" style={{ width: '50vw' }}>

                    <div style={{
                      width: '201px',
                      fontSize: '25px'
                    }}><span style={{ marginRight: "20px" }}>Total : </span> {currencyFormat(this.state.total)}</div>
                    <button className="btn-checkout"   >

                      CHECKOUT

                  </button>
                  </Row>
                  }

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
