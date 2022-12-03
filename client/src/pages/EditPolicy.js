import { Col, Row, Form, Input } from 'antd'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import Spinner from '../components/Spinner'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import {CloseSquareOutlined} from '@ant-design/icons';
import {editPolicy, getAllPolicies } from "../redux/actions/policiesActions";
import AppLogout from './Logout'
function EditPolicy() {

  const { policies } = useSelector((state) => state.policiesReducer);
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.alertsReducer)
  const [policy, setPolicy] = useState()
  const [totalpolicies, settotalpolicies] = useState([]);
  const { policyid } = useParams();

  useEffect(() => {
    if (policies.length == 0) {
      dispatch(getAllPolicies());
    } else {
      settotalpolicies(policies)
      setPolicy(policies.find((o) => o._id === policyid));
    }
  }, [policies]);


  function onFinish(values) {
    values._id = policy._id;

    dispatch(editPolicy(values))
    console.log(values)
  }

  return (
    <DefaultLayout>
      <AppLogout />
      {loading && (<Spinner />)}
      <div className='d-flex justify-content-between p-2 mt-2'>
      <br />
      <div className='mr-4'>
      <Link to={`/admin`}><CloseSquareOutlined className="mr-3" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
      </div>
      <Row justify='center mt-3'>
        <Col lg={12} sm={24} xs={24} className='p-2'>
          {totalpolicies.length > 0 && (
            <Form
              initialValues={policy}
              className="box1 p-2"
              layout="vertical"
              onFinish={onFinish}
            >
              <h3>Edit Policy</h3>

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

              <div className="text-right">
                <button className="btn1">EDIT POLICY</button>
              </div>
            </Form>
          )}
        </Col>
      </Row>

    </DefaultLayout>
  )
}

export default EditPolicy