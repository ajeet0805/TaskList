export type Priority = 'Low' | 'Medium' | 'High';
export type Status = 'Todo' | 'in_progress' | 'Done'
export interface TaskList {
    id: string,
    title:string,
    description: string,
    priority: Priority,
    status: Status,
}

export interface TaskListState {
    taskList: TaskList[];
}