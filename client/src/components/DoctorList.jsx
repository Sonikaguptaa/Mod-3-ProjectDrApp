import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='bg-white rounded-lg p-4 m-2 cursor-pointer hover:shadow-md' onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className='font-bold text-xl mb-2'>
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className='p-1'>
          <p className='mb-2'>
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p className='mb-2'>
            <b>Experience:</b> {doctor.experience} years
          </p>
          {/* Uncomment below lines if you want to display timings */}
          {/* <p className='mb-2'>
        <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
      </p> */}
        </div>
      </div>
    </div>
  )
}

export default DoctorList
