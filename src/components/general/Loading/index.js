import {Row, Spinner} from "react-bootstrap";
import {useSelector} from "react-redux";

export const Loading = () => {
    const isLoading = useSelector((state) => state.notification.isLoading);

    return isLoading &&
        <Row className="justify-content-md-center">
            <Spinner animation="grow" size='sm' className='mr-2' variant="primary"/>
            <Spinner animation="grow" size='sm' className='mr-2' variant="secondary"/>
            <Spinner animation="grow" size='sm' className='mr-2' variant="success"/>
            <Spinner animation="grow" size='sm' className='mr-2' variant="danger"/>
            <Spinner animation="grow" size='sm' className='mr-2' variant="warning"/>
            <Spinner animation="grow" size='sm' className='mr-2' variant="info"/>
            <Spinner animation="grow" size='sm' className='mr-2' variant="dark"/>
        </Row>
}
