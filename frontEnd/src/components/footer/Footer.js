import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faPinterest, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Row } from 'antd'
class Footer extends React.Component {
    render() {
        return (


            <Row justify="space-between" style={{ height: "50px", bottom: 0 }}>
                <Row>
                    <p style={{ marginRight: "15px", marginLeft: "25px" }}>©2020 Soda</p>
                    <span style={{ marginRight: "15px" }}>News</span>
                    <span style={{ marginRight: "15px" }}>Fags</span>
                    <span style={{ marginRight: "15px" }}>Contact us</span>
                </Row>
                <div className="">
                    <FontAwesomeIcon icon={faTwitter} style={{ marginRight: "15px" }} />
                    <FontAwesomeIcon icon={faFacebookF} style={{ marginRight: "15px" }} />
                    <FontAwesomeIcon icon={faInstagram} style={{ marginRight: "15px" }} />
                    <FontAwesomeIcon icon={faPinterest} style={{ marginRight: "15px" }} />
                    <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "15px" }} />

                </div>

            </Row>

        )
    }
}
export default Footer;