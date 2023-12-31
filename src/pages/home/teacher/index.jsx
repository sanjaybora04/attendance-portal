import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTeacherClasses} from '/src/redux/profileReducer'
import api from '/src/api'
import { Link } from 'react-router-dom'

const Home = () => {
    const dispatch = useDispatch()
    
    
    const myclasses = useSelector(state => state.profile.classes.teacher) //list of all classes
    
    // Container States
    const [addClass, setAddclass] = useState(false)

    //Add class
    const [className, setClassname] = useState('')
    
    
    /**
     * Add New Class
    */
   const submitClass = () => {
       api.post('/addClass', { name: className })
       .then(() => { dispatch(getTeacherClasses()) })
    };
    
    /**
     * Delete Class 
    */
   const deleteClass = (e, _class) => {
       e.preventDefault()
        
       const confirmDelete = window.confirm("Delete " + _class.name + "?\nAll class data will be deleted!!")
       
       if (confirmDelete) {
           api.post('/deleteClass', { class_id: _class.id })
           .then(() => { dispatch(getTeacherClasses()) })
        }
    }

    useEffect(()=>{
        dispatch(getTeacherClasses())
    },[])
    
    return (
        <>
            <div className='block text-center'>
                <button className='p-1 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-blue-500/40 shadow-lg hover:bg-gradient-to-tr hover:from-blue-900 hover:to-blue-700'
                    onClick={() => { setAddclass(!addClass) }}
                    >
                    Create new class
                </button>
                {addClass &&
                    <div className='p-3 md:ml-44 left-[calc(50%-128px)] rounded-lg shadow-lg absolute w-64 grid grid-cols-2 bg-white'>
                        <div className='col-span-2'>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-900"
                                >
                                Class Name
                            </label>
                            <input
                                type="text"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                                placeholder="Enter class name"
                                required=""
                                value={className}
                                onChange={event => setClassname(event.target.value)}
                            />
                        </div>

                        <div className='col-span-2 pt-3'>
                            <button className='font-medium rounded-lg text-md px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600'
                                onClick={() => { submitClass(); setAddclass(!addClass) }}
                                >
                                Add Subject
                            </button>
                        </div>
                    </div>
                }


            </div>
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/4 border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase">
                                </p>
                            </th>

                            <th className="border-b w-2/4 border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase">
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-blue-gray-50 py-3 px-5 text-left">
                                <p className="block antialiased font-sans text-[11px] font-bold uppercase">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {myclasses.map(_class => {
                            return <Link to={'/home/class/' + (_class.id)} key={_class.id} className='w-full'>
                                <tr className='flex justify-between'>
                                    <td className="py-3 px-5 w-1/4 border-b border-blue-gray-50">
                                        <p className="block antialiased font-sans text-sm leading-normal font-semibold">
                                            {_class.name}
                                        </p>
                                    </td>
                                    <td className="py-3 px-5 w-2/4 border-b border-blue-gray-50">
                                        <div className="block">
                                        </div>
                                    </td>
                                    <td className="py-3 px-5 w-1/4 border-b border-blue-gray-50">
                                        <div className="block">
                                            <button className="font-medium rounded-xl text-sm py-1 px-2 text-center text-white bg-red-600 hover:bg-red-700 shadow-md shadow-red-300"
                                                onClick={e => deleteClass(e, _class)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </Link>
                        })}
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default Home