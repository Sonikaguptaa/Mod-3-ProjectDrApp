import React from 'react'
import Layout from "../components/Layout"
import { Tabs, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { setUser } from '../redux/features/userSlice'


const NotificationPage = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)


  // handle read Notification
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/api/user/get-all-notification', { userId: user._id, },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`

          }
        })
      // dispatch(setUser(res.data))

      dispatch(hideLoading())
      if (res.data.success) {
        message.success(res.data.message)
      } else {
        message.error(res.data.message)
      }
      window.location.reload()
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
      dispatch(hideLoading())
      console.log(error)
      message.error('Error in delete Notification')

    }
  };


  return (

    <Layout>
      <h4 className='p-3 text-center'>Notification Page</h4>
      <Tabs>
        <Tabs.TabPane tab="UnRead" key={0}>

          <div className='flex justify-end cursor-pointer'>
            <h4 className='p-2' onClick={handleMarkAllRead}>
              Mark All Read
            </h4>
          </div>


          {user?.notification.map((NotificationMsg) => (
            <div className='cursor-pointer'>
              <div className='' onClick={() => navigate(NotificationMsg.onClickPath)}>

                {NotificationMsg.message}
              </div>
            </div>
          ))}
        </Tabs.TabPane>

        <Tabs.TabPane tab="Read" key={1}>

          <div className='flex justify-end'>
            <h4 className='p-2 cursor-pointer' onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>

          {user?.seenNotification.map((NotificationMsg) => (
            <div className='curser-pointer'>
              <div className="" onClick={() => navigate(NotificationMsg.onClickPath)}>
                {NotificationMsg.message}</div>
            </div>
          ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  )
}

export default NotificationPage
