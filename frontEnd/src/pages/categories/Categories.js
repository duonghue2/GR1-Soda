import React from 'react';
import Header from '../../components/header/Header.js'
import PageHeading from '../../assests/collection2.jpg'
import ManHeading from '../../assests/men-dropdown2.jpg'
import {  RightOutlined } from '@ant-design/icons'
import {Row} from 'antd'
import "./Categories.css"
import DisplayListProduct from '../../components/product/DisplayListProduct'
import  image from '../../assests/Product/1.jpg'
import ProductDetail from '../../components/product/ProductDetail.js';
const product={
  name:"Azure tote",
  describe:"this is a shirt",
  price:"$150",
  state:"new",
  id:1
}
class Categories extends React.Component{
  state = {
    current: 'bestSellers',
    numberItem:[1,1,1,1,1,1,1,1,1,1,1,1]
  };

render(){
  const { match: { params } } = this.props;
  console.log(params);
  if(params.sex==="man"||params.sex==="women")
    return(
    <div>
<Header></Header>
<div   className="text-white verticle " style={{backgroundImage:`url(${params.sex=="women"?PageHeading:ManHeading})`,height:"80vh", marginRight:"25px",marginLeft:"25px"}}>
 <Row align="center" justify="center" > <span  className="title"> {params.categories}</span></Row>
  <Row  align="center" justify="center"><span  className="subTitle"> {params.sex} -<RightOutlined  className="router"/>{params.categories}</span></Row>
</div>
<DisplayListProduct numberItem={this.state.numberItem} source={image} product={product} {...this.props}/>
    </div>)
    else return(<div>
{/* 

      <ProductDetail /> */}
    </div>)
}
}
export default Categories;