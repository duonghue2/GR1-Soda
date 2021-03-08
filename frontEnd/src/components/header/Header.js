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
            <Row align="middle" justify="space-between" className="header" >
            <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="home" >
              Home
            </Menu.Item>
          
            <SubMenu key="women" title="Women">
            
            <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Shirt
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Pants
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Dress
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Bags
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Glasses
        </a>
        </Menu.Item>
            </SubMenu>
            <SubMenu key="man" title="Men">
            
            <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Shirt
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Pants
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Jackets
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Bags
        </a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                Glasses
        </a>
        </Menu.Item>
            </SubMenu>
            <Menu.Item key="contact">
              Contact
            </Menu.Item>
          </Menu>
          <div>
              <div style={{alignItems:"center"}}>
          <Image preview={false}
      width={100}
      src={logo}
    /></div>
          </div>
          <div style={{marginRight:"20px"}}>
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




