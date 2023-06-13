import {Row, Spinner} from "react-bootstrap";
import {useSelector} from "react-redux";

export const Loading = () => {
    const isLoading = useSelector((state) => state.notification.isLoading);

    return isLoading &&
        <Row className="justify-content-md-center mt-5">
            <Spinner animation="border" variant="primary" /> <br/>
        </Row>
}
