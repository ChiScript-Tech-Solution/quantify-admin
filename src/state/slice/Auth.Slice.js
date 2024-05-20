import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { publicRequest, setAuthToken } from "../../app/config";


export const loginUser = createAsyncThunk('/pitcher/auth/loginUser', async (payload, { rejectWithValue }) => {
  try {
      const { data } = await publicRequest.post(``, payload);
      setAuthToken(data?.data.token);
      return data;
  } catch (error) {
      return rejectWithValue(error)   
  }
})



const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  loading: false,
  error: "",
  isSuccess: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('user');
      state.user = null;
  },

     // a function to update the user when data changes
     updateUserDetails: (state, action) => {
      const updatedProfile = action.payload;
      if (!state.user) {
        return state;
      }  
      const updatedUserState = {
        ...state.user,
        ...updatedProfile,
      };

      const updatedState = {
        ...state,
        user: updatedUserState,
      };
    
      localStorage.setItem("user", JSON.stringify(updatedUserState));
      return updatedState;
    },
    
  },


  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.isSuccess = true;
        state.user = action.payload.data;
        localStorage.setItem('user', JSON.stringify(state.user));
      })

      
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isSuccess = false;
        state.error = action.payload;

      });
  },
});

export default authSlice.reducer;
export const { logoutUser, updateUserDetails } = authSlice.actions