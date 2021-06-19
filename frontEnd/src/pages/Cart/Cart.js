import React from 'react';
import { Row, Col, Tabs, message } from 'antd'
import RowCart from '../../components/rowCart/rowCart'
import Header from '../../components/header/Header'
import { server } from '../../enviroment'
import './Cart.css'
import { reactLocalStorage } from 'reactjs-localstorage';
import { currencyFormat } from '../../utils/function'
import axios from 'axios';
import Login from '../../components/login/Login'
import Footer from '../../components/footer/Footer';
const { TabPane } = Tabs;
class Cart extends React.Component {
  state = {
    listProduct: [],
    wishlist: [],
    isLogin: false,
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
  onchangeQty = async (id, qty) => {
    debugger;
    if (qty > 0 && qty) {
      var update = this.state.listProduct.find(s => s.id == id);
      if (update.maxQty < qty) message.error("")
      this.state.listProduct.find(s => s.id == id).qty = qty;

      let userId = reactLocalStorage.getObject("userInfo").userId;
      let token = reactLocalStorage.get("token");
      let payload = {
        token, userId,
        id,
        listCart: []
      }
      this.state.listProduct.forEach(s => {
        var item = {
          id: s.id,
          userId,
          productDetailId: s.productDetailId,
          quantity: s.qty,
          amount: s.price,
        }
        payload.listCart.push(item);
      })
      await axios.post(server + 'api/Carts/update', payload).then(resp => {
        this.state.listProduct = resp.data.data != null ? resp.data.data.listProduct : [];
        this.state.total = resp.data.data != null ? resp.data.data.total : 0;
        this.setState(this.state)
      })


    } else message.error("Quantity must be greater than 0");
  }
  delete = async (id) => {
    let token = reactLocalStorage.get("token");
    let userId = reactLocalStorage.getObject("userInfo").userId;
    if (userId) {
      let payload = {
        token, userId,
        id
      }

      await axios.post(server + 'api/Carts/delete', payload).then(resp => {
        this.state.listProduct = resp.data.data != null ? resp.data.data.listProduct : [];
        this.state.total = resp.data.data != null ? resp.data.data.total : 0;
        this.setState(this.state)
      })
    }
  }

  async componentDidMount() {
    let token = reactLocalStorage.get("token");
    let userId = reactLocalStorage.getObject("userInfo").userId;
    if (userId) {
      let payload = {
        token, userId
      }
      axios.post(server + 'api/Carts/get-detail-by-user', payload).then(resp => {
        this.state.listProduct = resp.data.data != null ? resp.data.data.listProduct : [];
        this.state.total = resp.data.data != null ? resp.data.data.total : 0;
        this.setState(this.state)
      }).catch(e => {
        throw e;
      });
    } else {
      this.login();
    }
  }
  login = () => {
    this.setState({
      isLogin: !this.state.isLogin
    })
  }
  checkout = (e) => {
    e.preventDefault();
    this.props.history.push("/checkout")
  }
  render() {
    let token = reactLocalStorage.get("token");
    if (!token) window.location = "/"

    if (token)
      return (
        <div className='flex-center'>
          <Header></Header>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>

              <Tabs defaultActiveKey="1" onChange={this.callback} centered={true}>
                <TabPane tab={<Row justify="center" align="middle" >

                  Shopping Cart
                  <div className="qty">
                    {this.state.listProduct && this.state.listProduct.length || 0}
                  </div>
                </Row>} key="1">

                  <Row align="middle" justify="center">
                    {this.state.listProduct && this.state.listProduct.map(item => (<RowCart product={item} onChangeQty={(a, b) => this.onchangeQty(a, b)} delete={(x) => this.delete(x)} isCheckout={false}>
                    </RowCart>
                    ))}


                    {this.state.listProduct.length != 0 && <Row align="middle" justify="end" style={{ width: '50vw', marginBottom: "50px", marginTop: '20px' }}>


                      <button className="btn-checkout" onClick={e => this.checkout(e)}  >

                        <div style={{
                          // width: '201px',
                          fontSize: '25px'
                        }}><span style={{ marginRight: "20px" }}>Total :  {currencyFormat(this.state.total)}</span>
                          | CHECKOUT
                        </div>
                      </button>
                    </Row>
                    }

                    {this.state.listProduct.length === 0 && <div>
                      <div style={{ fontSize: "20px", height: "80vh" }}>Empty Cart</div>
                    </div>}
                  </Row>

                </TabPane>
                {/* <TabPane tab={
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
                    <span style={{ fontSize: "20px" }}>Empty Wishlist</span>
                  </div>}
                </TabPane>
                <TabPane tab="Other Tracking" key="3">

                </TabPane> */}

              </Tabs>
              <Login visible={this.state.isLogin} setVisible={this.checkout} />
            </div>

          </div>
          <Footer></Footer>
        </div>
      )
  }
}
export default Cart;
