import React from 'react';
import Header from '../../components/header/Header.js'
import PageHeading from '../../assests/collection2.jpg'
import ManHeading from '../../assests/men-dropdown2.jpg'
import Unisex from '../../assests/b4.jpg'
import { message } from 'antd'
import axios from 'axios'
import { server } from '../../enviroment'
import "./Categories.css"
import DisplayListProduct from '../../components/product/DisplayListProduct'
let manOption = ['Shirt', 'Jacket', 'Glasses'];
let womanOption = ['Jacket', 'Dress', 'Glasses', 'Bag']
class Categories extends React.Component {
  state = {
    current: 'bestSellers',
    listProduct: [],
    loadMore: null,
    total: 0

  };
  index = 0;
  getListProduct = async (pageNumber) => {
    const { match: { params } } = this.props;
    var payload = null;
    if (params.subcategory) payload = { page: pageNumber, limit: 12, category: params.sex, subcategory: params.categories };
    else payload = { page: pageNumber, limit: 12, category: params.sex }

    await axios.post(server + 'api/Products/by-category', payload).then((response) => {
      // console.log(response);
      if (response.data.status == 1)
        this.state.listProduct = this.state.listProduct.concat(response.data.data)
      console.log(response.data)
      this.state.total = response.data.total
      this.setState(this.state);
    }, (error) => {
      message.error("Some error occurs, pls try again");
    });

  }
  componentDidMount() {

    this.getListProduct(1);

  }
  handleLoadMore = (e) => {
    e.preventDefault();
    if (this.index * 12 < this.state.total) {
      this.index = this.index + 1;
      this.getListProduct(this.index);
    }
  }
  render() {
    const { match: { params } } = this.props;
    console.log(params);
    if (params.sex === "men" || params.sex === "women" || params.sex == "unisex")
      return (
        <div>
          <Header></Header>
          <div className="text-white verticle " style={{
            backgroundImage: `url(${params.sex == "women" ? PageHeading : params.sex == "unisex" ? Unisex : ManHeading})`, backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover', height: "80vh", marginRight: "25px", marginLeft: "25px"
          }}>
            {/* <Row align="center" justify="center" > <span className="title"> {params.categories}</span></Row> */}
            {/* <Row align="center" justify="center"><span className="subTitle"> {params.sex} -<RightOutlined className="router" />{params.categories}</span></Row> */}
          </div>
          <DisplayListProduct products={this.state.listProduct} {...this.props} handleLoadMore={e => this.handleLoadMore(e)} total={this.state.total} options={params.sex == "women" ? womanOption : manOption} />
        </div>)
    else return (<div>
      {/* 

      <ProductDetail /> */}
    </div>)
  }
}
export default Categories;