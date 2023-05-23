import React from 'react'
import TasksList from './TaskList'
import { useAppDispatch,useAppSelector } from '@/redux/hooks'
import EditTask from './EditTask'


export default function TaskSection(){
    const isEditing=useAppSelector(state=>state.editTodo.isEditing)
    return(
        <div className={`taskSec ${isEditing && "taskSec-closed"}`}>
            <TasksList/>
            {isEditing && <EditTask/> }
        </div>
    )
}