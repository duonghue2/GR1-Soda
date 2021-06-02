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

function App(props) {
  return (
    // <UserProvider>
    // <CartProvider>

    <Router>
      <div className="">

        <Route path="/" exact component={Home}></Route>
        <Route path="/products/:id" component={ProductDetail}></Route>
        <Route path="/:sex/:categories" component={Categories}></Route>
        <Route path='/cart' component={Cart}></Route>
        <Route path='/checkout' component={Checkout}></Route>
        <Route path='/signup' component={Signup}></Route>
      </div>

    </Router>

    // </CartProvider>
    // </UserProvider>
  );
}

export default withRouter(App);
