import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '/src/api'


const getProfile = createAsyncThunk(
  'user/getProfile',
  () => {
    return api.post('/getProfile')
      .then((response) => response.data)
  }
)

const getMyclasses = createAsyncThunk(
  'user/getMyclasses',
  () => {
    return api.post('/getMyclasses')
      .then((response) => response.data)
  }
)

const getClasses = createAsyncThunk(
  'user/getClasses',
  () => {
    return api.post('/getClasses')
      .then((response) => response.data)
  }
)


const initialState = {
  loading: false,
  error: null,
  name: '',
  email: '',
  image: '',
  classes: [],
  myclasses: [],
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
    // Get MyClasses
    builder.addCase(getMyclasses.pending, state => {
      state.loading = true
    })
    builder.addCase(getMyclasses.fulfilled, (state, action) => {
      state.loading = false
      state.myclasses = action.payload
      state.error = null
    })
    // Get Classes
    builder.addCase(getClasses.pending, state => {
      state.loading = true
    })
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.loading = false
      state.classes = action.payload
      state.error = null
    })
  },
})

// Action creators are generated for each case reducer function
const {setMode} = userSlice.actions;
export { getProfile, getMyclasses , getClasses, setMode }

export default userSlice.reducer