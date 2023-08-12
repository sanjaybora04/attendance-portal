import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getProfile = createAsyncThunk(
  'user/getProfile',
  () => {
    return api.post('/getProfile')
      .then((response) => response.data)
  }
)

const getTeacherClasses = createAsyncThunk(
  'user/getTeacherClasses',
  () => {
    return api.post('/getTeacherClasses')
      .then((response) => response.data)
  }
)

const getStudentClasses = createAsyncThunk(
  'user/getStudentClasses',
  () => {
    return api.post('/getStudentClasses')
      .then((response) => response.data)
  }
)


const initialState = {
  loading: false,
  error: null,
  name: '',
  email: '',
  image: '',
  classes: {
    student:[],
    teacher:[],
    loading:false,
    error:null
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    // Get Profile
    builder.addCase(getProfile.pending, state => {
      state.loading = true
    })
    builder.addCase(getProfile.fulfilled, (state, action) => {
      state.loading = false
      state.name = action.payload.name
      state.email = action.payload.email
      state.image = action.payload.profilePicture
      state.error = null
    })
    builder.addCase(getProfile.rejected, (state, action) => {
      state.loading = false
      state.error = action.error.message
    })
    // Get Teacher Classes
    builder.addCase(getTeacherClasses.pending, state => {
      state.classes.loading = true
    })
    builder.addCase(getTeacherClasses.fulfilled, (state, action) => {
      state.classes.loading = false
      state.classes.teacher = action.payload
      state.classes.error = null
    })
    // Get Student Classes
    builder.addCase(getStudentClasses.pending, state => {
      state.classes.loading = true
    })
    builder.addCase(getStudentClasses.fulfilled, (state, action) => {
      state.classes.loading = false
      state.classes.student = action.payload
      state.classes.error = null
    })
  },
})

// Action creators are generated for each case reducer function
const {setMode} = userSlice.actions;
export { getProfile, getTeacherClasses , getStudentClasses, setMode }

export default userSlice.reducer