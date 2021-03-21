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
//import Home from './pages/Home.js'
// import News from './pages/News.js'
// import Shop from './pages/Shop.js'
// import Contact from './pages/Contact.js'
// import ProductDetail from './pages/ProductDetail.js'
// import Collection from './pages/Collection';
// import Login from './components/admin/Login/Login';
// import { CartProvider } from './contexts/Cart'
// import Dashboard from './components/admin/Dashboard/Dashboard';
// import { UserProvider } from './contexts/User';
import 'antd/dist/antd.css';

function App(props) {
  return (
    // <UserProvider>
    // <CartProvider>

        <Router>
          <div className="">
        
            <Route path="/" exact component={Home}></Route>
            <Route path="/products/:id" component={ProductDetail}></Route>
            <Route path="/women/:categories" component={Categories}></Route>
            <Route path="/man/:categories" component={Categories}></Route>
             {/*  <Route path="/home" exact component={Home}></Route>
          <Route path="/news" exact component={News}></Route>
            <Route path="/men" exact component={Shop}></Route>
            <Route path="/shop" exact component={Shop}></Route>
            <Route path="/shop/:search" exact component={Shop}></Route>
            <Route path="/men/:cate" exact component={Shop}></Route>
            <Route path="/women" exact component={Shop}></Route>
            <Route path="/women/:cate" exact component={Shop}></Route>
            <Route path="/contact" exact component={Contact}></Route>
            <Route path="/collection/:id" exact component={Collection}></Route>
            
            <Route path="/admin" exact component={Login}></Route>
            <Route path="/admin/dashboard" exact component={Dashboard}></Route>
            <Route path="/checkout" exact component={Checkout}></Route>  */}
          </div>
         
        </Router>
  
    // </CartProvider>
    // </UserProvider>
  );
}

export default withRouter(App);
