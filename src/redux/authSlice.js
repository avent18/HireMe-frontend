import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({

  name: 'auth',
  initialState: {
     loading: false,
      user: null,//at starting user is null
    },
    reducers: {
      //actions
      setLoading: (state, action) => {
        state.loading = action.payload;
    },
        //set user
        //action.payload is the user object
    setUser:(state, action) => {
            state.user = action.payload;
        }
}});
export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;