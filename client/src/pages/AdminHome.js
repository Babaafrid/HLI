import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DefaultLayout from '../components/DefaultLayout'
import { deletePolicy, getAllPolicies } from '../redux/actions/policiesActions'
import { Col, Row } from "antd";
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Popconfirm,Rate} from "antd"; 
function AdminHome() {
  const { policies } = useSelector(state => state.policiesReducer)
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
            <h3 className="mt-1 mr-2">Admin Panel</h3>
            <button className="btn1">
              <a href="/addpolicy" style={{ color: 'white' }}>ADD POLICY</a>
            </button>
          </div>
        </Col>
      </Row>

      {loading === true && (<Spinner />)}
      <Row justify='center' gutter={16} className='mt-5'>
        {totalPolicies.map(policy => {
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
                  <Link to={`/editpolicy/${policy._id}`}>
                    <EditOutlined className="mr-3" style={{ color: "green", cursor: "pointer" }} />
                  </Link>
                  <Popconfirm
                    title="Are you sure to delete this policy?"
                    onConfirm={() => { dispatch(deletePolicy({ policyid: policy._id })) }}

                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined
                      style={{ color: "red", cursor: "pointer" }}
                    />
                  </Popconfirm>
                </div>
              </div>
            </div>
          </Col>
        })}
      </Row>
    </DefaultLayout>
  )
}

export default AdminHome