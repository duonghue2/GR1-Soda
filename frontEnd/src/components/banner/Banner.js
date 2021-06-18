import React from 'react';
import { Carousel, Image } from 'antd'

import Banner1 from '../../assests/women.jpg';
import Banner2 from '../../assests/S2.jpg';
import Banner3 from '../../assests/S3.jpg'
import "./Banner.css"
class Banner extends React.Component {
  onChange = () => {

  }
  render() {
    return (
      <div className="banner">
        <Carousel afterChange={this.onChange} autoplay={true} effect="fade" id="banner">
          <div style={{ height: "inherit" }}>
            <span className="test">New Arival</span>
            <span className="women"><a href="/women">Women collection</a></span>
            <span className="man"><a href="/men">Man collection</a></span>

            <img src={Banner1} id="banner" />
          </div>
          <div>
            <span className="whiteSneaker"><a href="/">White Sneaker</a></span>
            <span className="shopNow"><a href="/">shop now</a></span>
            <img src={Banner2} id="banner" />
          </div>
          <div>
            <span className="test">Linen Collection</span>
            <img src={Banner3} id="banner" />
          </div>

        </Carousel>

      </div>
    )
  }
}
export default Banner;