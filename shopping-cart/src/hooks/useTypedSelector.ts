import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { Dispatch } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState, AppDispatch } from "../store";
import { CartActionTypes } from "../store/actionTypes";

export const useAppDispatch = (): Dispatch<CartActionTypes> & ThunkDispatch<RootState, undefined, CartActionTypes> =>
  useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
