import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import {Tasks,TaskList,AddTodo} from '../Type'
import { nanoid } from 'nanoid'


const initialState:TaskList[]=[]
// {
//     Id:"1st task List",
//     todos:[{
//         id :nanoid(),
//         title:"String",
//         description:"tesy",
//         isDone:false,
//     }]
// }


export const taskListSlice = createSlice({
    name: 'taskList',
    initialState,
    reducers: {
        createTaskList:(state,action:PayloadAction<TaskList>)=>{
            state.push(action.payload)
        },
        addNewTaskInList:(state,action:PayloadAction<AddTodo>)=>{
            return (state.map(taskList => {
                if(taskList.Id === action.payload.Id){
                    return ({
                    ...taskList,
                    todos:[...taskList.todos,action.payload.todo]
                    })
                }
                return taskList
            }))
        },
        deleteList:(state,action:PayloadAction<ReturnType<typeof nanoid>>)=>{
            return (state.filter(taskList => taskList.Id !== action.payload))
        },
        saveEditTask:(state,action:PayloadAction<AddTodo>)=>{
            return(
                state.map(taskList => {
                    if(taskList.Id === action.payload.Id){
                        return({ 
                            ...taskList,
                            todos:taskList.todos.map(todo =>{
                                if(todo.id===action.payload.todo.id){
                                    return action.payload.todo
                                }
                                return todo
                            })
                        })
                    }
                    return taskList
                })
            )
        },
        DeleteTaskInList:(state,action:PayloadAction<AddTodo>)=>{
            return(
                state.map(taskList => {
                    if(taskList.Id === action.payload.Id){
                        return({ 
                            ...taskList,
                            todos:taskList.todos.filter(todo => todo.id!==action.payload.todo.id)
                        })
                    }
                    return taskList
                })
            )
        },
        loadTaskList:(state,action:PayloadAction<TaskList[]>)=>{
            return(action.payload)
        },
        taskMarkDone:(state,action:PayloadAction<AddTodo>)=>{
            return(
                state.map(taskList => {
                    if(taskList.Id === action.payload.Id){
                        return({ 
                            ...taskList,
                            todos:taskList.todos.map(todo =>{
                                if(todo.id===action.payload.todo.id){
                                    return ({
                                        ...action.payload.todo,
                                        isDone:!action.payload.todo.isDone
                                    })
                                }
                                return todo
                            })
                        })
                    }
                    return taskList
                })
            )
        }
    },
})

// Action creators are generated for each case reducer function
export const { createTaskList,addNewTaskInList,saveEditTask,loadTaskList,taskMarkDone,deleteList,DeleteTaskInList} = taskListSlice.actions

export default taskListSlice.reducer