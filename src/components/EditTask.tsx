import React, { useState } from "react";
import {BiArrowBack} from "react-icons/bi"
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { saveEditTask } from "@/redux/features/taskList/taskListSlice"
import { editCurrentTask } from "@/redux/features/editTodo/editTodoSlice";

export default function EditTask(){
    const editData=useAppSelector(state => state.editTodo.task)
    const [todoName,setTodoName]=useState<string>(editData?editData.todo.title:"")
    const [todoDisc,setTodoDisc]=useState<string>(editData?editData.todo.description:"")
    const dispatch =useAppDispatch()
    function handelSave(){
        if(editData)
            dispatch(saveEditTask({
                ...editData,
                todo:{
                    ...editData.todo,
                    title:todoName,
                    description:todoDisc,
                }
            }))
        dispatch(editCurrentTask({
            isEditing:false
        }))
    }

    return(
        <div className="editTask">
            <div className="editBack">
                <BiArrowBack/>
                <p>Edit Todo</p>
            </div>
            <input
                onChange={(e)=>setTodoName(e.target.value)}
                value={todoName}
                placeholder="Carrot"
            />
            <textarea
                onChange={(e)=>setTodoDisc(e.target.value)}
                value={todoDisc}
                placeholder="Carrot improves eyesight."
            ></textarea>
            <button
                onClick={()=>handelSave()}
            >Save</button>
        </div>
    )
}
