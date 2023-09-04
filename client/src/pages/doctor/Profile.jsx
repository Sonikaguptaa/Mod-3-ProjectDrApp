import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import { useParams } from 'react-router-dom'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Input, Row, TimePicker, message } from "antd"
import axios from 'axios'

import { showLoading, hideLoading } from '../../redux/features/alertSlice'


const Profile = () => {

  const { user } = useSelector((state) => state.user)
  const [doctor, setDoctors] = useState(null)
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // handle form  Update Doc
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post(
        "/api/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
        }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {

        message.success(res.data.message)
        navigate('/')

      } else {
        message.error(res.data.success)
      }

    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error(`Something went wrong`)

    }
    console.log(values)

  }


  // get doc detail
  const getDoctorInfo = async () => {
    try {
      const res = await axios.post('/api/doctor/getDoctorInfo', { userId: params.id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getDoctorInfo()

  }, [])

  return (
    <Layout>
      <h1>Manage Profile</h1>

      {doctor && (

        <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={doctor}>
          <h4>Personel Details :</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder=" Enter Your Name" />

              </Form.Item>
            </Col>


            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder=" Enter Your Name" />

              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}>


                <Input type="text" placeholder=" Contact no" />

              </Form.Item>
            </Col>


            <Col xs={24} md={24} lg={8}>
              <Form.Item label="E-Mail"
                name="email"
                required
                rules={[{ required: true }]}>

                <Input type="text" placeholder="  e-mail" />

              </Form.Item>
            </Col>


            <Col xs={24} md={24} lg={8}>
              <Form.Item label="WebSite"
                name="website"
              >

                <Input type="text" placeholder=" WebSite " />

              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Address"
                name="address"
                required
                rules={[{ required: true }]}>

                <Input type="text" placeholder="Address" />

              </Form.Item>
            </Col>



          </Row>

          <h4>Professional Details :</h4>


          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Specialization"
                name="specialization"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder=" specialization" />

              </Form.Item>
            </Col>


            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}>
                <Input type="text" placeholder="experience" />

              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Timing"
                name="timings"
                required>
                <TimePicker.RangePicker format="HH:mm" />

              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col className='flex justify-end' xs={24} md={24} lg={8}>
              <button className="bg-blue-500 text-white w-20 p-1 rounded hover:bg-blue-600 ">Submit</button>


            </Col>

          </Row>

        </Form>
      )}

    </Layout>
  )
}

export default Profile
