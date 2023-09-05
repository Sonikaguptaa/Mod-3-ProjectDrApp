import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Row } from 'antd'
import DoctorList from '../components/DoctorList'

const HomePage = () => {

  const [doctors, setDoctors] = useState([])

  //login user Data
  const getUserData = async () => {

    try {
      const res = await axios.get('/api/user/getAllDoctors', {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
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
    getUserData()
  }, [])

  return (
    <Layout>
      <div>
        <div className="flex items-center justify-center">
          <img src="\images\DrSign1.png" alt="Doctor's Image" className="mx-auto w-1/4" />
          <div className="text-center ml-4">
            <h1 className="text-3xl font-bold">Health First</h1>
            <p>
              If you have symptoms like those of the common cold, you may have COVID-19. It is important to test yourself to avoid spreading the virus and to initiate early treatment if you are high risk. Are you COVID-19 ready? Our COVID-19 Readiness Plan can help you create a personal plan to support your COVID-19 readiness!

              If you are attempting to schedule an appointment online with your provider and do not see available appointment times that meet your needs, please contact your provider’s office directly.
            </p>
          </div>
        </div>
      </div>






      <h1 className='text-3xl font-bold'>Providers: </h1>
      <div className=' bg-gradient-to-b from-gray-200 to-black  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' >
        {doctors &&
          doctors.map(doctor => (
            <DoctorList key={doctor._id} doctor={doctor} />
          ))}
      </div>
    </Layout>
  )
}

export default HomePage
