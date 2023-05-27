import React,{useEffect, useState} from "react";
import {useAppSelector,useAppDispatch} from "@/redux/hooks";
import {createTaskList,addNewTaskInList, loadTaskList, taskMarkDone} from "@/redux/features/taskList/taskListSlice";
import {editCurrentTask} from "@/redux/features/editTodo/editTodoSlice"
import {IoIosAddCircleOutline} from "react-icons/io"
import {GiSwapBag} from "react-icons/gi"
import {CiEdit} from "react-icons/ci"
import {ImBin} from "react-icons/im"
import {nanoid} from "nanoid";
import {abi,address as contractAddress} from "../Constants/contractDetails"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit"
import {Tasks,TaskList,AddTodo,ContractTaskList} from '@/redux/features/Type'
import { changeTranState } from "@/redux/features/tranSubmit/tranSubmitSlice";
import { Bell,Cross,CheckSquare } from '@web3uikit/icons'


export default function TasksList(){
    const [taskListName,setTaskListName]=useState<string>("")
    const [todoName,setTodoName]=useState<string>("")
    const [todoDisc,setTodoDisc]=useState<string>("")
    const [taskId,setTaskId]=useState<ReturnType<typeof nanoid>>()

    const { Moralis, isWeb3Enabled,account,chainId} = useMoralis()
    const notificationDispatch = useNotification()

    const dispatch = useAppDispatch();
    const tasksLists = useAppSelector(state=>state.tasklist)
    const editingInfo = useAppSelector(state =>state.editTodo)
    const isTranRunning =useAppSelector(state =>state.tranSubmit.isTranSubmitted)
    const taskElements = tasksLists.map(taskList =>{
        return(
            <div key={taskList.Id} className="List-Tasks">
                <div className="List-Task-Name">
                    <p>{`List: ${taskList.Id}`}</p>
                    <ImBin  
                        onClick={()=>{
                            if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001)
                                handelListDel(taskList.Id)
                            }}
                    />
                </div>
                <div className="addTaskInTheList">
                    <span  className="task-check-maker"><GiSwapBag/></span>
                    <input 
                        value={taskList.Id==taskId?todoName:""}
                        onChange={(e)=>{
                            if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001){
                                setTaskId(taskList.Id)
                                setTodoName(e.target.value)
                            }
                        }}
                        className="textInput"
                        placeholder="Add Todo"
                    />
                    <span className="actionButton">
                        <IoIosAddCircleOutline
                            onClick={()=>{
                                if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001)
                                    handelTodoAdd(taskList.Id)
                            }}
                        />
                    </span>
                    <textarea 
                        value={taskList.Id==taskId?todoDisc:""}
                        onChange={(e)=>{
                            if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001){
                                setTaskId(taskList.Id)
                                setTodoDisc(e.target.value)
                            }
                        }}
                        className="text-area"
                        placeholder="Add Todo Description"
                    ></textarea>
                </div>
                {taskList.todos.map(todo=>{
                    return (                
                        <div key={todo.id} className="addTaskInTheList">
                            <span
                                className={`task-check 
                                            ${todo.isDone && "task-completed"}`}
                                onClick={()=>handelMarkDone(taskList.Id,todo)}>
                                <GiSwapBag/>
                            </span>
                            <p className="textInput">
                                {todo.title}
                            </p>
                            <span className={`actionButton 
                                ${editingInfo.isEditing && "editingEnabled"} 
                                ${editingInfo.isEditing && 
                                editingInfo.task?.todo.id==todo.id && "currentEditing"}`
                                }>
                                <CiEdit onClick={()=>{
                                    if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001)
                                        handelEditTodo(taskList.Id,todo)
                                }}
                            /></span>
                            <p className="text-area">
                                {todo.description}
                            </p>
                        </div>
                    )})
                }
            </div>
        )
    })

// ----------------------------------------------------------------------

    const { runContractFunction: getTodos } = useWeb3Contract({
        abi,
        contractAddress , // specify the networkId
        functionName: "getTodos",
        params: {
            user:account
        },
    })

    const { runContractFunction: addList } = useWeb3Contract({
        abi,
        contractAddress , // specify the networkId
        functionName: "addList",
        params: {
            _id:taskListName
        },
    })

    const { runContractFunction: addTodo } = useWeb3Contract({})

    const { runContractFunction: removeList } = useWeb3Contract({})
