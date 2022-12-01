import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllPolicies } from '../redux/actions/policiesActions'
import { Col, Row } from "antd";
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { Rate } from 'antd';
function Home() {
  const { policies } = useSelector(state => state.policiesReducer)
  const user = JSON.parse(localStorage.getItem('user'))
  const { loading } = useSelector(state => state.alertsReducer)
  const [totalPolicies, setTotalpolicies] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllPolicies())
  }, [])

  useEffect(() => {
    setTotalpolicies(policies)
  }, [policies])

  return (
    <DefaultLayout>
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2" style={{color:'green',fontStyle:"italic"}}>Welcome {user.username},</h3>
            <button className="btn1">
              <a href="/userbookings" style={{ color: 'white' }}>YOUR POLICIES</a>
            </button>
          </div>
        </Col>
      </Row>
      {loading === true && (<Spinner />)}
      
      <Row justify='center' gutter={16} className='mt-5'>
        {totalPolicies.map(policy => {
          return <Col lg={5} sm={24} xs={24}>
            <div className="car p-2 box1 mt-3">
              <img src={policy.image} className="carimg w-100" alt="" />
              <div className="car-content d-flex align-items-center justify-content-between">
                <div className='text-left pl-2'>
                  <p>{policy.name}</p>
                  <p>{policy.cost} Rs/-</p>
                  <Rate disabled defaultValue={policy.rating} />
                </div>
                <div>
                  <button className='btn1 mr-2'><Link to={`/booking/${policy._id}`} style={{ color: 'white' }}>View</Link></button>
                </div>
              </div>
            </div>
          </Col>
        })}
      </Row>
    </DefaultLayout>
  )
}

export default Home