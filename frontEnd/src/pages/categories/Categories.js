import React from 'react';
import Header from '../../components/header/Header.js'
import PageHeading from '../../assests/collection2.jpg'
import {Row} from 'antd'
class Categories extends React.Component{
render(){
    return(
    <div>
<Header></Header>
<Row align="center" justify="center" style={{backgroundImage:`url(${PageHeading})`,height:"90vh", marginRight:"25px",marginLeft:"25px"}}>
  <span className="text-white"> ABCD</span>
</Row>
    </div>)
}
}
export default Categories;