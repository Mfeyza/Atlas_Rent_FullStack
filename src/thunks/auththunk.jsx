import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "login",
  async ({ values, navigate }, { rejectWithValue }) => {
    
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/auth/login`,
        values
      );
     
  
      return response;
    } catch (error) {
      return rejectWithValue("olmadı");
    }
  }
);
export const register = createAsyncThunk(
  "register",
  async ({ values, navigate }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}users`,
        values
      );
      navigate("/blogs");
      return response;
    } catch (error) {
      return rejectWithValue("olmadı");
    }
  }
);

export const logout = createAsyncThunk("logout", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;

  try {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/logout`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message || "Logout failed");
  }
});
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, info }, { rejectWithValue, getState }) => {
    const token = getState().auth.token;
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}users/${id}`,
        info,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      return rejectWithValue("olmadı");
    }
  }
);
