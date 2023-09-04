import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'
import { DatePicker, TimePicker } from 'antd'
import moment from 'moment'


const BookingPage = () => {

  const params = useParams()
  const [doctors, setDoctors] = useState([])
  const [date, setDate] = useState()
  const [timings, setTimings] = useState()


  //login user Data
  const getUserData = async () => {
    console.log(params.doctorId)

    try {
      const res = await axios.post('/api/doctor/getDoctorById', { doctorId: params.doctorId }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data)
        console.log(res.data.data)
      }

    } catch (error) {
      console.log(error)

    }

  }

  useEffect(() => {
    getUserData()
  }, [])


  return (
    <Layout>
      <h1>Booking Page</h1>

      <div className=''> {doctors && (
        <div>
          <h4> Dr.{doctors.firstName} {doctors.lastName}</h4>

          <h4>Timings: {doctors.timings} - {doctors.timings}</h4>
          <div className='flex flex-col'>
            <DatePicker format='DD-MM-YYYY' onChange={() => moment(value)} />
            <TimePicker.RangePicker format='HH:mm ' />
            <button className='m-2'> CheckAvailabity</button>
          </div>
        </div>
      )}

      </div>
    </Layout>
  )
}

export default BookingPage
