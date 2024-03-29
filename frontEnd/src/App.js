import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  withRouter
} from "react-router-dom";
import Home from './pages/home/Home'
import ProductDetail from './pages/productDetail/ProductDetail'
import Categories from './pages/categories/Categories'
import Cart from './pages/Cart/Cart'
import Checkout from './pages/Checkout/Checkout'
import Signup from './pages/Signup/Signup'
import 'antd/dist/antd.css';
import Login from './pages/Login/Login'
import History from './components/history/History';
import Search from './pages/Search/Search'
import Women from './pages/Gender/Women'
import Men from './pages/Gender/Man'
import Unisex from './pages/Gender/Unisex'
import Admin from './pages/Admin/Dashboard'
import DetailOrder from './pages/Admin/DetailOrder'
function App(props) {

  return (
    // <UserProvider>
    // <CartProvider>

    <Router>
      <div className="">

        <Route path="/" exact component={Home}></Route>
        <Route path="/products/:id" component={ProductDetail}></Route>

        <Route path="/gender/:sex/:categories" component={Categories}></Route>
        <Route path="/women" component={Women}></Route>
        <Route path="/men" component={Men}></Route>
        <Route path="/unisex" component={Unisex}></Route>
        <Route exact path='/cart' component={Cart}></Route>
        <Route path='/search/:searchText' component={Search}></Route>
        <Route exact path='/checkout' >
          <Checkout />

        </Route>
        <Route path="/admin/order/:id" component={DetailOrder}></Route>
        <Route exact path='/signup' component={Signup}></Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/history" component={History}></Route>
        <Route exact path="/admin" component={Admin}></Route>
      </div>

    </Router>

    // </CartProvider>
    // </UserProvider>
  );
}

export default withRouter(App);
