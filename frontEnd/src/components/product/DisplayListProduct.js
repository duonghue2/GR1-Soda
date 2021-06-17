import React from 'react';
import { Row, Col, Pagination, Input, Checkbox } from 'antd';

import ItemProduct from '../../components/product/ItemProduct'
import './ItemProduct.css'
import axios from 'axios';
import { server } from '../../enviroment'
const plainOptions = ['Shirt', 'Jacket', 'Dress', 'Glasses', 'Bag'];
const genderOption = ['Men', "Women", "Unisex"];
class DisplayListProduct extends React.Component {
    state = {

        gender: [],
        category: [],
        isFilter: false,
        products: [],
        total: 0,
        priceFrom: null,
        priceTo: null
    }
    handlePriceFrom = (e) => {

        this.setState({ priceFrom: e.target.value })
    }
    handlePriceTo = (e) => {
        this.setState({ priceTo: e.target.value })
    }
    handleSex = async (e) => {
        // e.preventDefault()
        //console.log(e);
        this.state.gender = e;
        this.state.isFilter = true;
        var payload = {
            gender: this.state.gender,
            category: this.state.category,

        }
        this.getData(payload)
    }
    getData = async (payload) => {
        const { match: { params } } = this.props;
        if (params.textSearch) {
            payload = { ...payload, name: params.textSearch }
        }
        debugger
        await axios.post(server + 'api/Products/filter', payload).then(resp => {
            this.state.isFilter = true;
            this.state.products = resp.data.data != null ? resp.data.data : [];
            this.state.total = resp.data.total != null ? resp.data.total : 0;
            this.setState(this.state)
        })
    }

    handleCategory = async (e) => {
        this.state.category = e;
        this.state.isFilter = true;
        var payload = {
            gender: this.state.gender,
            category: this.state.category,


        }
        this.getData(payload);

    }
    filter = async (e) => {

        e.preventDefault();
        var { priceFrom, priceTo } = this.state;
        var payload = {
            gender: this.state.gender,
            category: this.state.category,
            priceFrom,
            priceTo

        }
        this.getData(payload)

    }

    render() {

        return (
            <div className="mb-5 mt-5 ml-5">
                {/* <Row align="middle" justify="end" className="pagination">
                    <Pagination defaultCurrent={1} total={this.props.total} />
                </Row> */}
                <Row >
                    <Col span={4}  >
                        <div >
                            {this.props.plainOptions && <div className="mt-5 mb-5">
                                <Row align="middle" justify="center" >
                                    <p style={{ fontSize: "18px" }}>Filter</p>
                                </Row>
                                <Row>Gender</Row>
                                <Row justify="center">
                                    <div className="option">
                                        <Checkbox.Group options={genderOption} onChange={e => this.handleSex(e)} />
                                    </div>
                                </Row>
                                <Row>Categories</Row>
                                <Row align="middle" justify="center">
                                    <div className="option">
                                        <Checkbox.Group options={plainOptions} onChange={e => this.handleCategory(e)} />
                                    </div>
                                </Row>
                            </div>
                            }

                            <Row align="middle" justify="center">
                                <p style={{ fontSize: "18px" }}>Price</p>

                            </Row>
                            <Row align="middle" justify="space-between" >
                                <input placeholder="From" className="InputFilter" onChange={this.handlePriceFrom}></input>
                                -
                                <input placeholder="To" className="InputFilter" onChange={this.handlePriceTo}></input>
                            </Row>
                            <Row>
                                <button className="submitFilter" onClick={this.filter}>Submit</button>
                            </Row>
                        </div>
                    </Col>
                    <Col span={20} >

                        <Row align="start" justify="start">
                            {!this.state.isFilter && this.props.products.map((item, index) => (

                                <Col lg={6} xl={6} xs={22} md={10} sm={10} key={index}  >
                                    <ItemProduct product={item} {...this.props} />
                                </Col>

                            ))}
                            {this.state.isFilter && this.state.products.map((item, index) => (

                                <Col lg={6} xl={6} xs={22} md={10} sm={10} key={index}  >
                                    <ItemProduct product={item} {...this.props} />
                                </Col>

                            ))}
                        </Row>

                        <Row align="middle" justify="center">
                            <button className={this.props.products.length == this.props.total ? "Hidden" : "LoadMore"} onClick={e => this.props.handleLoadMore(e)}>Load more</button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default DisplayListProduct;