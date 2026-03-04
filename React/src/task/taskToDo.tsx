import { Container, Row, Form } from "react-bootstrap"
import TaskTblHeader from "../components/taskTblHeader";
import TaskTblRow from "../components/taskTblRow";
import { useEffect, useState, useMemo,useDeferredValue } from "react";
import type { Task } from "../interfaces/task";
import Button from "react-bootstrap/Button";
import { useFormik } from "formik";
import { schemaTaskList } from "../utils/validation";
import api from "../api-services/apiServices";
import ErrorMsg from "../components/errorMsg";
import useDebounce from "../hooks/useDebounce";
const TaskToDo = () => {
const [displayTask, setDisplayTask] = useState<Task[]>([]);
const [filterTask, setFilterTask] = useState<Task[]>([]);
const [delTask,setDelTask]= useState<string>('');
  const [searchTitle, setSearchTitle] = useState<string>('')
  const initialValues: Task = {
    id: '',
    title: '',
    description: '',
    priority: 'High',
    status: 'Todo'
  }
  const todoFormik = useFormik({
    initialValues,
    onSubmit: async (values: Task) => {
      try {
        const res = schemaTaskList.safeParse(values);
        if (!res.success) {
          console.log(res.error.issues
          );
          res.error.issues.forEach((itesm) => {
            const res = itesm.path[0];
            if (res === 'title') {
              errors.title = itesm.message;
            } else {
              errors.description = itesm.message;
            }

          });

          return false;
        }


        const result = { ...values, id: crypto.randomUUID() }
        const response = await api.post('/taskList', result);
        setDisplayTask(response.data);
        todoFormik.resetForm();
      } catch (error) {
        console.log(error);
      }
    }
  });

  /*This is useDebounce custome hooks for filter or searching by Title*/
  const debounced = useDebounce(searchTitle, 1000);
  const deferredQuery = useDeferredValue(debounced);  
  const indexed = useMemo(
    () => displayTask.map(t => ({ ...t, title: t.title.toLowerCase() })),
    [displayTask]
  );

  const filtered = useMemo(() => {
    const searchText = deferredQuery.trim().toLowerCase();
    if (!searchText) return indexed;    
    return indexed.filter(t => t.title.includes(searchText));
  }, [indexed, deferredQuery]);
   
  useEffect(()=>{   
    if(deferredQuery.trim().length > 0){
       setDisplayTask(filtered);      
    }else{
      GetTaskList()
    }
     
  },[deferredQuery ])
  /*---------------------------end the Custome hooks------------------------------*/

  
  useEffect(() => {
    GetTaskList()
  }, [delTask]);

  const GetTaskList = async () => {
    try {
      const response = await api.get('/taskList');     
      setDisplayTask(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  const handleChanged = (e: any) => {
    setSearchTitle(e.target.value);

  }
  const deleteHandler=async(id:string)=>{
    try{
     const result = await api.delete(`/TaskList/${id}`);    
     setDelTask(result?.data?.message);    
    }catch(error){
      console.log(error);
    }
    
  }
  const { handleSubmit, handleChange, errors, touched, values } = todoFormik;
  return (
    <Container>
      <Row>
        <Form onSubmit={handleSubmit}>
          <div className='col-2 float-start ms-3'>
            <Form.Label></Form.Label>
            <Form.Control type="text" id="title" name="title" value={values.title} onChange={handleChange} placeholder="Title"></Form.Control>
            {touched.title && errors.title && <Form.Text id="title" className="text-danger">{errors.title}</Form.Text>}
          </div>
          <div className='col-2 float-start ms-3'>
            <Form.Label></Form.Label>
            <Form.Control type="text" id="description" name="description" value={values.description} onChange={handleChange} placeholder="Description"></Form.Control>
            {touched.description && errors.description && <Form.Text id="description" className="text-danger">{errors.description}</Form.Text>}
          </div>
          <div className='col-2 float-start ms-3'>
            <Form.Label></Form.Label>
            <Form.Select
              id="priority"
              name="priority"
              value={values.priority}
              onChange={handleChange}
            >
              <option value="">--select Status--</option>
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </Form.Select>
          </div>
          <div className='col-2 float-start ms-3'>
            <Form.Label></Form.Label>
            <Form.Select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="">--select Priority--</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="high">High</option>

            </Form.Select>
            {touched.status && errors.status && <Form.Text id="TxnType" className="text-danger">{errors.status}</Form.Text>}
          </div>

          <div className='col-2 float-start ms-3'>
            <Button type="submit" className="mt-4">Submit</Button>
          </div>
        </Form>

      </Row>
      <Row>
        <div className='col-10 float-start ms-3'>
          <Form.Label></Form.Label>
          <Form.Control type="text" id="searchTitle" name="searchTitle" value={searchTitle} onChange={handleChanged} placeholder="search Title"></Form.Control>

        </div>
      </Row>
      <TaskTblHeader />
      {displayTask.length > 0 ? '' : <ErrorMsg />}
      {displayTask && displayTask.length > 0 && displayTask.map((item: Task, index: number) => {
        return (<TaskTblRow {...item} index={index} onRowClick={deleteHandler} key={`${index}${item.description}`}/>)
      })}

    </Container>
  )
}

export default TaskToDo;