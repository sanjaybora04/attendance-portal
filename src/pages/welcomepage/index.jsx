import React from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookie = new Cookies

const WelcomePage = () => {
  const token = cookie.get('token')
  
  if (token) {
    window.location.pathname = '/home'
  }

  return (
    <div  className="md:bg-[url('/ipad.jpeg')] lg:bg-[url('/wall.jpeg')] sm:bg-[url('/ipad.jpeg')] bg-no-repeat bg-cover bg-[url('/small.jpeg')]  h-full w-full lg:w-full lg:h-full  flex flex-col items-center justify-center min-h-screen ">
    <h1 id="heading" className="text-lg lg:text-4xl sm:text-2xl text-center font-bold text-gray-800 mb-:w-6 font-mono " >Welcome to the Attendance Portal</h1>
    <p className="text-sm sm:text-2sm lg:text-2xl text-gray-600 mb-8 font-mono font-bold">Please select your role:</p>
    <div className="flex flex-col space-y-4 font-mono lg:flex-row lg:space-x-4 lg:space-y-0">
      <Link to="/signin/student" className="btn btn-student text-sm sm:text-2px md:text-md px-4 py-2 rounded-md border border-black hover:bg-black hover:text-white  ">Sign In as Student</Link>
      <Link to="/signin/teacher" className="btn btn-teacher text-sm sm:text-2px md:text-md px-4 py-2 rounded-md border border-black hover:bg-black hover:text-white">Sign In as Teacher</Link>
    </div>
  </div>
  )
}

export default WelcomePage