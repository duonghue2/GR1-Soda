import React from 'react';
import Header from '../../components/header/Header';
import Banner from '../../components/banner/Banner';
import { Row, Menu, Col, message } from 'antd';
import Footer from '../../components/footer/Footer';
import DisplayListProduct from '../../components/product/DisplayListProduct'
import Women from '../../assests/female.jpg'
import Man from '../../assests/man.jpg'
import { server } from '../../enviroment'
import axios from 'axios'

class Home extends React.Component {
  state = {
    current: 'bestSellers',
    listProduct: [],
    index: 1,
    total: 0,
    loadMore: null,
    loadMore: "LoadMore",
    loading: true
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
  getListProduct = async (pageNumber) => {

    try {
      await axios.post(server + 'api/Products/get-list-product', { currentPage: pageNumber, pageSize: 12 }).then((response) => {
        console.log(response.data);
        if (response.data.status == 1)
          this.state.listProduct = this.state.listProduct.concat(response.data.data);

        this.state.total = response.data.total;
        this.state.loading = false;
        this.setState(this.state);
        // console.log(this.state.listProduct)
      }, (error) => {
        message.error("Some error occurs, pls try again");
      });

    } catch (error) {

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
        <Row style={{ paddingTop: "25px" }}>
          <Col span={11} offset={1} >
            <img src={Women} alt="women" width="100%" />
          </Col>
          <Col span={11} style={{ marginLeft: "15px" }}>
            <img src={Man} alt="man" width="100%" height="100%" />
          </Col>
        </Row>
        <div>
          <Row align='middle' justify='center' style={{ marginTop: "15px", marginBottom: "15px" }}>

            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
              <Menu.Item key="allProduct" >
                <span style={{ fontSize: "20px" }}>All products</span>
              </Menu.Item>
              {/* <Menu.Item key="bestSeller" >
                <span style={{ fontSize: "20px" }}>Best sellers</span>
              </Menu.Item>
              <Menu.Item key="newProduct"  >
                <span style={{ fontSize: "20px" }}>New Product</span>
              </Menu.Item>
              <Menu.Item key="saleProduct"  >
                <span style={{ fontSize: "20px" }}>Sale Product</span>
              </Menu.Item> */}
            </Menu>
          </Row>
        </div >

        <DisplayListProduct plainOptions={['Shirt', 'Male|Jacket', 'Dress', 'Glasses', 'Bag']} products={this.state.listProduct} {...this.props} getListProduct={e => this.getListProduct(e)} total={this.state.total} loading={this.state.loading} />

        <Footer />
      </div>

    )
  }
}
export default Home;