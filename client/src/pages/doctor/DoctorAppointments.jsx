import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../../components/Layout';
import { Table, message } from 'antd';
import moment from 'moment';

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get('/api/doctor/doctor-appointments', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      console.log(res)

      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        '/api/doctor/update-status',
        { appointmentsId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getAppointments();
      }
    } catch (error) {
      console.log(error);
      message.error('Something Went Wrong');
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: '_id',
    },
    {
      title: 'Date & Time',
      dataIndex: 'date',
      render: (text, record) => (
        <span>
          {moment(record.date).format('MM-DD-YYYY')} &nbsp;
          {moment(record.time).format('HH:mm').toString()}
        </span>
      ),
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    // },
    {
      // title: 'Actions',
      // dataIndex: 'actions',
      // render: (text, record) => (
      //   <div className="flex">
      //    {record.status === 'pending' && (
      //       <div classNam e="flex">
      //         <button onClick={() => handleStatus(record, 'approved')}>Approved</button>
      //         <button onClick={() => handleStatus(record, 'reject')}>Reject</button>
      //       </div>
      //     )}
      //   </div>
      // ),
    },
  ];

  return (
    <Layout>

      <div className="flex items-center ">
        <img className="w-16 h-16" src="\images\logo1.jpg" alt="doclogo" />
        <h1 className="ml-2 font-bold"> Scheduled Appointments </h1>
      </div>

      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;