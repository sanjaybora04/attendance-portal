import { useState, useEffect } from "react"
import api from '/src/api'

const Class = ({_class}) => {

    const [attendance,setAttendance] = useState(null)
    const overallAttendance = ()=>{
        api.post('/getAttendance',{class_id:_class.id})
        .then(response=>{
            setAttendance(response.data.attendance)
        })
    }
    useEffect(()=>{
        overallAttendance()
    },[])

    return (
        <tr className='flex justify-between' key={_class._id}>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <p className="block antialiased text-sm">
                    {_class.name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <p className="block antialiased text-sm">
                    {_class.teacher_name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/4 border-b text-center">
                <p className="block antialiased text-sm">
                    {attendance}
                </p>
            </td>
        </tr>
    )
}

export default Class