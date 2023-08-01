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
            <td className="py-3 px-5 w-1/3 border-b text-center">
                <p className="inline antialiased text-sm">
                    {_class.name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/3 border-b text-center">
                <p className="inline antialiased text-sm">
                    {_class.teacher_name}
                </p>
            </td>
            <td className="py-3 px-5 w-1/3 border-b text-center">
                <p className={`inline antialiased text-sm p-1 rounded-lg ${attendance<75?"bg-red-200":"bg-green-200"}`}>
                    {attendance}
                </p>
            </td>
        </tr>
    )
}

export default Class