import React from 'react';
import {Row,Col} from 'antd';

import ItemProduct from '../../components/product/ItemProduct'
import './ItemProduct.css'
class DisplayListProduct extends React.Component{
    state={
        loadMore:"loadMore"
    }
    handleLoadMore=()=>{
        // call api to get more item
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
            <div className="mb-5">
            <Row align="start">
            {this.props.numberItem.map((item,index)=>(
              <Col lg={5} xl={5} xs={22} md={10} sm={10} offset={1}>
                <ItemProduct source={this.props.source} product={this.props.product} {...this.props}/>
            </Col>
      
            ))}      
                         </Row>

                         <Row align="middle" justify="center">
                        <button className={this.state.loadMore} onClick={this.handleLoadMore}>Load more</button>
                         </Row>
                         </div>
        )
    }
}
export default DisplayListProduct;