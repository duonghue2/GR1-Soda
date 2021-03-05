import React from 'react';
import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import {Row,Menu,Col} from 'antd';
import ItemProduct from '../../components/product/ItemProduct';
import Footer from '../../components/footer/Footer';
import DisplayListProduct from '../../components/product/DisplayListProduct'
import  image from '../../assests/Product/1.jpg'
const product={
  name:"Azure tote",
  describe:"this is a shirt",
  price:"$150",
  state:"new",
  id:1
}
class Home extends React.Component{
    state = {
        current: 'bestSellers',
        numberItem:[1,1,1,1,1,1,1,1,1,1,1,1,1,1]
      };
    
      handleClick = e => {
        this.setState({ current: e.key });
        if(e.key=="bestSeller"){
          //get all best seller
        }
        else if(e.key=="newProduct"){
          //ger all newProduct
        }
        else {
          //get sale product
        }
      };
    render(){
        const { current } = this.state;
        return(
            <div>
                <Header/>
             <Banner/>
             <div>
            <Row align='middle' justify='center' style={{marginTop:"15px",marginBottom:"15px"}}>
            
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="bestSeller" >
          <span style={{fontSize:"24px"}}>Best sellers</span>
        </Menu.Item>
        <Menu.Item key="newProduct"  >
        <span style={{fontSize:"24px"}}>New Product</span>
        </Menu.Item>
        <Menu.Item key="saleProduct"  >
        <span style={{fontSize:"24px"}}>Sale Product</span>
        </Menu.Item>
        </Menu>
            </Row>
             </div >
           <DisplayListProduct numberItem={this.state.numberItem} source={image} product={product} {...this.props}/>
             <Footer/>
            </div>
          
        )
    }
}
export default Home;