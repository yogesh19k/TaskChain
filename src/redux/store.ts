import { configureStore } from '@reduxjs/toolkit'
import tasklistReducer from './features/taskList/taskListSlice'
import editTodoReducer from './features/editTodo/editTodoSlice'

const store = configureStore({
    reducer:{
        tasklist: tasklistReducer,
        editTodo: editTodoReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store