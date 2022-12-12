import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { getAllPolicies } from '../redux/actions/policiesActions'
import { Col, Row,Input} from "antd";
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { Rate } from 'antd';
import AppLogout from './Logout'
import KommunicateChat from './chat';

function Home() {
  const { policies } = useSelector(state => state.policiesReducer)
  const { loading } = useSelector(state => state.alertsReducer)
  const [totalPolicies, setTotalpolicies] = useState([])
  const dispatch = useDispatch()
  const { Search } = Input;
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    dispatch(getAllPolicies())
  }, [])

  useEffect(() => {
    setTotalpolicies(policies)
  }, [policies])

  return (
    <DefaultLayout>
      <AppLogout />
      <KommunicateChat />
      <Row justify="center" gutter={16} className="mt-2">
        <Col lg={20} sm={24}>
          <Search placeholder="Search Here" onChange={handleChange} enterButton />
        </Col>
      </Row>
      <Row justify="center" gutter={16} className="mt-2">
      <Col lg={20} sm={24}>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className="mt-1 mr-2">User Panel</h3>
            <button className="btn1">
              <a href="/userbookings" style={{ color: 'white' }}>YOUR POLICIES</a>
            </button>
          </div>
        </Col>
      </Row>
      {loading === true && (<Spinner />)}
      
      <Row justify='center' gutter={16} className='mt-5'>
        {totalPolicies.filter((policy) => {
    return policy.name.toLowerCase().includes(searchInput.toLowerCase());
}).map((policy,index) => {
          return <Col lg={5} sm={24} xs={24}>
            <div className="car p-2 box1 mt-3 mb-5">
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