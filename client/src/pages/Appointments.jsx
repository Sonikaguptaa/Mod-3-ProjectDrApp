import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import { Table } from 'antd'
import moment from "moment";



const Appointments = () => {


  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/user/user-appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })

      if (res.data.success) {
        setAppointments(res.data.data)
      }

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAppointments()
  }, [])

  const columns = [
    {
      title: 'ID',
      dataIndex: "_id",
    },
    // {
    //   title: "Name",
    //   dataIndex: "name",
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorInfo.firstName} {record.doctorInfo.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   render: (text, record) => <span>{record.doctorInfo.phone}</span>,
    // },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("MM-DD-YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },

  ]

  return (
    <Layout>
      <div className="flex items-center ">
        <img className="w-16 h-16" src="\images\drSign.jpg" alt="doclogo" />
        <h1 className="ml-2 font-bold">Appointments List</h1>
      </div>
      <Table columns={columns} dataSource={appointments.map(appointment => ({

        ...appointment,
        key: appointment.id,
      }))} />

    </Layout>
  )
}

export default Appointments
