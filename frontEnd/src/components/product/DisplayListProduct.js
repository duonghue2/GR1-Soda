import React from 'react';
import { Row, Col, Pagination, Input, Checkbox } from 'antd';

import ItemProduct from '../../components/product/ItemProduct'
import './ItemProduct.css'
const plainOptions = ['Shirt', 'Male|Jacket', 'Dress', 'Glasses', 'Bag'];
class DisplayListProduct extends React.Component {
    state = {

        gender: null
    }

    handleSex = (e) => {
        console.log(e);
        this.state.gender = e;
        this.setState(this.state);
    }


    render() {

        return (
            <div className="mb-5 mt-5 ml-5">
                {/* <Row align="middle" justify="end" className="pagination">
                    <Pagination defaultCurrent={1} total={this.props.total} />
                </Row> */}
                <Row>
                    <Col span={4}  >
                        <div >
                            {this.props.plainOptions && <div className="mt-5 mb-5">
                                <Row align="middle" justify="center" >
                                    <p style={{ fontSize: "18px" }}>Categories</p>
                                </Row>
                                <Row align="middle" justify="center">
                                    <div className="option">
                                        <Checkbox.Group options={this.props.plainOptions} onChange={e => this.handleSex(e)} />
                                    </div>
                                </Row>
                            </div>
                            }

                            <Row align="middle" justify="center">
                                <p style={{ fontSize: "18px" }}>Price</p>

                            </Row>
                            <Row align="middle" justify="space-between" >
                                <Input placeholder="From" className="InputFilter" ></Input>
                    -
                    <Input placeholder="To" className="InputFilter"></Input>
                            </Row>
                            <Row>
                                <button className="submitFilter">Submit</button>
                            </Row>
                        </div>
                    </Col>
                    <Col span={20} >

                        <Row align="start" justify="start">
                            {this.props.products.map((item, index) => (

                                <Col lg={6} xl={6} xs={22} md={10} sm={10} key={index}  >
                                    <ItemProduct product={item} {...this.props} />
                                </Col>

                            ))}
                        </Row>

                        <Row align="middle" justify="center">
                            <button className={this.props.products.length % 12 != 0 ? "Hidden" : "LoadMore"} onClick={e => this.props.handleLoadMore(e)}>Load more</button>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default DisplayListProduct;