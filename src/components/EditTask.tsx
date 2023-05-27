import React, { useState } from "react";
import {BiArrowBack} from "react-icons/bi"
import { useAppDispatch,useAppSelector } from "@/redux/hooks";
import { loadTaskList, saveEditTask } from "@/redux/features/taskList/taskListSlice"
import { editCurrentTask } from "@/redux/features/editTodo/editTodoSlice";
import {abi,address as contractAddress} from "../Constants/contractDetails"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useNotification } from "web3uikit";
import { changeTranState } from "@/redux/features/tranSubmit/tranSubmitSlice";
import { ContractTaskList } from "@/redux/features/Type";
import {ImBin} from "react-icons/im"
import { Bell,CheckSquare } from '@web3uikit/icons'

export default function EditTask(){
    const editData=useAppSelector(state => state.editTodo.task)
    const [todoName,setTodoName]=useState<string>(editData?editData.todo.title:"")
    const [todoDisc,setTodoDisc]=useState<string>(editData?editData.todo.description:"")
    const isTranRunning =useAppSelector(state =>state.tranSubmit.isTranSubmitted)
    const dispatch =useAppDispatch()
    const notificationDispatch=useNotification()
    const { Moralis, isWeb3Enabled,account} = useMoralis()
    
    const { runContractFunction: getTodos } = useWeb3Contract({
        abi,
        contractAddress , // specify the networkId
        functionName: "getTodos",
        params: {
            user:account
        },
    })

    const { runContractFunction: updateTodo } = useWeb3Contract({
        abi,
        contractAddress , // specify the networkId
        functionName: "updateTodo",
        params: {
            listid:editData?.Id,
            todoId:editData?.todo.id,
            title:todoName,
            description:todoDisc
        },
    })

    const { runContractFunction: deleteTodo } = useWeb3Contract({
        abi,
        contractAddress , // specify the networkId
        functionName: "deleteTodo",
        params: {
            listid:editData?.Id,
            todoId:editData?.todo.id,
        },
    })

    async function getAllList(){
        const val:ContractTaskList[]= await getTodos({
            onError: (error) => console.log(error),
        }) as ContractTaskList[]
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
                message: "Transaction Submitted Please wait!",
                title: "Transaction Notification",
                position: "topL",
                icon: <Bell/>,
            })
            await tx.wait(1)
            notificationDispatch({
                    type: "success",
                    message: "Transaction Complete!",
                    title: "Transaction Notification",
                    position: "topL",
                    icon: <CheckSquare/>,
                })
            getAllList()
            dispatch(changeTranState({isTranSubmitted:false}))
        } catch (error) {
            console.log(error)
        }
    }

    async function handelTodoDell() {
        if(editData && !isTranRunning){
            walletApproveNotify()
            dispatch(editCurrentTask({
                isEditing:false
            }))
            await deleteTodo({
                onSuccess:handleSuccess,
                onError: (error) => console.log(error)
            })
        }
    }

    async function handelSave(){
        if(editData && !isTranRunning){
            walletApproveNotify()
            dispatch(editCurrentTask({
                isEditing:false
            }))
            await updateTodo({
                onSuccess:handleSuccess,
                onError: (error) => console.log(error)
            })

            // dispatch(saveEditTask({
            //     ...editData,
            //     todo:{
            //         ...editData.todo,
            //         title:todoName,
            //         description:todoDisc,
            //     }
            // }))
        }
    }

    return(
        <div className="editTask">
            <div className="editBack">
                <BiArrowBack 
                    onClick={()=>
                        dispatch(editCurrentTask({
                            isEditing:false}))
                    }
                />
                <p>Edit Todo</p>
                <span>
                    <ImBin
                    onClick={()=>handelTodoDell()}/>
                </span>
            </div>
            <input
                onChange={(e)=>{
                    if(!isTranRunning)
                        setTodoName(e.target.value)
                }}
                value={todoName}
                placeholder="Carrot"
            />
            <textarea
                onChange={(e)=>{
                    if(!isTranRunning)
                        setTodoDisc(e.target.value)
                    }}
                value={todoDisc}
                placeholder="Carrot improves eyesight."
            ></textarea>
            <button
                onClick={()=>{
                    if(!isTranRunning)
                        handelSave()
                    }}
            >Save</button>
        </div>
    )
}
