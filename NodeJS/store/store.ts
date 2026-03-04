import { configureStore } from "@reduxjs/toolkit";
import reducer from "./taskSlice";


export const store = configureStore({
reducer:{
    task:reducer
}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;