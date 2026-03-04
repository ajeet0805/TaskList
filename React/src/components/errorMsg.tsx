import { Alert } from "react-bootstrap"
const ErrorMsg=()=>{
    return(<>
     <Alert variant="danger">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
         It seems the data isn’t in the list, or something didn’t work as expected. Try again!
        </p>
      </Alert>
    </>)
}

export default ErrorMsg