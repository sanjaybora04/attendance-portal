import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getTeacherAttendance = createAsyncThunk(
  'user/attendance/getTeacherAttendance',
  ({class_id,date}) => {
    return api.post('/getTeacherAttendance', { class_id,date:date.toDateString() })
      .then((response) => response.data)
  }
)

const getStudentAttendance = createAsyncThunk(
  'user/attendance/getStudentAttendance',
  ({class_id,date}) => {
    return api.post('/getStudentAttendance', { class_id,date:date.toDateString() })
      .then((response) => response.data)
  }
)

const initialState = {
  teacher: [],
  student: [],
  loading: false,
  error: null
}

export const attendanceSlice = createSlice({
  name: 'class',
  initialState,
  extraReducers: (builder) => {
    // Get Teacher Attendance
    builder.addCase(getTeacherAttendance.pending, state => {
      state.loading = true
    })

    builder.addCase(getTeacherAttendance.fulfilled, (state, action) => {
      state.loading = false
      state.teacher = action.payload.attendances
      state.error = null
    })

    builder.addCase(getTeacherAttendance.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })

    // Get Student Attendance
    builder.addCase(getStudentAttendance.pending, state => {
      state.loading = true
    })
    
    builder.addCase(getStudentAttendance.fulfilled, (state, action) => {
      console.log(action.payload.attendances)
      state.loading = false
      state.student = action.payload.attendances
      state.error = null
    })

    builder.addCase(getStudentAttendance.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export { getTeacherAttendance, getStudentAttendance }

export default attendanceSlice.reducer