import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CloseSquareOutlined } from "@ant-design/icons";
import { getAllPolicies } from "../redux/actions/policiesActions";
import { bookPolicy } from "../redux/actions/bookingActions";
import Spinner from "../components/Spinner";
import { Col, Row,Form,Input} from "antd";
import { Link } from 'react-router-dom'
import StripeCheckout from "react-stripe-checkout";
import { useParams } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import AppLogout from './Logout'

function BuyPolicy() {
    const { policies } = useSelector((state) => state.policiesReducer);
    const { loading } = useSelector((state) => state.alertsReducer);
    const [policy, setpolicy] = useState({});
    const dispatch = useDispatch();
    const { policyid } = useParams();
    useEffect(() => {
        if (policies.length === 0) {
            dispatch(getAllPolicies());
        } else {
            setpolicy(policies.find((o) => o._id === policyid));
        }
    }, [policies]);
    function onToken(token) {
        const reqObj = {
            token,
            user: JSON.parse(localStorage.getItem("user"))._id,
            policy: policy._id,
        };
        dispatch(bookPolicy(reqObj));
    }
    return (
        <DefaultLayout>
          <AppLogout />
            {loading && <Spinner />}
            <div className='mr-4 text-right'>
      <Link to={`/booking/${policy._id}`}><CloseSquareOutlined className="mr-3" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
            <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-4'>
          <img src={policy.image} className="policyimg2 box1 w-100" data-aos='flip-left' data-aos-duration='1500' alt="" />
        </Col>
        <Col lg={12} sm={24} xs={24} className='p-5'>
          <Form className='box1 p-2' layout='vertical'>
            <h3>Fill the Details</h3>
            <hr />
            <Form.Item name='name' label='Name' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='age' label='Age' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='number' label='Phone Number' rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name='pincode' label='Pincode' rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <div className='text-right'>
            <StripeCheckout
                billingAddress
                token={onToken}
                currency='inr'
                amount={policy.cost * 100}
                stripeKey="pk_test_51LfyuySHzp4460YwamOa4wyIl9L9mpH0227Ux0J0g29Ze4O7vBo6qoKCdaOtihSJgnhOxAU6pGWTYe8ZLteZbCoZ00hAl1aRcU"
              >
              <button className='btn1'>BUY POLICY</button>
            </StripeCheckout>
            </div>

          </Form>
        </Col>
        </Row>
        </DefaultLayout>
    );
}

export default BuyPolicy;
