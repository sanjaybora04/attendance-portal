import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useMatch } from 'react-router-dom'
import { getClass } from '/src/redux/classReducer'
import { getAttendance } from '/src/redux/attendanceReducer'
import api from '/src/api'

import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

const Attendances = () => {
    const match = useMatch('/home/attendance/:classId');
    const class_id = match?.params?.classId || '';
    const dispatch = useDispatch()

    const _class = useSelector(state => state.class)
    const attendances = useSelector(state => state.attendance.attendances)

    const [date, setDate] = useState(new Date())
    const [attendanceList, setAttendanceList] = useState([])
    const [attendanceId, setAttendanceId] = useState(null)

    const setAttendanceData = (e, list, id) => {
        console.log(list)
        setAttendanceList(list.map(student => student.email))
        setAttendanceId(id)
    }

    const postAttendance = (e) => {
        e.preventDefault()
        api.post('/postAttendance', { class_id, attendanceList, attendanceId })
        .then(()=>{
            dispatch(getAttendance({class_id,date}))
        })
    }

    const updateDate = (date) => {
        setDate(date)
        dispatch(getAttendance({ class_id, date }))
    }

    useEffect(() => {
        dispatch(getClass(class_id))
        dispatch(getAttendance({ class_id, date }))
    }, [])

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    <Link to='/home' className='hover:text-pink-500'>
                        {"Classes "}
                    </Link>
                    &gt;
                    <Link to={'/home/class/' + class_id} className='hover:text-pink-500'>
                        {" " + _class.name + " "}
                    </Link>
                    &gt;
                    <Link to={'/home/attendance/' + class_id} className='hover:text-pink-500'>
                        {" Attendance "}
                    </Link>
                </h6>
            </div>

            <div className='flex justify-center m-2'>
                <DatePicker value={date} onChange={updateDate} className="w-52" />
            </div>
            <div className='flex justify-center m-2'>
                Attendances on this date:
            </div>

            {attendances.map(attendance => {
                return <div className='flex justify-center m-1'>
                    <button className='text-white bg-blue-400 hover:bg-blue-500 w-64 flex justify-center rounded-lg'
                        onClick={e => setAttendanceData(e, attendance.Students, attendance.id)}>
                        {attendance.id}
                    </button>
                </div>
            })}

            <div className='flex justify-center m-3'>
                <button className='text-white bg-green-500 hover:bg-green-700 w-64 flex justify-center rounded-lg'
                    onClick={e => setAttendanceData(e, [], null)}>
                    Add new Attendance
                </button>
            </div>

            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto mt-3">
                    <thead>
                        <tr className='flex'>
                            <th className="border-b w-1/2 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Student
                                </p>
                            </th>

                            <th className="border-b w-1/2 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Attendance
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {_class.students.map(student => {
                            return <tr className='flex justify-between'>
                                <td className="py-3 px-5 w-1/2 border-b flex">
                                    <img
                                        className="w-8 h-8 rounded-full mr-2"
                                        src={student.profilePicture}
                                        alt=""
                                    />
                                    <p className="block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold">
                                        {student.name}
                                    </p>
                                </td>
                                <td className="py-3 px-5 w-1/2 border-b flex justify-center">
                                    <p className="truncate block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold">
                                        {
                                            attendanceList.includes(student.email) ?
                                                <button className='flex font-medium rounded-xl text-sm px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600 shadow-md shadow-green-300'
                                                    onClick={() => setAttendanceList(attendanceList.filter((val) => val !== student.email))}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                                    </svg>

                                                    Present
                                                </button>
                                                : <button className='flex font-medium rounded-xl text-sm px-4 py-1 text-center text-white bg-red-500 hover:bg-red-600 shadow-md shadow-red-300'
                                                    onClick={() => setAttendanceList([...attendanceList, student.email])}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                                                    </svg>

                                                    Absent
                                                </button>
                                        }
                                    </p>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className='flex justify-center mt-5'>
                    <button className='flex font-medium rounded-xl text-sm px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600 shadow-md shadow-green-300'
                        onClick={postAttendance}>
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Attendances