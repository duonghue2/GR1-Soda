import React from 'react';
import Header from '../../components/header/Header.js'
import PageHeading from '../../assests/women.jpg'
import ManHeading from '../../assests/men-dropdown2.jpg'
import { message } from 'antd'
import axios from 'axios'
import { server } from '../../enviroment'
import Footer from '../../components/footer/Footer';
import DisplayListProduct from '../../components/product/DisplayListProduct'

class Search extends React.Component {
    state = {
        current: 'bestSellers',
        listProduct: [],
        loadMore: null,
        total: 0

    };

    getListProduct = async (pageNumber) => {
        const { match: { params } } = this.props;
        var payload = {
            name: params.searchText,
            currentPage: pageNumber,
            pageSize: 12
        }
        await axios.post(server + 'api/Products/filter', payload).then(resp => {
            this.state.isFilter = true;
            this.state.listProduct = resp.data.data != null ? resp.data.data : [];
            this.state.total = resp.data.total != null ? resp.data.total : 0;
            this.setState(this.state)
        })

    }
    componentDidMount() {

        this.getListProduct(1);

    }

    render() {

        return (
            <div>
                <Header></Header>
                <div className="text-white verticle " style={{
                    backgroundImage: `url(${PageHeading})`, backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover', height: "80vh", marginRight: "25px", marginLeft: "25px"
                }}>

                </div>
                <DisplayListProduct products={this.state.listProduct} {...this.props} getListProduct={e => this.getListProduct(e)} total={this.state.total} />
                <Footer></Footer>
            </div>)

    }
}
export default Search;