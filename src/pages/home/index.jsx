import Cookies from 'universal-cookie';

const cookie = new Cookies

import TeacherHome from './teacherHome'
import StudentHome from './studentHome'
import { Link } from 'react-router-dom';


const Home = () => {
    const mode = cookie.get('mode')

    return (
        <div className="flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
            <div className="flex justify-between bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-blue-600 to-blue-400 text-white shadow-blue-500/40 shadow-lg -mt-6 mb-8 p-6">
                <h6 className="block antialiased tracking-normal font-sans text-base font-semibold leading-relaxed text-white">
                    <Link to='/home' className='hover:text-pink-500'>
                        Classes
                    </Link>
                </h6>
            </div>
            
            {mode=="student"?<StudentHome/>:<TeacherHome/>}
        </div>

    )
}

export default Home