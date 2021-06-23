import React from 'react';
import Header from '../../components/header/Header.js'
import PageHeading from '../../assests/collection2.jpg'
import ManHeading from '../../assests/men-dropdown2.jpg'
import Unisex from '../../assests/b4.jpg'
import Footer from '../../components/footer/Footer';
import { message } from 'antd'
import axios from 'axios'
import { server } from '../../enviroment'
import "../categories/Categories.css"
import DisplayListProduct from '../../components/product/DisplayListProduct'
let manOption = ['Shirt', 'Jacket', 'Glasses'];
let womanOption = ['Jacket', 'Dress', 'Glasses', 'Bag']
class Women extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            listProduct: [],
            loadMore: null,
            total: 0

        };
    }

    getListProduct = async (pageNumber) => {

        var payload = { page: pageNumber, limit: 12, category: 'men' }
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

    render() {



        return (
            <div>
                <Header></Header>
                <div className="text-white verticle " style={{
                    backgroundImage: `url(${ManHeading})`, backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover', height: "80vh", marginRight: "25px", marginLeft: "25px"
                }}>
                    {/* <Row align="center" justify="center" > <span className="title"> {params.categories}</span></Row> */}
                    {/* <Row align="center" justify="center"><span className="subTitle"> {params.sex} -<RightOutlined className="router" />{params.categories}</span></Row> */}
                </div>
                <DisplayListProduct products={this.state.listProduct} {...this.props} getListProduct={e => this.getListProduct(e)} total={this.state.total} options={manOption} gender="men" />
                <Footer></Footer>
            </div>)







    }
}
export default Women;