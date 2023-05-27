import { nanoid } from "nanoid"

export interface Tasks{
    id :ReturnType<typeof nanoid>,
    title:string,
    description:string,
    isDone:boolean,
}

export interface TaskList{
    Id:string,
    todos:Tasks[]
}

export interface AddTodo{
    Id:string,
    todo:Tasks
}

type ContractTasks=[
    string,
    string,
    string,
    boolean,
]

export type ContractTaskList=[
    string,
    ContractTasks[]
]