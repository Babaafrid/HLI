import React from 'react'
import { Menu, Dropdown, Button, Space, Row, Col,Breadcrumb } from "antd";
import {Link} from 'react-router-dom'
function DefaultLayout(props) {
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='wallpaper'>
      <div className='header box1'>
      {user.username!="Baba Afrid"&&(<Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24}>
        <div className='d-flex justify-content-between'>
        <h3><b><Link to='/' style={{color:'yellow'}}>AIC</Link></b></h3>
        <Button onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>Logout</Button>
        </div>
        </Col>
          </Row>)}
      {user.username=="Baba Afrid"&&(<Row gutter={16} justify='center'>
              <Col lg={20} sm={24} xs={24}>
        <div className='d-flex justify-content-between'>
        <h3><b><Link to='/admin' style={{color:'yellow'}}>AIC</Link></b></h3>
          <Button onClick={() => {
        localStorage.removeItem('user');
        window.location.href = '/login'
      }}>Logout</Button>
        </div>
        </Col>
          </Row>)}
      </div>
      <div className='content'>
        {props.children}
      </div>
    </div>
  )
}

export default DefaultLayout