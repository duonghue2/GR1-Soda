import React from 'react';
import Header from '../../components/header/Header.js'
import PageHeading from '../../assests/collection2.jpg'
import ManHeading from '../../assests/men-dropdown2.jpg'
import { RightOutlined } from '@ant-design/icons'
import { Row, message } from 'antd'
import axios from 'axios'
import { server } from '../../enviroment'
import "./Categories.css"
import DisplayListProduct from '../../components/product/DisplayListProduct'
import image from '../../assests/Product/1.jpg'
import ProductDetail from '../../components/product/ProductDetail.js';

class Categories extends React.Component {
  state = {
    current: 'bestSellers',
    listProduct: [],
    loadMore: null,
    index: 1,
    total: 0

  };
  getListProduct = async (pageNumber) => {
    const { match: { params } } = this.props;
    await axios.post(server + 'api/Products/by-category', { page: pageNumber, limit: 12, category: params.sex, subcategory: params.categories }).then((response) => {
      // console.log(response);
      if (response.data.status == 1)
        this.state.listProduct = this.state.listProduct.concat(response.data.data)
      this.state.total = response.data.total
      this.setState(this.state);
    }, (error) => {
      message.error("Some error occurs, pls try again");
    });
  }
  componentDidMount() {

    this.getListProduct(1);

  }
  handleLoadMore() {
    if (this.state.index * 12 < this.state.total) {
      this.state.index = this.state.index + 1;
      this.state.loadMore = "LoadMore";
      this.getListProduct(this.state.index);
    }
    else this.state.loadMore = "Hidden"
    this.setState(this.props)
  }
  render() {
    const { match: { params } } = this.props;

    if (params.sex === "man" || params.sex === "women")
      return (
        <div>
          <Header></Header>
          <div className="text-white verticle " style={{ backgroundImage: `url(${params.sex == "women" ? PageHeading : ManHeading})`, height: "80vh", marginRight: "25px", marginLeft: "25px" }}>
            <Row align="center" justify="center" > <span className="title"> {params.categories}</span></Row>
            <Row align="center" justify="center"><span className="subTitle"> {params.sex} -<RightOutlined className="router" />{params.categories}</span></Row>
          </div>
          <DisplayListProduct products={this.state.listProduct} loadMore={this.state.loadMore} {...this.props} handleLoadMore={this.handleLoadMore()} />
        </div>)
    else return (<div>
      {/* 

      <ProductDetail /> */}
    </div>)
  }
}
export default Categories;