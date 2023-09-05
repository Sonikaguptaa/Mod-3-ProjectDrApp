import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import axios from 'axios'
import { DatePicker, TimePicker, message } from 'antd'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { showLoading, hideLoading } from '../redux/features/alertSlice'


const BookingPage = () => {

  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const params = useParams();

  const [doctors, setDoctors] = useState([])
  const [date, setDate] = useState("")
  const [time, setTime] = useState()
  const [isAvailable, setIsAvailable] = useState(false);

  //login user Data
  const getUserData = async () => {
    // console.log(params.doctorId)

    try {
      const res = await axios.post('/api/doctor/getDoctorById', { doctorId: params.doctorId }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      if (res.data.success) {
        setDoctors(res.data.data)
        // console.log(res.data.data)
      }

    } catch (error) {
      console.log(error)

    }

  };

  // ============ handle availiblity
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        console.log(isAvailable);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };



  // =============== booking func
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };



  useEffect(() => {
    getUserData()
  }, [])


  return (
    <Layout><h3 className="text-3xl font-semibold mb-4">Booking Page</h3>
      <div className="container mx-auto m-2">
        {doctors && (
          <div className="bg-white rounded-lg p-4 shadow-md">
            <h4 className="text-xl font-semibold">
              Dr. {doctors.firstName} {doctors.lastName}
            </h4>
            {/* <h4 className="text-lg mt-2 text-gray-600">
              Fees: {doctors.feesPerCunsaltation}
            </h4> */}
            {/* <p className="mt-2 text-gray-600">
              Timings: {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}
            </p> */}
            <div className="w-1/2 mt-4 space-y-4">
              <DatePicker
                aria-required={"true"}
                className="border rounded-lg p-2 mx-1"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false)
                  setDate(moment(value).format("MM-DD-YYYY"));
                }}
              />
              <TimePicker
                aria-required={"true"}
                format="HH:mm"
                className="border rounded-lg p-3 mx-1"
                onChange={(value) => {
                  setIsAvailable(false)
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="bg-blue-500 text-white py-2 px-4 mx-2 rounded-lg hover:bg-blue-700"
                onClick={handleAvailability}
              >
                Check Availability
              </button>

              <button
                className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                onClick={handleBooking}
              >
                Book Now
              </button>



            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default BookingPage
