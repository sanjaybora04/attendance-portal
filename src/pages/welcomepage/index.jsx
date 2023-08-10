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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to the Attendance Portal</h1>
      <p className="text-xl text-gray-600 mb-8">Please select your role:</p>
      <div className="flex space-x-4">
        <Link to="/signin/student" className="btn btn-student">Sign In as Student</Link>
        <Link to="/signin/teacher" className="btn btn-teacher">Sign In as Teacher</Link>
      </div>
    </div>
  )
}

export default WelcomePage