import React from 'react'
import Layout from "../components/Layout"
import { Tabs, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const NotificationPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)


  // handle read Notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/user/get-all-notification', { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`

          }
        })
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.error(res.data.message))
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('error in handleRead')
    }

  }

  //delete all notification
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/user/delete-all-notification', { userId: user._id }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      message.error('Error in delete Notification')

    }
  }


  return (

    <Layout>
      <h4 className='p-3 text-center'>Notification Page</h4>
      <Tabs defaultActiveKey='unRead'>
        <Tabs.TabPane
          key='unRead'
          tab={
            <div className='flex justify-end'>
              <h4 className='p-2' onClick={handleMarkAllRead}>
                Mark All Read
              </h4>
            </div>
          }
        >
          {user?.notification.map((NotificationMsg) => (
            <div
              key={NotificationMsg.id}
              className='cursor-pointer'
              onClick={NotificationMsg.onClickPath}
            >
              <div className=''>{NotificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane
          key='read'
          tab={
            <div className='flex justify-end'>
              <h4 className='p-2' onClick={handleDeleteAllRead}>
                Delete All Read
              </h4>
            </div>
          }
        >
          {user?.notification.map((NotificationMsg) => (
            <div
              key={NotificationMsg.id} >
              <div className='cursor-pointer' onClick={() => navigate(NotificationMsg.onClickPath)}>{NotificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
