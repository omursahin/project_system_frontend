import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export const HomePage = () => {

    return <>
        <h1>HomePage</h1>
        <Link to={"/semesters"}>Semesters</Link>
        <br/>
        <Link to={"/courses"}>Courses</Link>
    </>
}
