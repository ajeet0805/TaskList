import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TaskList,TaskListState } from "./schema";
const initialState: TaskListState = {
    taskList: []
}

const taskSlice = createSlice({
    name: 'tasklist',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<TaskList>) => {
            state.taskList.push(action.payload);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload);
        },
        searchTask:(state,action:PayloadAction<any>)=>{
                state.taskList = state.taskList.filter((task) => task.title === action.payload);
        }

    }
});
export const {addTask,removeTask,searchTask}= taskSlice.actions;
export default taskSlice.reducer;
