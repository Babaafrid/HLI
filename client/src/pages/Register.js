import React from 'react'
import { Row, Col, Form, Input } from 'antd'
import { NavLink } from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import { userRegister } from "../redux/actions/userActions";
import Spinner from '../components/Spinner';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
AOS.init();
function Register() {
  const dispatch = useDispatch()
  const {loading} = useSelector(state=>state.alertsReducer)
    function onFinish(values) {
           dispatch(userRegister(values))
           console.log(values)
    }
  return (
    <div className='login'>
      {loading && (<Spinner />)}
      <Row gutter={16} className='d-flex align-items-center'>
        <Col lg={16} style={{ position: 'relative' }}>
          <img 
          data-aos="zoom-in-up"
          data-aos-duration='1500'
          className='w-100' src="https://thumbs.dreamstime.com/b/health-insurance-life-insurance-healthcare-protection-health-safety-patients-health-insurance-life-insurance-healthcare-112565207.jpg" alt="" />
        </Col>
        <Col lg={8} className='text-left p-5'>
          <Form layout='vertical' className='login-form p-5' onFinish={onFinish}>
            <h1>Register</h1>
            <Form.Item name='username' label='Username' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='password' label='Password' rules={[{ required: true }]}>
            <Input.Password/>
            </Form.Item>
            <Form.Item name='cpassword' label='Confirm Password' rules={[{ required: true }]}>
            <Input.Password/>
            </Form.Item>
            <button className='btn1 mt-2 mb-3'>Register</button>
            <br />
            <NavLink to="/login" activeclassname="active">Click Here to Login</NavLink>
          </Form>
        </Col>
      </Row>
    </div>
  )
}

export default Register