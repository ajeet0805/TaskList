import { Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import type { Task } from "../interfaces/task";

type TaskTblRowProps = Task & {
  index: number;
  onRowClick?: (taskId: string) => void;
};

const TaskTblRow = (props: TaskTblRowProps) => {
    const { id, title, description, priority, status,onRowClick } = props;
    return (<Row className="row  border-bottom border-dark padding-row p-2 row">
        <div className='col-2'>{id.substring(0,8)}</div>
        <div className='col-2'>{title}</div>
        <div className='col-4'>{description}</div>
        <div className='col-2'>{priority} </div>
        <div className='col-2'> {status} <Button onClick={() => onRowClick?.(id)} className="ms-1">Delete</Button></div>
    </Row>)
}

export default TaskTblRow;