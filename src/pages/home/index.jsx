import { useDispatch, useSelector } from 'react-redux'
import { toogleMode } from '/src/redux/profileReducer'
import TeacherHome from './teacherHome'
import StudentHome from './studentHome'

const Home = () => {
    const dispatch = useDispatch()
    const mode = useSelector(state => state.profile.mode)

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    Classes
                </h6>
                <button className=' bg-blue-800 text-white font-bold rounded-lg px-2 flex' onClick={()=>dispatch(toogleMode())}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                    {mode == "student" ? "Teacher Mode" : "Student Mode"}
                </button>
            </div>
            
            {mode=="student"?<StudentHome/>:<TeacherHome/>}
        </div>

    )
}

export default Home