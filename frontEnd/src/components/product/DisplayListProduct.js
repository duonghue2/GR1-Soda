import React from 'react';
import {Row,Col,Pagination,Input,Checkbox } from 'antd';

import ItemProduct from '../../components/product/ItemProduct'
import './ItemProduct.css'
const plainOptions = ['Shirt','Male|Jacket','Dress','Glasses','Bag'];
class DisplayListProduct extends React.Component{
    state={
        loadMore:"loadMore"
    }
    handleLoadMore=()=>{
        // call api to get more item
    }
    handleSex=()=>{
        //handleSex
    }
    componentDidMount(){
        if(this.props.numberItem.size%4!==0||this.props.numberItem.size%2!==0){
            this.setState({
                loadMore:"Hidden"
            })
        }
        else{
            this.setState({
                loadMore:"loadMore"
            })
        }
    }
    render(){
       
        return(
            <div className="mb-5 mt-5 ml-5">
                     <Row align="middle" justify="end" className="pagination">
                    <Pagination defaultCurrent={1} total={50} />
                         </Row>
                         <Row>
                 <Col span={4}  >
                     <div >
                        {this.props.plainOptions&& <div className="mt-5 mb-5">
                         <Row align="middle" justify="center" >
                             <p style={{fontSize:"18px"}}>Categories</p>
                         </Row>
                         <Row align="middle" justify="center">
                             <div className="option">
                         <Checkbox.Group options={this.props.plainOptions}  onChange={this.handleSex} />
                         </div>
                         </Row>
                         </div>
    }
                       
                <Row align="middle" justify="center">
                    <p style={{fontSize:"18px"}}>Price</p>

                </Row>
                <Row align="middle" justify="space-between" >
                    <Input placeholder="From" className="InputFilter" ></Input>
                    -
                    <Input placeholder="To" className="InputFilter"></Input>
                     </Row>
                     <Row>
                          <button className="submitFilter">Submit</button> 
                          </Row>
                          </div>
                </Col>
                <Col span={20} >
               
            <Row align="start" justify="start">
            {this.props.numberItem.map((item,index)=>(   
    
     <Col lg={6} xl={6} xs={22} md={10} sm={10}   >
                <ItemProduct source={this.props.source} product={this.props.product} {...this.props}/>
            </Col>
      
            ))}      
                         </Row>

                         <Row align="middle" justify="center">
                        <button className={this.state.loadMore} onClick={this.handleLoadMore}>Load more</button>
                         </Row>
                         </Col>
                         </Row>
                         </div>
        )
    }
}
export default DisplayListProduct;