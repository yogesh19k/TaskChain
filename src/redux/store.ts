import { combineReducers, configureStore } from '@reduxjs/toolkit'
import tasklistReducer from './features/taskList/taskListSlice'
import editTodoReducer from './features/editTodo/editTodoSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer,persistStore} from 'redux-persist'
import thunk from 'redux-thunk'

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    tasklist: tasklistReducer,
    editTodo: editTodoReducer,
})


const store = configureStore({
    reducer:persistReducer(persistConfig,rootReducer),
    middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
export const persistor=persistStore(store)