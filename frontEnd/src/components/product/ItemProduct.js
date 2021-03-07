import React from 'react';
import {Image,Row} from 'antd';
import{ShoppingCartOutlined,HeartOutlined}from '@ant-design/icons'
import ProductDetail from './ProductDetail'
import './ItemProduct.css'
class ItemProduct extends React.Component{
state={
className:"Hidden",
visible:false
}
    showCart=()=>{
        this.setState({className:"Display"})
}
hiddenCart=()=>{
    this.setState({className:"Hidden"})
}
addToCart=()=>{}
addToWishlist=()=>{}
showDetail=()=>{
    this.setState({
        visible:true
    })
}
setVisible=(e)=>{
    this.setState({
        visible:e
    })
}
    render(){
        const { match, location, history } = this.props
        return(
            <div style={{paddingLeft:"40px",paddingRight:"40px"}} >
                <div>
                <Image src={this.props.source} alt="" onMouseMove={this.showCart} onMouseOut={this.hiddenCart} preview={false} onClick={this.showDetail}/>
                <Row align="middle"  justify="center" className={this.state.className} onMouseMove={this.showCart} onMouseOut={this.hiddenCart}>
                    <div className="circle" onClick={this.addToCart}><ShoppingCartOutlined  style={{color:'white',fontSize:"32px",alignSelf:'center',paddingTop:"5px"}}/></div>
                    <div className="circle" onClick={this.addToWishlist}><HeartOutlined style={{color:'white',fontSize:"32px",alignSelf:'center',paddingTop:"5px"}}/></div>
                </Row>
              {this.props.product.state&&<div className={this.props.product.state=="new"?"new":"sale"}>
                   <span className="pl-5 p-auto"> {this.props.product.state}</span>
                    </div>}
                </div>
                <div className="mt-5 mb-5">
                <Row align="middle" justify="center">
                    <span className="nameProduct" onClick={()=>history.push('/products/'+this.props.product.id)}>{this.props.product.name}</span>
                </Row>
                <Row align="middle" justify="center">
                    <span className="bold">{this.props.product.price}</span>
                </Row>
                </div>
                <ProductDetail visible={this.state.visible} setVisible={this.setVisible}/>
            </div>
        )
    }
}
export default ItemProduct