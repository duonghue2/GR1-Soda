import React from 'react';
import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import { Row, Menu, Col, message } from 'antd';
import Footer from '../../components/footer/Footer';
import DisplayListProduct from '../../components/product/DisplayListProduct'
import { server } from '../../enviroment'
import axios from 'axios'

class Home extends React.Component {
  state = {
    current: 'bestSellers',
    listProduct: []
  };

  handleClick = e => {
    this.setState({ current: e.key });
    if (e.key == "bestSeller") {
      //get all best seller
    }
    else if (e.key == "newProduct") {
      //ger all newProduct
    }
    else {
      //get sale product
    }
  };
  getUser = async () => {
    try {
      await axios.post(server + 'api/Products/get-list-product', { page: 1, limit: 12 }).then((response) => {
        // console.log(response);
        if (response.data.status == 1)
          this.state.listProduct = response.data.data
        // console.log(this.state.listProduct)
      }, (error) => {
        message.error("Some error occurs, pls try again");
      });

    } catch (error) {

    }
    this.setState(this.state);
  }
  componentDidMount() {
    this.getUser();
  }
  render() {
    const { current } = this.state;
    return (
      <div>
        <Header />
        <Banner />
        <div>
          <Row align='middle' justify='center' style={{ marginTop: "15px", marginBottom: "15px" }}>

            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="allProduct" >
                <span style={{ fontSize: "20px" }}>All products</span>
              </Menu.Item>
              <Menu.Item key="bestSeller" >
                <span style={{ fontSize: "20px" }}>Best sellers</span>
              </Menu.Item>
              <Menu.Item key="newProduct"  >
                <span style={{ fontSize: "20px" }}>New Product</span>
              </Menu.Item>
              <Menu.Item key="saleProduct"  >
                <span style={{ fontSize: "20px" }}>Sale Product</span>
              </Menu.Item>
            </Menu>
          </Row>
        </div >
        <DisplayListProduct plainOptions={['Shirt', 'Male|Jacket', 'Dress', 'Glasses', 'Bag']} products={this.state.listProduct} {...this.props} />
        <Footer />
      </div>

    )
  }
}
export default Home;