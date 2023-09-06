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
        <div className='flex bg-slate-600 px-1 text-white'><button>Block</button></div>
      )

    }

  ]
  return (
    <Layout>

      <div className="flex items-center ">
        <img className="w-16 h-16" src="\images\ul.png" alt="doclogo" />
        <h1 className="ml-2 font-bold"> User List </h1>
      </div>

      <Table columns={colums} dataSource={users} />
    </Layout>
  )
}

export default Users
