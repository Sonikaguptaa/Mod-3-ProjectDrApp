import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate()
  return (
    <div>
      <div className='p-2 m-2 cursor-pointer' onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className=''>
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className='p-1'>
          <p>
            Specialization {doctor.specialization}
          </p>
          <p>
            Experience {doctor.experience}
          </p>
        </div>

      </div>
    </div>
  )
}

export default DoctorList
