import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Row, Col, Image, InputNumber, Tabs, message } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShoppingCartOutlined, HeartOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { reactLocalStorage } from 'reactjs-localstorage';
import axios from 'axios'
import { server } from '../../enviroment'
import { currencyFormat } from '../../utils/function'
import ItemProduct from '../../components/product/ItemProduct'
import './ProductDetail.css'

import { faFacebookF, faTwitter, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';
import Review from './Review'
const { TabPane } = Tabs;

const review = [{
  user: "Gerhard",
  content: "Etenim nec iustitia nec amicitia esse omnino poterunt, nisi ipsae per se expetuntur. Quos quidem tibi studiose et diligenter tractandos magnopere censeo.",
  date: "28/12/2016",
  rate: 5
},
{
  user: "Gerhard",
  content: "Etenim nec iustitia nec amicitia esse omnino poterunt, nisi ipsae per se expetuntur. Quos quidem tibi studiose et diligenter tractandos magnopere censeo.",
  date: "28/12/2016",
  rate: 5
},
{
  user: "Gerhard",
  content: "Etenim nec iustitia nec amicitia esse omnino poterunt, nisi ipsae per se expetuntur. Quos quidem tibi studiose et diligenter tractandos magnopere censeo.",
  date: "28/12/2016",
  rate: 5
},
{
  user: "Gerhard",
  content: "Etenim nec iustitia nec amicitia esse omnino poterunt, nisi ipsae per se expetuntur. Quos quidem tibi studiose et diligenter tractandos magnopere censeo.",
  date: "28/12/2016",
  rate: 5
}
]


class ProductDetail extends React.Component {
  constructor(props) {
    super(props)
  }
  state = {
    product: {
      images: [],
      detail: []
    },
    offer: [],
    detailId: 0,
    max: 10,
    qty: 0,

  }
  callback = () => {

  }
  addToCart = async (e, i) => {
    e.preventDefault();
    let isLogin = reactLocalStorage.get("token");
    let userInfo = reactLocalStorage.getObject("userInfo");

    if (isLogin) {
      const payload = {
        userId: userInfo.userId,
        productDetailId: this.state.product.detail[this.state.detailId].id,
        quantity: this.state.qty || 1,
        amount: this.state.price,
      }

      await axios.post(server + 'api/Carts/Create', payload).then((response) => {

        if (response.status == 201)
          message.success("Add item into cart successfully!")

      }, (error) => {
        message.error("Some error occurs, pls try again");
      });


    }
    else {
      this.state.isLogin = true;
      this.setState(this.state);
    }

  }
  async componentDidMount() {
    const { id } = this.props.match.params
    try {
      await axios.get(server + 'api/Products/' + id).then((response) => {
        // console.log(response);
        if (response.data.status == 1)
          this.state.product = response.data.data


      }, (error) => {
        message.error("Some error occurs, pls try again");
      });
      await axios.post(server + 'api/Products/get-list-product', { page: 1, limit: 4 }).then((response) => {
        // console.log(response);
        if (response.data.status == 1)
          this.state.offer = response.data.data
        // console.log(this.state.listProduct)
      }, (error) => {
        message.error("Some error occurs, pls try again");
      });
      this.setState(this.state)

    } catch (error) {

    }

  }
  handleSize = (e) => {
    this.state.detailId = e;
    this.state.max = this.state.product.detail[e].quantity;
    this.state.price = this.state.product.detail[e].price;

    this.setState(this.state)
  }
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <Row align="middle" className=" route">
            Home  <RightOutlined className="router" /> {this.state.product.category} <RightOutlined className="router" />  {this.state.product.name}
          </Row>
          <Row>
            <Col lg={12} xl={12} md={12} xs={24}>{
              this.state.product.images.map((item, index) => (
                <Image src={item} key={index} style={{ marginBottom: "15px" }} />
              ))
            }

            </Col>
            <Col lg={12} xl={12} md={12} xs={24} className="pl-5 text-center">
              <div className="sticky">
                <Row align="middle" justify="center" >
                  <h1 style={{ fontSize: "32px" }} className="mt-5"> <a href={"/products/" + this.state.product.id}>{this.state.product.name}</a></h1>
                </Row>
                <Row align="middle" justify="center">
                  <p style={{ fontSize: "18px", paddingRight: "15px" }}>{this.state.product.description}</p>
                </Row>
                <Row align="middle" justify="center">
                  <span><StarFilled style={{ color: "#ffb136" }} /> <StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /></span>

                </Row>
                <Row align="middle" justify="center"> (4 customer reviews)</Row>
                <br />
                <Row align="middle" justify="center">
                  <span className="price">{this.state.product.detail.length == 0 ? currencyFormat(this.state.product.originPrice) : currencyFormat(this.state.product.detail[0].price)}</span>
                </Row>
                <br />
                <Row align="middle" justify="center" className="mb-3">
                  {this.state.product.detail.map((item, index) => item.size && <button className="size" key={index} onClick={() => this.handleSize(index)}>
                    {item.size}
                  </button>)}
                </Row>
                <br />
                <Row align="middle" justify="center">
                  <InputNumber min={1} max={this.state.product.max} defaultValue={1} onChange={this.onChange} size="large" />
                  <button className="primary-btn" onClick={(e) => this.addToCart(e, this.state.product)}> <ShoppingCartOutlined style={{ color: 'white', fontSize: "28px", alignSelf: 'center' }} /><span style={{ paddingLeft: "5px", fontSize: "20px" }}>  Add to cart </span></button>
                  <button className="wishlist" onClick={this.addToWishlist} > <HeartOutlined style={{ fontSize: "28px", alignSelf: 'center', color: "#909097" }} /></button>
                </Row>
                <br />
                <br />
                <br />

                <Row algin="middle" justify="center" style={{ height: "100px", borderTop: "1px solid #eaebee", borderBottom: "1px solid #eaebee", alignItems: "center" }}>

                  <p style={{ color: "#7c7c80" }}>Category: <span className="bold">{this.state.product.category}</span></p>
                </Row>

                <Row align="middle" justify="center" style={{ marginTop: "20px", color: "#909097" }}>
                  <FontAwesomeIcon icon={faTwitter} style={{ marginLeft: "15px", marginRight: "5px" }} /> TWITTER
                  <FontAwesomeIcon icon={faFacebookF} style={{ marginLeft: "15px", marginRight: "5px" }} /> FACEBOOK
                  <FontAwesomeIcon icon={faPinterest} style={{ marginLeft: "15px", marginRight: "5px" }} />PINTEREST
                </Row>
              </div>
            </Col>
          </Row>

          <div>

          </div>

          <Tabs defaultActiveKey="1" onChange={this.callback} centered={true}>
            <TabPane tab="Description" key="1">
              <Row align="middle" justify="center">
                <p>{this.state.product.description}</p>
              </Row>
            </TabPane>
            <TabPane tab="Review" key="2">
              <Review review={review} />
            </TabPane>

          </Tabs>


        </div>
        <div>
          <Row align="middle" justify="center">  <span className="related-product">Our offer</span></Row>
          <Row align="start" justify="space-around">
            {this.state.offer.map((item, index) => (
              <Col lg={5} xl={5}>
                <ItemProduct key={index} product={item} {...this.props} />
              </Col>
            ))}


          </Row>
        </div>
        <Footer />
      </div>
    )
  }
}
export default ProductDetail;