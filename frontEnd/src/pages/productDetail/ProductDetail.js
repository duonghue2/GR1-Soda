import React from 'react'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import { Row, Col, Image, InputNumber, Tabs } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ShoppingCartOutlined, HeartOutlined, RightOutlined, StarFilled } from '@ant-design/icons'
import { currencyFormat } from '../../utils/function'
import ItemProduct from '../../components/product/ItemProduct'
import './ProductDetail.css'
import  image from '../../assests/Product/1.jpg'

import image1 from '../../assests/Product/1-19.jpg'
import image2 from '../../assests/Product/2-19.jpg'
import image3 from '../../assests/Product/3-12.jpg'
import image4 from '../../assests/Product/4-5.jpg'
import image5 from '../../assests/Product/5.jpg'
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
const product={
  name:"Azure tote",
  describe:"this is a shirt",
  price:"$150",
  state:"new",
  id:1
}
const loop=[1,1,1,1]
class ProductDetail extends React.Component {
  state = {
    product: {
      name: "Crewneck Blouse",
      category: "Woman",
      id: "4",
      image: [image1, image2, image3, image4, image5],
      description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      rate: 5,
      max: 35,
      price: 215

    }
  }
  callback = () => {

  }
  addToCart=(i)=>{
    let listProduct=[];
    let j=  localStorage.getItem("cart");
    if(!j){listProduct.push(i);}
    else{
    listProduct=[...j];
    listProduct.push(i);}
  localStorage.setItem("cart",listProduct);
  console.log(localStorage.getItem("cart"));
  }
  render() {
    return (
      <div>
        <Header />
        <div className="content">
          <Row align="middle" className=" route">
            Home  <RightOutlined  className="router"/> {this.state.product.category} <RightOutlined  className="router" />  {this.state.product.name}
          </Row>
          <Row>
            <Col lg={12} xl={12} md={12} xs={24}>{
              this.state.product.image.map((item, index) => (
                <Image src={item} key="index" style={{ marginBottom: "15px" }} />
              ))
            }

            </Col>
            <Col lg={12} xl={12} md={12} xs={24} className="pl-5 text-center">
              <div className="sticky">
                <Row align="middle" justify="center" >
                  <h1 style={{ fontSize: "32px" }} className="mt-5"> <a href={"/product/" + this.state.product.id}>{this.state.product.name}</a></h1>
                </Row>
                <Row align="middle" justify="center">
                  <p style={{ fontSize: "18px", paddingRight: "15px" }}>{this.state.product.description}</p>
                </Row>
                <Row align="middle" justify="center">
                  <span><StarFilled style={{ color: "#ffb136" }} /> <StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /><StarFilled style={{ color: "#ffb136" }} /></span>

                </Row>
                <Row align="middle" justify="center"> (0 customer reviews)</Row>
                <br />
                <Row align="middle" justify="center">
                  <span className="price">{currencyFormat(this.state.product.price)}</span>
                </Row>
                <br />
                <br />
                <Row align="middle" justify="center">
                  <InputNumber min={1} max={this.state.product.max} defaultValue={1} onChange={this.onChange} size="large" />
                  <button className="primary-btn" onClick={()=>this.addToCart(this.state.product)}> <ShoppingCartOutlined style={{ color: 'white', fontSize: "28px", alignSelf: 'center' }} /><span style={{ paddingLeft: "5px", fontSize: "20px" }}>  Add to cart </span></button>
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
            <Review review={review}/>
            </TabPane>

          </Tabs>


        </div>
<div>
  <Row align="middle" justify="center">  <span className="related-product">Our offer</span></Row>
<Row align="start" justify="space-around">
{loop.map((item,index)=>(
  <Col lg={5} xl={5}>
  <ItemProduct key={index}  source={image} product={product} {...this.props}/>
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