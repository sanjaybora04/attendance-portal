import Teacher from "./teacher";
import Student from "./student";

import Cookies from "universal-cookie";
import { Link, useMatch } from "react-router-dom";
import { useSelector } from "react-redux";

const cookie = new Cookies

const Class = () => {
    const mode = cookie.get('mode')

    const match = useMatch('/home/class/:classId');
    const class_id = match?.params?.classId || '';

    const _class = useSelector(state => state.class)

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
                </h6>
            </div>
            {mode == 'student' ? <Student class_id={class_id} _class={_class} /> : <Teacher class_id={class_id} _class={_class} />}
        </div>
    )
}

export default Class