import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {

  const [users, setUsers] = useState([])

  //get users
  const getUsers = async () => {
    try {
      const res = await axios.get('/api/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (res.data.success) {
        setUsers(res.data.data)

      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // antd table colum
  const colums = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'E-mail',
      dataIndex: 'email',
    },
    {
      title: 'Doctor',
      dataIndex: 'isDoctor',
      render: (text, record) => (
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, records) => (
        <div className='flex'><button>Block</button></div>
      )

    }

  ]
  return (
    <Layout>
      <h1>Users List</h1>
      <Table columns={colums} dataSource={users} />
    </Layout>
  )
}

export default Users
