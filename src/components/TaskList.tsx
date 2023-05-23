import React,{useEffect, useState} from "react";
import {useAppSelector,useAppDispatch} from "@/redux/hooks";
import {createTaskList,addNewTaskInList, loadTaskList} from "@/redux/features/taskList/taskListSlice";
import {editCurrentTask} from "@/redux/features/editTodo/editTodoSlice"
import {IoIosAddCircleOutline} from "react-icons/io"
import {GiSwapBag} from "react-icons/gi"
import {CiEdit} from "react-icons/ci"
import {nanoid} from "nanoid";
import {Tasks,TaskList,AddTodo} from '@/redux/features/Type'


export default function TasksList(){
    const [taskListName,setTaskListName]=useState<string>("")
    const [todoName,setTodoName]=useState<string>("")
    const [todoDisc,setTodoDisc]=useState<string>("")
    const [taskId,setTaskId]=useState<ReturnType<typeof nanoid>>()
    const dispatch = useAppDispatch();
    const tasksLists = useAppSelector(state=>state.tasklist)
    useEffect(()=>{
        const redux=localStorage.getItem("reduxTaskList")
        if(redux){
            dispatch(loadTaskList(JSON.parse(redux)))
        }
    },[])
    useEffect(()=>{
        localStorage.setItem('reduxTaskList',JSON.stringify(tasksLists))
    })
    const taskElements = tasksLists.map(taskList =>{
        return(
            <div key={taskList.Id} className="List-Tasks">
                <p>{`List: ${taskList.Id}`}</p>
                <div className="addTaskInTheList">
                    <span><GiSwapBag/></span>
                    <input 
                        value={taskList.Id==taskId?todoName:""}
                        onChange={(e)=>{
                            setTaskId(taskList.Id)
                            setTodoName(e.target.value)
                        }}
                        className="textInput"
                        placeholder="Add Todo"
                    />
                    <IoIosAddCircleOutline
                        onClick={()=>handelTodoAdd(taskList.Id)}
                    />
                    <textarea 
                        value={taskList.Id==taskId?todoDisc:""}
                        onChange={(e)=>{
                            setTaskId(taskList.Id)
                            setTodoDisc(e.target.value)
                        }}
                        className="text-area"
                        placeholder="Add Todo Description"
                    ></textarea>
                </div>
                {taskList.todos.map(todo=>{
                    return (                
                        <div key={todo.id} className="addTaskInTheList">
                            <span><GiSwapBag/></span>
                            <p className="textInput">
                                {todo.title}
                            </p>
                            <CiEdit onClick={()=>handelEditTodo(taskList.Id,todo)}
                            />
                            <p className="text-area">
                                {todo.description}
                            </p>
                        </div>
                    )})
                }
            </div>
        )
    })
    
    function handelEditTodo(Id:string,todo:Tasks){
        dispatch(editCurrentTask({
            isEditing:true,
            task:{
                Id,
                todo
            }
        }))
    }

    function handelTaskListAdd() {
        if(taskListName!="")
            dispatch(createTaskList({
                Id:taskListName,
                todos:[]
            }))
        setTaskListName("")
    }

    function handelTodoAdd(Id:string){
        if(todoName!="" && todoDisc!="" &&taskId == Id){
            dispatch(addNewTaskInList({
                Id,
                todo:{
                    id :nanoid(),
                    title:todoName,
                    description:todoDisc,
                    isDone:false,
                }
            }))
            setTodoDisc("")
            setTodoName("")
        }
        
    }

    return(
        
        <div className="tasksList">
            {taskElements}
            <div className="addTask-list">
                <input
                    value={taskListName}
                    onChange={(e)=>setTaskListName(e.target.value)}
                    placeholder="Add Todo-List"
                />
                <IoIosAddCircleOutline
                    onClick={()=>handelTaskListAdd()}
                />
            </div>
        </div>
    )
}