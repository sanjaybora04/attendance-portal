import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClass } from '../../../redux/classReducer'
import api from '/src/api'

const AddStudents = ({class_id}) => {
    const dispatch = useDispatch()

    const [addStudents,setAddStudents] = useState(false)
    const [student, setStudent] = useState('')


    const addStudent = () => {
        setAddStudents(false)

        api.post('/addStudents', {
            class_id,
            students: [student]
        }).then((response) => {
            dispatch(getClass(class_id))
        })
    }


    return (

        <div className='block text-center'>
            <button className='p-1 rounded-lg bg-gradient-to-tr from-blue-700 to-blue-500 text-white shadow-blue-500/40 shadow-lg hover:bg-gradient-to-tr hover:from-blue-900 hover:to-blue-700'
                onClick={() => { setAddStudents(!addStudents) }}
            >
                Add Student
            </button>
            {addStudents &&
                <div className='p-3 md:ml-44 left-[calc(50%-128px)] rounded-lg shadow-lg absolute w-64 grid grid-cols-2 bg-white'>
                <div className='col-span-2'>
                    <input
                        type="text"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2"
                        placeholder="Enter student's email"
                        required=""
                        value={student}
                        onChange={event => setStudent(event.target.value)}
                    />
                </div>

                <div className='col-span-2 pt-3'>
                    <button className='font-medium rounded-lg text-md px-4 py-1 text-center text-white bg-green-500 hover:bg-green-600'
                        onClick={()=>addStudent()}
                    >
                        Add Student
                    </button>
                </div>
            </div>
            }

        </div>

    )
}

export default AddStudents