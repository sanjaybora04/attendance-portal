import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Subject from './class'
import { getClasses } from '../../../redux/profileReducer';

const studentHome = () => {
    const dispatch = useDispatch()
    const classes = useSelector(state => state.profile.classes)

    useEffect(()=>{
        dispatch(getClasses())
    },[])

    return (
        <>
            {/* <div className={'block m-2 p-2 rounded-lg text-center '+(attendance>=75?"bg-green-200":"bg-red-200")}>
                OverAll Attendance :- {attendance}%
            </div><hr className='border-green-600'/> */}

            {/* Subjects list */}
            <div className="p-6 overflow-x-scroll px-0 pt-0 pb-2">
                <table className="w-full table-auto">
                    <thead>
                        <tr className='flex justify-between'>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Subject
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Teacher
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold">
                                    Attendance
                                </p>
                            </th>
                            <th className="border-b w-1/4 border-green-600 py-3 px-5 text-center">
                                <p className="block antialiased font-sans text-sm font-bold ">
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {classes.map(_class => {
                            return <Subject _class={_class}/>
                        })}
                    </tbody>
                </table>
            </div>
        </>

    )
}

export default studentHome