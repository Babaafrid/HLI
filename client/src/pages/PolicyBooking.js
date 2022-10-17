import { Col, Row, Divider,Rate} from "antd";
import {CloseSquareOutlined} from '@ant-design/icons';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllPolicies } from '../redux/actions/policiesActions'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import 'aos/dist/aos.css';
import StripeCheckout from "react-stripe-checkout";
import { bookPolicy } from "../redux/actions/bookingActions";
function PolicyBooking() {
  const { policies } = useSelector((state) => state.policiesReducer)
  const { loading } = useSelector((state) => state.alertsReducer)
  const [policy, setpolicy] = useState({})
  const dispatch = useDispatch()
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
      {loading && (<Spinner />)}
      <div className='d-flex justify-content-between p-2 mt-2'>
      <h2><b>{policy.name}</b></h2>
      <div className='mr-4'>
      <Link to={`/`}><CloseSquareOutlined className="mr-3" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
      </div>
      <Row
        justify="center"
        className="d-flex align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Col lg={10} sm={24} xs={24} className='p-3'>
          <img src={policy.image} className="policyimg2 box1 w-100" data-aos='flip-left' data-aos-duration='1500' alt="" />
        </Col>

        <Col lg={10} sm={24} xs={24} className="text-right">
          <Divider type="horizontal">Policy Info</Divider>
          <div style={{ textAlign: "right" }}>
            <h4 style={{textAlign:"center"}}><b>{policy.name}</b></h4>
            <p><i>{policy.description}</i></p>
          </div>
            <div>
              <h3>Cost : {policy.cost}</h3>
              <StripeCheckout
                billingAddress
                token={onToken}
                currency='inr'
                amount={policy.cost * 100}
                stripeKey="pk_test_51LfyuySHzp4460YwamOa4wyIl9L9mpH0227Ux0J0g29Ze4O7vBo6qoKCdaOtihSJgnhOxAU6pGWTYe8ZLteZbCoZ00hAl1aRcU"
              >
                <button className="btn1">
                  Buy Policy
                </button>
              </StripeCheckout>
            </div>
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default PolicyBooking