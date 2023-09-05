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
          {moment(record.date).format('DD-MM-YYYY')} &nbsp;
          {moment(record.time).format('HH:mm')}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record) => (
        <div className="flex">
          {record.status === 'pending' && (
            <div className="flex">
              <button onClick={() => handleStatus(record, 'approved')}>Approved</button>
              <button onClick={() => handleStatus(record, 'reject')}>Reject</button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>Doctor Appointments</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;