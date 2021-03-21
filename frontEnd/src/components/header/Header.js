import { Menu,Image,Row } from 'antd';
import {SearchOutlined,ShoppingCartOutlined,UserOutlined} from '@ant-design/icons'

import React from 'react'
import logo from '../../assests/logo.png'
import Banner from '../banner/Banner'
import './Header.css'
const { SubMenu } = Menu;

class Header extends React.Component {
    state = {
        current: 'home',
      };
    
      handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
      };
    
    render() {
        const { current } = this.state;
        return (
            <div >
            <Row align="middle" justify="space-between" className="header"   >
            <div className="item-header">
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" >
             <a href="/">Home</a> 
            </Menu.Item>
          
            <SubMenu key="women" title="Women">
            
            <Menu.Item>
            <a  rel="noopener noreferrer" href="/women/shirt">
                Shirt
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/women/pants">
                Pants
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/women/dress">
                Dress
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/women/bags">
                Bags
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/women/glasses">
                Glasses
        </a>
        </Menu.Item>
            </SubMenu>
            <SubMenu key="man" title="Men">
            
            <Menu.Item>
            <a  rel="noopener noreferrer" href="/man/shirt">
                Shirt
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/man/pants">
                Pants
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/man/jackets">
                Jackets
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/man/bags">
                Bags
        </a>
        </Menu.Item>
        <Menu.Item>
            <a  rel="noopener noreferrer" href="/man/glasses">
                Glasses
        </a>
        </Menu.Item>
            </SubMenu>
            <Menu.Item key="contact">
              Contact
            </Menu.Item>
          </Menu>
          </div>
              <div className="logo item-header">
          <Image preview={false}
      width={100}
      src={logo}
    /></div>
         
          <div className="item-header float-right">
              <SearchOutlined style={{ fontSize: '25px', marginRight:"25px",fontWeight:'bold' }} />
              <ShoppingCartOutlined style={{ fontSize: '25px', marginRight:"25px" }} />
              <UserOutlined  style={{ fontSize: '25px', marginRight:"25px" }}/>  

          </div>
          
</Row>

</div>
        );
    }
}
export default Header;




