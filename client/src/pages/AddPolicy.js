import { Col, Row, Form, Input } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { Link } from 'react-router-dom'
import {CloseSquareOutlined} from '@ant-design/icons';
import { addPolicy } from '../redux/actions/policiesActions'
function AddPolicy() {

  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)

  function onFinish(values) {
    dispatch(addPolicy(values))
    console.log(values)
  }

  return (
    <DefaultLayout>
      {loading && (<Spinner />)}
      <div className='d-flex justify-content-between p-2 mt-2'>
      <br />
      <div className='mr-4'>
      <Link to={`/admin`}><CloseSquareOutlined className="mr-3" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
      </div>
      <Row justify='center mt-3'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          <Form className='box1 p-2' layout='vertical' onFinish={onFinish}>
            <h3>Add New Policy</h3>
            <hr />
            <Form.Item name='name' label='Policy name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='image' label='Image url' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='description' label='Description' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='cost' label='Cost' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='rating' label='Rating' rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <div className='text-right'>
              <button className='btn1'>ADD POLICY</button>
            </div>

          </Form>
        </Col>
      </Row>

    </DefaultLayout>
  )
}

export default AddPolicy