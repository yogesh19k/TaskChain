import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux";
import {RootState,AppDispatch} from "./store"

type dispatchFunc = ()=>AppDispatch

export const useAppDispatch:dispatchFunc =useDispatch
export const useAppSelector:TypedUseSelectorHook<RootState>=useSelector