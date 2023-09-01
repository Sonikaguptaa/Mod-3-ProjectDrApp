import React from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';



const Register = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  // form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post('/api/user/register', values)

      dispatch(hideLoading())

      if (res.data.success) {
        message.success('Register Successfully!')
        navigate('/login');

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
    <div name='register' className='w-full h-fit bg-gradient-to-b from-gray-800  text-white'>
      <div className='max-w-screen-md pt-3 mx-auto flex flex-col justify-center '>


        <div >
          <p className='text-3xl font-bold  border-gray-500 text-center'>Register</p>

        </div>
        <div className='flex justify-center items-center'>
          <Form layout="vertical" onFinish={onfinishHandler} className='flex flex-col w-full md:w-1/2 m-3 p-3  border-4 rounded-md text-gray '>


            <Form.Item label='Name' name='name' >

              <Input type='text' required />
            </Form.Item>

            <Form.Item label='Email' name='email'>
              <Input type='email' required />
            </Form.Item>

            <Form.Item label='Password' name='password'>
              <Input type='password' required className="w-full border p-2 rounded mb-4" />
            </Form.Item>
            <Link to='/login' className='m-2'>Already User Click here</Link>

            <button className="bg-gray-300 text-gray-900 px-4 py-2 rounded hover:bg-gray-500 "
              type="submit">Register</button>






          </Form>

        </div>
      </div>
    </div >

  )
}


export default Register;
