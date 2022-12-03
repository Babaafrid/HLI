import React from 'react'
import { Button, Row, Col } from "antd";
import {Link} from 'react-router-dom'
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='wallpaper'>
      <div className='header box1'>
      <Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24}>
              
        <div className='d-flex justify-content-between'>
        <img src="https://play-lh.googleusercontent.com/8NX8Y4vIYaC3xAkeXFlKg7OnCprzxoO4_WrsfUC64VK5_5lhOw3v69E0yZByj9HqLsM" alt=""/>
        {/* <h3><b><Link to='/' style={{color:'white'}}>AIC</Link></b></h3> */}
        <Button onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>Logout</Button>
        </div>
        </Col>
          </Row>
      </div>
      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout