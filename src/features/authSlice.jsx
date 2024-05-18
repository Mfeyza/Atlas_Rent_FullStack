
import {createSlice} from "@reduxjs/toolkit"
import {login, register,logout} from "../thunks/auththunk"



const authSlice=createSlice({
    name:"auth",

   initialState:{
        user:null,
        loading:false,
        error:false,
        token:"",
        image:"",
        _id:"",
        lastName:"",
        firstName:"",
        username:"",
        password:"",
        email:"",


        
    },
    reducers:{
       
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
            state.loading=true
            state.error=false
        })
        .addCase(login.fulfilled,(state,{payload})=>{
            state.loading=false
            state.error=false
            state.user=payload?.data.user.username
            state.image=payload?.data.user.image
            state.token=payload?.data.token
            state._id=payload?.data.user._id
            state.firstName=payload?.data.user.firstName
            state.lastName=payload?.data.user.lastName
            state.email=payload?.data.user.email
            state.password=payload?.data.user.password
            state.username=payload?.data.user.username
            state.phoneNumber=payload?.data.user.phoneNumber
            state.isActive=payload?.data.user.isActive
            state.isAdmin=payload?.data.user.isAdmin
            state.isLandLord=payload?.data.user.isLandLord
            
            
        })
        .addCase(login.rejected,(state)=>{
            state.loading=false
            state.error=true        
        })
        
      .addCase(register.pending, (state) => {
        state.loading = true;
      
        state.error = false;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
    
        state.loading = false;
        state.error = false;
        state.user = payload?.data.data.username;
        state.image=payload?.data.data.image
        state.token = payload?.data.token; 
        state._id=payload?.data.data._id;
        state.firstName=payload?.data.data.firstName;
        state.lastName=payload?.data.data.lastName;
        state.email=payload?.data.data.email
        state.password=payload?.data.data.password
        state.username=payload?.data.data.username
       
      })
      .addCase(register.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(logout.fulfilled,(state)=>{
        state.user = null;
        state.token = "";
        state.image="";
        state._id="";
        state.firstName="";
        state.lastName="";
        state.email="";
        state.password="";
        state.username="";
      })}


})
export const {user,_id} = authSlice.actions
export default authSlice.reducer