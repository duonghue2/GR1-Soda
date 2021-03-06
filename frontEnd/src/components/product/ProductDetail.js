import React from 'react';
import {Modal,Row,Carousel,Image,Col, Button} from 'antd';
import {StarFilled} from '@ant-design/icons'
import image1 from '../../assests/Product/1-19.jpg'
import image2 from '../../assests/Product/2-19.jpg'
import image3 from '../../assests/Product/3-12.jpg'
import image4 from '../../assests/Product/4-5.jpg'
import image5 from '../../assests/Product/5.jpg'
  import {currencyFormat} from '../../utils/function'
class ProductDetail extends React.Component{
 state={
  product:{
    name:"Lace Up Sneakers",
    description:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    url:[image1,image2,image3,image4,image5],
    price:"235",
    review:5,
    id:1,
    max:15
  }
 }
 onChange=()=>{
   //add to order
 }
  
  componentDidMount(){
     //get infor
     
     
   }
   
    render(){
        return(
            <Modal
        centered
        visible={this.props.visible}
        onCancel={()=>this.props.setVisible(false)}
        closable={true}
        width={1000}
        footer={null}
      >
        <Row >
          <Col lg={12} xs={12} md={12}>
          <Carousel autoplay={true} effect="fade">
    {this.state.product.url.map((item,index)=>(
      <div>
      <Image src={item} alt={index}/>
    </div>
    ))
    }
  </Carousel>,
          </Col >
          <Col lg={12} xs={12} md={12} className="pl-5 text-center">
            <Row align="middle" justify="center">
             <h1 style={{fontSize:"32px"}}> <a href={"/product/"+this.state.product.id}>{this.state.product.name}</a></h1>
            </Row>
            <Row align="middle" justify="center">
              <p>{this.state.product.description}</p>
            </Row>
            <Row align="middle" justify="center">
              <span><StarFilled style={{color:"#ffb136"}} /> <StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}}/><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}}  /></span>

            </Row>
            <Row align="middle" justify="center"> (0 customer reviews)</Row>
          <br/>
            <Row align="middle" justify="center">
              <span className="price">{currencyFormat(this.state.product.price)}</span>
            </Row>
            <Row>
            <InputNumber min={1} max={this.state.product.max} defaultValue={1} onChange={onChange} />
            <Button icon={<ShoppingCartOutlined style={{color:'white',fontSize:"32px",alignSelf:'center'}}/>} onClick={this.addToCart}> Add to cart</Button>
            <Button icon={<HeartOutlined  style={{color:'white',fontSize:"32px",alignSelf:'center'}} />} onClick={this.addToWishlist} /> 
            </Row>
          </Col>
        </Row>
      </Modal>
        )
    }
}
export default ProductDetail;