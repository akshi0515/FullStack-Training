import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import cartReducer from "./reducers/cartReducer";

const store = createStore(cartReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
