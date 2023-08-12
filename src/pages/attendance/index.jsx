import Teacher from "./teacher";
import Student from "./student";

import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

import Cookies from "universal-cookie";
import { useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getTeacherAttendance, getStudentAttendance } from "/src/redux/attendanceReducer";

const cookie = new Cookies

const Attendances = () => {
    const mode = cookie.get('mode')

    const dispatch = useDispatch()

    const match = useMatch('/home/attendance/:classId');
    const class_id = match?.params?.classId || '';

    const _class = useSelector(state => state.class)

    const [date, setDate] = useState(new Date())

    const updateDate = (date) => {
        setDate(date)
        if(mode=='teacher'){
            dispatch(getTeacherAttendance({ class_id, date }))
        }else{
            dispatch(getStudentAttendance({ class_id, date }))
        }
        }

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
            {mode == 'student' ? <Student date={date} class_id={class_id} _class={_class} /> : <Teacher date={date} class_id={class_id} _class={_class} />}
        </div>
    )
}

export default Attendances