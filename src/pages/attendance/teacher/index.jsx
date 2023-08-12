import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClass } from '/src/redux/classReducer'
import { getTeacherAttendance } from '/src/redux/attendanceReducer'
import api from '/src/api'



const Attendances = ({ date, class_id, _class }) => {
    const dispatch = useDispatch()


    const attendances = useSelector(state => state.attendances.teacher)

    const [attendanceList, setAttendanceList] = useState([])
    const [attendanceId, setAttendanceId] = useState(null)

    const setAttendanceData = (e, list, id) => {
        console.log(list)
        setAttendanceList(list.map(student => student.email))
        setAttendanceId(id)
    }

    const postAttendance = (e) => {
        e.preventDefault()
        api.post('/postAttendance', { class_id, attendanceList, date: date.toDateString(), attendanceId })
            .then(() => {
                dispatch(getTeacherAttendance({ class_id, date }))
            })
    }

    const deleteAttendance = (e, id) => {
        e.preventDefault()
        api.post('/deleteAttendance', { class_id, attendanceId:id })
            .then(() => {
                dispatch(getTeacherAttendance({ class_id, date }))
            })
    }


    useEffect(() => {
        dispatch(getClass(class_id))
        dispatch(getTeacherAttendance({ class_id, date }))
    }, [])

    return (
        <>
            <div className='flex justify-center m-2'>
                Attendances on this date:
            </div>

            {attendances.map(attendance => {
                return <div className='flex justify-center m-1'>
                    <button className={'text-white hover:bg-blue-700 hover:scale-105 p-1 w-64 flex justify-center rounded-lg ' + (attendanceId == attendance.id ? 'bg-blue-700 scale-105' : 'bg-blue-500')}
                        onClick={e => setAttendanceData(e, attendance.Students, attendance.id)}>
                        {attendance.id}
                    </button>
                    <button className='text-white bg-red-500 p-1 mx-2 rounded-lg hover:scale-105' onClick={e=>{deleteAttendance(e,attendance.id)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>
            })}

            <div className='flex justify-center m-3'>
                <button className={'text-white hover:bg-green-700 hover:scale-105 w-64 flex justify-center rounded-lg ' + (attendanceId == null ? 'bg-green-700 scale-105' : 'bg-green-500')}
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
                        {attendanceId == null ? "Submit" : "Update"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default Attendances