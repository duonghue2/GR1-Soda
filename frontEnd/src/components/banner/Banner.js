import React from 'react';
import {Carousel,Image} from 'antd'

import Banner1 from '../../assests/S1.jpg';
import Banner2 from '../../assests/S2.jpg';
import Banner3 from '../../assests/S3.jpg'
import  "./Banner.css"
class Banner extends React.Component{
    onChange=()=>{

    }
render(){
    return (
        <div className="banner">
        <Carousel afterChange={this.onChange} autoplay={true} effect="fade">
        <div >
            <span className="test">New Arival</span>
            <span className="women"><a href="/">Women collection</a></span>
            <span className="man"><a href="/">Man collection</a></span>
            
          <Image src={Banner1} preview={false} height="82vh"  />
        </div>
        <div>
        <span className="whiteSneaker"><a href="/">White Sneaker</a></span>
        <span className="shopNow"><a href="/">shop now</a></span>
        <Image src={Banner2} preview={false} height="82vh"/>
        </div>
        <div>
        <span className="test">Linen Collection</span>
        <Image src={Banner3} preview={false}height="82vh"/>
        </div>
      
      </Carousel>

      </div>
    )
}}
export default Banner;