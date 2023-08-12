import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getStudentAttendance } from "/src/redux/attendanceReducer"

const Attendances = ({ date, class_id, _class }) => {
    const dispatch = useDispatch()

    const attendances = useSelector(state => state.attendances.student)


    useEffect(() => {
        dispatch(getStudentAttendance({ class_id, date }))
    }, [])
    return (
        <div>
            <div className='flex justify-center'>
                Attendances
            </div>

            {attendances.length==0?<div className="flex justify-center m-2 text-gray-500">No Attendances on this date yet</div>:null}
            {attendances.map(attendance => {
                return <div className="flex justify-center m-3" key={attendance.id}>
                    <div className="text-white bg-blue-500 w-64 flex justify-center rounded-lg p-1">
                        {attendance.id}
                    </div>
                    <div className="p-1">
                    {attendance.Students.length != 0 ?

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white bg-green-300 rounded-lg mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg> :
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white bg-red-300 rounded-lg mx-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    }
                    </div>
                </div>
            })}

        </div>
    )
}

export default Attendances