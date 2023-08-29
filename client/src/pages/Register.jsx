import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


let emptyForm = {
  username: '',
  password: '',
  email: ''
}

function Register({ setUser }) {

  const navigate = useNavigate()

  let [form, setForm] = useState(emptyForm)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const authResponse = await axios.post('/auth/register', form)
      const token = authResponse.data.token

      if (!token) {
        setForm(emptyForm)
        return
      }

      localStorage.setItem("token", token)

      const userResponse = await axios.get('/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setUser(userResponse.data)

      navigate('/posts')

    } catch (err) {

      console.log(err)
      alert(err.response.data.error)

    }
  }

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-semibold" >Register</h1>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChange}
            value={form.username}
          />
          <br /><br />
          <label htmlFor="email">Email:</label>
          <br />
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleChange}
            value={form.email}
          />
          <br /><br />
          <label htmlFor="password">Password:</label>
          <br />
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            value={form.password}
          />
          <br /><br />
          <div className="flex justify-center">
            <button className="bg-sandy-yellow hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
          </div>

        </form>
      </div></div>
  );
}

export default Register;
