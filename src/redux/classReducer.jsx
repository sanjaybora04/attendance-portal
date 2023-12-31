import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getClass = createAsyncThunk(
  'user/getClass',
  (class_id) => {
    return api.post('/getClass', { class_id })
      .then((response) => response.data)
  }
)

const initialState = {
  name: 'Class',
  students:[],
  loading: false,
  error: ''
}

export const classSlice = createSlice({
  name: 'class',
  initialState,
  extraReducers: (builder) => {

    builder.addCase(getClass.pending, state => {
      state.loading = true
    })

    builder.addCase(getClass.fulfilled, (state, action) => {
      state.loading = false
      state.name = action.payload.name
      state.students = action.payload.students
      state.error = ''
    })

    builder.addCase(getClass.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
  },
})

// Action creators are generated for each case reducer function
export { getClass }

export default classSlice.reducer