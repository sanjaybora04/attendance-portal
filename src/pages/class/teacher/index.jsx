import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getClass } from '/src/redux/classReducer'
import AddStudents from './addStudents'
import api from '/src/api'

const Class = ({class_id,_class}) => {
    const dispatch = useDispatch()

    /**
     * Get Attendance Report
     */
    const getReport = async () => {
        const response = await api.post('/getReport', { class_id })
        const blob = new Blob([response.data.report], { type: 'text/csv' })
        // Create a URL for the Blob
        const url = URL.createObjectURL(blob);

        // Create a hidden anchor element with the download attribute
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', "Attendance_report");

        // Simulate a click on the anchor element to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up the URL and remove the anchor element
        URL.revokeObjectURL(url);
        document.body.removeChild(link);
    }


    useEffect(() => {
        dispatch(getClass(class_id))
    }, [])

    return (
        <div>
            <div className='flex justify-between'>
                <div></div>
                <Link to={'/home/attendance/' + class_id} className="font-medium rounded-xl text-sm px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600 shadow-md shadow-green-300">
                    Take Attendance
                </Link>
                <div className='block text-right mr-5'>
                    <button className='p-1 rounded-lg bg-green-600 text-white shadow-lg hover:bg-green-700'
                        onClick={() => { getReport() }}
                    >
                        Get Report
                    </button>
                </div>
            </div>


            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto mt-3">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/2 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Name
                                </p>
                            </th>

                            <th className="border-b w-1/2 py-3 px-5">
                                <p className="block antialiased font-sans text-sm font-bold uppercase">
                                    Email
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
                                        {student.email}
                                    </p>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
                <div className='flex justify-center mt-5'>
                    <AddStudents class_id={class_id} />
                </div>
            </div>
        </div>
    )
}

export default Class