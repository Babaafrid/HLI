import React, {useEffect } from "react";
import DefaultLayout from '../components/DefaultLayout'
import {CloseSquareOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { getAllBookings } from "../redux/actions/bookingActions";
import { Col, Row,Rate } from "antd";
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
// import StripeCheckout from "react-stripe-checkout";
import AppLogout from './Logout'
import moment from "moment";
function UserBookings() {

  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.bookingsReducer);
  const {loading} = useSelector((state) => state.alertsReducer);
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    dispatch(getAllBookings());
  }, []);

  return (
    <DefaultLayout>
      <AppLogout />
      {loading && (<Spinner />)}
      <div className='d-flex justify-content-between p-2 mt-2'>
      <h4><b>My Policies</b></h4>
      <div className='mr-4'>
      <Link to={`/`}><CloseSquareOutlined className="mr-3" style={{color:'red', cursor: "pointer"}}/></Link>
      </div>
      </div>
      <Row justify="center" gutter={16}>
        <Col lg={16} sm={24}>
            
        {bookings.filter(o=>o.user===user._id).map((booking) => {
          console.log(booking.user)
             return <Row gutter={16} className="box1 mt-2 text-left">
                <Col lg={6} sm={24}>
                    <p><b>{booking.policy.name}</b></p>
                    <p>Id: <b>{booking.policy._id}</b></p>   
                    <p>Cost : <b>{booking.policy.cost}</b></p>
                    <Rate disabled defaultValue={booking.policy.rating} />
                </Col>
                <Col lg={12} sm={24}>
                <p>Transaction Id : <b>{booking.transactionId}</b></p>
                <p>Policy Taken On: <b>{moment(booking.createdAt).format('MMM DD yyyy')}</b></p>
                <p>Policy Expires On: <b>{moment(booking.createdAt).add(1,'months').format('MMM DD yyyy')}</b></p>
                
                </Col>

                <Col lg={6} sm={24} className='text-right'>
                    <img style={{borderRadius:5}} src={booking.policy.image}  height="140" className="p-2" alt={booking.policy.name}/>
                    </Col>
              </Row>;
            })}
        </Col>
      </Row>
    </DefaultLayout>
  )
}

export default UserBookings