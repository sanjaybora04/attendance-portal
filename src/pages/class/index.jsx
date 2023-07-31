import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { getClass } from '../../redux/classReducer'
import EditStudentList from './editStudentList'
import api from '/src/api'

const Class = () => {
    const match = useMatch('/class/:classId');
    const class_id = match?.params?.classId || '';
    const dispatch = useDispatch()

    const _class = useSelector(state => state.class)

    const [takeAttendance, setTakeAttendance] = useState(false)

    const [attendanceList, setAttendanceList] = useState([])

    const take_attendance = (e) => {
        e.preventDefault()
        api.post('/postAttendance',{class_id,attendanceList})
    }


    useEffect(() => {
        dispatch(getClass(class_id))
    }, [])

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    Students
                </h6>
            </div>


            <div className='flex justify-between'>
                <div></div>
                <button className="font-medium rounded-xl text-sm px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600 shadow-md shadow-green-300"
                    onClick={() => setTakeAttendance(!takeAttendance)}>
                    {takeAttendance ? 'Go back' : 'Take Attendance'}
                </button>
                <div className='block text-right mr-5'>
                    {takeAttendance ? null :
                        <button className='p-1 rounded-lg bg-green-600 text-white shadow-lg hover:bg-green-700'
                        // onClick={() => { getList() }}
                        >
                            Get Report
                        </button>
                    }
                </div>
            </div>


            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto mt-3">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/2 border-blue-gray-50 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Name
                                </p>
                            </th>

                            <th className="border-b w-1/2 border-blue-gray-50 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    {takeAttendance ? "Attendance" : "Email"}
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {_class.students.map(student => {
                            return <tr className='flex justify-between'>
                                <td className="py-3 px-5 w-1/2 border-b border-blue-gray-50 flex">
                                    <img
                                        className="w-8 h-8 rounded-full mr-2"
                                        src={student.profilePicture}
                                        alt=""
                                    />
                                    <p className="block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold">
                                        {student.name}
                                    </p>
                                </td>
                                <td className="py-3 px-5 w-1/2 border-b border-blue-gray-50 flex justify-end">
                                    <p className="truncate block antialiased font-sans text-sm leading-normal text-gray-500 font-semibold">
                                        {takeAttendance ?
                                            <>
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
                                            </> : student.email}
                                    </p>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className='flex justify-center mt-5'>
                    {takeAttendance ?
                        <button className='p-2 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-blue-500/40 shadow-lg hover:bg-gradient-to-tr hover:from-blue-900 hover:to-blue-700'
                        onClick={take_attendance}>submit
                        </button> :
                        <EditStudentList class_id={class_id} />
                    }
                </div>
            </div>
        </div>
    )
}

export default Class