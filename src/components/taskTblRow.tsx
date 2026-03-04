import { Row } from "react-bootstrap";
import type { Task } from "../interfaces/task";
const TaskTblRow = (props: Task) => {
    const { id, title, description, priority, status } = props;
    return (<Row className="row  border-bottom border-dark padding-row p-2 row">
        <div className='col-4'>{id}</div>
        <div className='col-2'>{title}</div>
        <div className='col-3'>{description}</div>
        <div className='col-2'>{priority} </div>
        <div className='col-1'> {status}</div>
    </Row>)
}

export default TaskTblRow;