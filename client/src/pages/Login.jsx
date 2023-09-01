import React from 'react';
import { Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post('/api/user/login', values)
      // window.location.reload();

      dispatch(hideLoading())

      if (res.data.success) {
        localStorage.setItem("token", res.data.token)
        message.success('Login Successfully!')
        navigate('/')

      } else {
        message.error(res.data.message)
      }

    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something went wrong')

    }
  }
  return (
    <div name='login' className='w-full h-fit bg-gradient-to-b from-gray-900  text-white'>
      <div className='max-w-screen-md p-2 mx-auto flex flex-col justify-center '>


        <div >
          <p className='text-3xl font-bold  border-gray-500 text-center'>Login</p>

        </div>
        <div className='flex justify-center items-center'>
          <Form layout="vertical" onFinish={onfinishHandler} className='flex flex-col w-full md:w-1/2 m-10 p-5 bg-transparent border-4 rounded-md text-white focus: outline-none '>




            <Form.Item label='Email' name='email'>
              <Input type='email' required />
            </Form.Item>

            <Form.Item label='Password' name='password'>
              <Input type='password' required className="w-full border p-2 rounded mb-4" />
            </Form.Item>
            <Link to='/register' className='m-2'>Not Register Yet Click here</Link>

            <button className="bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-500 "
              type="submit">Login</button>


          </Form>

        </div>
      </div>
    </div >

  )
}


export default Login;
