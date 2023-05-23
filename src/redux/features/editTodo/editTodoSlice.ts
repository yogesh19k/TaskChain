import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import {Tasks,TaskList,AddTodo} from '../Type'


interface EditTodo{
    isEditing:boolean,
    task?:AddTodo
}

const initialState:EditTodo={isEditing:false}

export const editTodoSlice =createSlice({
    name:"editTodo",
    initialState,
    reducers:{
        editCurrentTask:(state,action:PayloadAction<EditTodo>)=>{
            return(action.payload)
        }
    }
})


export const {editCurrentTask} = editTodoSlice.actions

export default editTodoSlice.reducer