// ---------------------------------------------------------------------------------------


    useEffect(() => {
        if (isWeb3Enabled) {
            if(parseInt(chainId!) === 80001)
                getAllList()
            else
                notificationDispatch({
                    type: "error",
                    message: "Please Connect to Polygon Mumbai (testnet)",
                    title: "Wrong Network",
                    position: "topL",
                    icon: <Bell/>
                })
        }
    }, [isWeb3Enabled,chainId])

    function walletApproveNotify(){
        notificationDispatch({
            type: "info",
            message: "Please Approve the Transaction on your wallet",
            title: "Transaction Notification",
            position: "topL",
            icon: <Bell/>,
        })
    }

    const handleSuccess = async (tx:any) => {
        try {
            dispatch(changeTranState({isTranSubmitted:true}))
            notificationDispatch({
                type: "info",
                message: "Transaction Submitted Please wait for the confirmation",
                title: "Transaction Notification",
                position: "topL",
                icon: <Bell/>,
            })
            await tx.wait(1)
            getAllList()
            notificationDispatch({
                    type: "success",
                    message: "Transaction Complete!",
                    title: "Transaction Notification",
                    position: "topL",
                    icon: <CheckSquare/>,
                })
            dispatch(changeTranState({isTranSubmitted:false}))
        } catch (error) {
            console.log(error)
        }
    }

    async function getAllList(){
        const val:ContractTaskList[]= await getTodos({
            onError: (error) => console.log(error),
        }) as ContractTaskList[] || []
        dispatch(loadTaskList(
            val.map(list =>{
                return({   
                    Id:list[0],
                    todos:list[1].map(todo => ({
                            id :todo[0],
                            title:todo[1],
                            description:todo[2],
                            isDone:todo[3],})
                        )
                })
            })
        ))
    }

    function containerClicked(){
        if(isTranRunning){
            notificationDispatch({
                type: "error",
                message: "Please Wait for the last transaction",
                title: "Transaction Notification",
                position: "topL",
                icon: <Cross/>,
            })
        }
        if(!isWeb3Enabled){
            notificationDispatch({
                type: "error",
                message: "Please connect with your wallet",
                title: "Wallet Connection",
                position: "topL",
                icon: <Cross/>
            }) 
        }
        else if(parseInt(chainId!) !== 80001){
            notificationDispatch({
                type: "error",
                message: "Please Connect to Polygon Mumbai (testnet)",
                title: "Wrong Network",
                position: "topL",
                icon: <Cross/>,
            })
        }
            
    }

    async function handelListDel(Id:string){
        if(!isTranRunning){
            walletApproveNotify()
            await removeList({params:{
                abi,
                contractAddress , // specify the networkId
                functionName: "removeList",
                params: {
                    _id:Id
                }},
                onSuccess: handleSuccess,
                onError: (error) => console.log(error)
            })  
        }
    }

    function handelMarkDone(Id:string,todo:Tasks){
        dispatch(taskMarkDone({
            Id,
            todo
        }))
    }

    function handelEditTodo(Id:string,todo:Tasks){
        dispatch(editCurrentTask({
            isEditing:true,
            task:{
                Id,
                todo
            }
        }))
    }

    async function  handelTaskListAdd() {
        if(taskListName!="" && !isTranRunning){
            if(isWeb3Enabled){
                console.log("sending")
                walletApproveNotify()
                await addList({
                    onSuccess: handleSuccess,
                    onError: (error) => console.log(error)
                })
            }
            else{
                // dispatch(createTaskList({
                //     Id:taskListName,
                //     todos:[]
                // }))
            }
        }
        setTaskListName("")
        
    }

    async function handelTodoAdd(Id:string){
        if(todoName!="" && todoDisc!="" && !isTranRunning && taskId == Id ){
            walletApproveNotify()
            await addTodo({params:{
                abi,
                contractAddress , // specify the networkId
                functionName: "addTodo",
                params: {
                    listid:Id,
                    title:todoName,
                    description:todoDisc
                }},
                onSuccess: handleSuccess,
                onError: (error) => console.log(error)
            })  

            // dispatch(addNewTaskInList({
            //     Id,
            //     todo:{
            //         id :nanoid(),
            //         title:todoName,
            //         description:todoDisc,
            //         isDone:false,
            //     }
            // }))
            setTodoDisc("")
            setTodoName("")
        }
        
    }

    return(
        <div onClick={()=>containerClicked()} className="tasksList">
            {taskElements}
            <div className="addTask-list">
                <input
                    value={taskListName}
                    onChange={(e)=>{
                        if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001)
                            setTaskListName(e.target.value)
                        }}
                    placeholder="Add Todo-List"
                />
                <IoIosAddCircleOutline
                    onClick={()=>{
                        if(!isTranRunning && isWeb3Enabled && parseInt(chainId!) === 80001)
                            handelTaskListAdd()
                    }}
                />
            </div>
        </div>
    )
}