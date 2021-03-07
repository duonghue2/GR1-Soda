import React from 'react'
import {Row, Col} from 'antd'
import { StarFilled} from '@ant-design/icons'
import './ProductDetail.css'

class Review extends React.Component{
    render(){
        
        return(
            <div className="review">
              {this.props.review.map((data,index)=>(
                  <div key={index} >
                  <Row align="middle" justify="space-between">
                  <Col>
                  <div>
                      <Row>
                      {data.user}</Row>
                      <Row> {data.date}</Row>
                      </div> 
                  </Col>
                  <Col> 
                  <StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} />
                  </Col>
                  </Row>
                  <Row><p>{data.content}</p></Row>
              </div>
              ))}  
            </div>
        )
    }
}

export default Review;