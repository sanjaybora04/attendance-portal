import {configureStore} from '@reduxjs/toolkit'
import profileReducer from './profileReducer'
import classReducer from './classReducer'
import attendanceReducer from './attendanceReducer'


export default configureStore({
    reducer: {
        profile: profileReducer,
        class: classReducer,
        attendances: attendanceReducer
    }
})