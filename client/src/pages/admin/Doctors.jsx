import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table, message } from 'antd'

const Doctors = () => {
  const [doctors, setDoctors] = useState([])

  // Get doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get('/api/admin/getAllDoctors', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Handle account status
  const handleAccountStatus = async (record, status) => {
    console.log(record)
    try {
      // const res = await axios.post('/api/admin/changeAccountStatus', { doctorId: record._id, userId: record.userId, status: status }, 
      const res = await axios.post(
        "/api/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload()
      }
    } catch (error) {
      message.error("Error in Handle Account");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => (
        <span>{record.firstName} {record.lastName}</span>
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',

      render: (text, record) => (
        <div className="flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger"  >Reject</button>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>


      <div className="flex items-center ">
        <img className="w-16 h-16" src="\images\drl1.png" alt="doclogo" />
        <h1 className="ml-2 font-bold"> Doctor List </h1>
      </div>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  )
}

export default Doctors;