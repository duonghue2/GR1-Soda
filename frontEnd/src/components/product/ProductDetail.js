import React from 'react';
import {Modal} from 'antd';
class ProductDetail extends React.Component{
   
   
    render(){
        return(
            <Modal
        title="Modal 1000px width"
        centered
        visible={this.props.visible}
        onOk={() => this.props.setVisible(false)}
        onCancel={() => this.props.setVisible(false)}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
        )
    }
}
export default ProductDetail;