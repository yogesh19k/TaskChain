import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Tasks,TaskList,AddTodo} from '../Type'


const initialState:{isTranSubmitted:boolean}={isTranSubmitted:false}

export const tranSubmitSlice =createSlice({
    name:"editTodo",
    initialState,
    reducers:{
        changeTranState:(state,action:PayloadAction<{isTranSubmitted:boolean}>)=>{
            return(action.payload)
        }
    }
})


export const {changeTranState} = tranSubmitSlice.actions

export default tranSubmitSlice.reducer