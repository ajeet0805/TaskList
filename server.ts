
const express = require('express');

const cors = require('cors');
import { store } from "./store/store";
import { addTask, removeTask, searchTask } from "./store/taskSlice";
const HEADER_NAME = "x-task-delete-key";
const DELETE_KEY = "cefcc0c5-52be-4853-87ea-de0c8cf6c4be";
const app = express();
app.use(cors());
app.use(express.json());

//Get all Task list
app.get('/taskList', (req: any, res: any) => {
    const state = store.getState();
    res.json(state?.task.taskList)
});

app.post('/taskList', (req: any, res: any) => {
    const { id, title, description, priority, status } = req.body;
    store.dispatch(addTask({ id, title, description, priority, status }));
    const state = store.getState();
    res.json(state?.task.taskList)
});

app.delete('/taskList/:id', (req: any, res: any) => {
    const idx = req?.params?.id;
    const key = req.headers[HEADER_NAME];
    if (key === DELETE_KEY) {       
        store.dispatch(removeTask(idx));
        res.json({ message: "Task removed" });
    }else{
       res.json({ message: "something went wrong" });  
    }
    //console.log(req);
});
app.get('/taskList/:idx', (req: any, res: any) => {
    const idx = req?.params?.idx;
    const state = store.getState();
    res.json(state?.task.taskList)
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});