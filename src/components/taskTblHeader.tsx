import { Row } from "react-bootstrap"
const TaskTblHeader=()=>{
    return(
         <Row className='p-2 mb-2 bg-dark text-white' style={{ marginTop: '10px' }}>
                <div className='col-4'>ID</div>
                <div className='col-2'>Title</div>
                <div className='col-3'>Description</div>
                <div className='col-2'> Priority</div>
                <div className='col-1'>Status</div>               
                
            </Row>
    )
}

export default TaskTblHeader;