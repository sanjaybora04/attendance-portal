import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getAttendance = createAsyncThunk(
  'user/class/getAttendance',
  ({class_id,date}) => {
    return api.post('/getAttendanceData', { class_id,date:date.toDateString() })
      .then((response) => response.data)
  }
)

const initialState = {
  attendances:[],
  loading: false,
  error: ''
}

export const attendanceSlice = createSlice({
  name: 'class',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(getAttendance.pending, state => {
      state.loading = true
    })

    builder.addCase(getAttendance.fulfilled, (state, action) => {
      state.loading = false
      state.attendances = action.payload.attendances
      state.error = ''
    })

    builder.addCase(getAttendance.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export { getAttendance }

export default attendanceSlice.reducer