import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getProfile, getMyclasses } from './redux/profileReducer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './pages/layout';
import Home from './pages/home';
import Profile from './pages/profile'
import Class from './pages/class'
import Signin from './pages/auth/signin';


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProfile())
    dispatch(getMyclasses())
  }, [])
  return (
    <Router>
      <Routes>
        <Route exact path='/signin' element={<Signin />}></Route>
        <Route element={<Layout />}>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/class/:classId' element={<Class />}></Route>
          <Route exact path='/profile' element={<Profile />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </Router>
  )
}

export default App