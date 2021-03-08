import React from 'react'
import {Row, Col} from 'antd'
import { StarFilled} from '@ant-design/icons'
import './ProductDetail.css'

class Review extends React.Component{
    render(){
        
        return(
            <div className="review">
              {this.props.review.map((data,index)=>(
                  <div key={index}  className="review-div">
                  <Row align="middle" justify="space-between">
                  <Col>
                  <div>
                      <Row>
                      <span className="bold size-18 ">{data.user}</span></Row>
                      <Row> <span className="review-date">{data.date}</span></Row>
                      </div> 
                  </Col>
                  <Col> 
                  <StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} /><StarFilled style={{color:"#ffb136"}} />
                  </Col>
                  </Row>
                  <Row><p className="review-date review-content">{data.content}</p></Row>
              </div>
              ))}  
            </div>
        )
    }
}

export default Review;