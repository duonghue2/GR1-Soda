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
    listProduct: [],
    index: 1,
    total: 0,
    loadMore: null,
    loadMore: "LoadMore"
  };
  loadMore = "LoadMore";
  index = 1;
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
  getListProduct = async (pageNumber) => {
    debugger;
    try {
      await axios.post(server + 'api/Products/get-list-product', { page: pageNumber, limit: 12 }).then((response) => {
        console.log(response.data);
        if (response.data.status == 1)
          this.state.listProduct = this.state.listProduct.concat(response.data.data);

        this.state.total = response.data.total;
        this.setState(this.state);
        // console.log(this.state.listProduct)
      }, (error) => {
        message.error("Some error occurs, pls try again");
      });

    } catch (error) {

    }

  }
  handleLoadMore = (e) => {
    e.preventDefault();
    if (this.index * 12 < this.state.total) {
      this.index = this.index + 1;
      this.getListProduct(this.index);

    }
  }
  componentDidMount() {
    this.getListProduct(1);
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
        <DisplayListProduct plainOptions={['Shirt', 'Male|Jacket', 'Dress', 'Glasses', 'Bag']} products={this.state.listProduct} {...this.props} handleLoadMore={e => this.handleLoadMore(e)} />
        <Footer />
      </div>

    )
  }
}
export default Home;