import React from 'react';
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom'

const Register = () => {


  // form handler
  const onfinishHandler = (values) => {
    console.log(values)
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
