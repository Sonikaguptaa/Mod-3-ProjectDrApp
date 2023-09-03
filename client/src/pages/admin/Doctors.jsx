import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Doctors = () => {

  const [doctors, setDoctors] = useState([])

  //get users
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/admin//getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data)

      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getDoctors()
  }, [])

  const colums = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className='flex'>
          {record.status === 'pending' ? <button className=''>Approve</button> : <button className=''>Reject</button>}
        </div>
      )

    }
  ]
  return (
    <Layout>
      <h1>Doctors List </h1>
      <Table columns={colums} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors
