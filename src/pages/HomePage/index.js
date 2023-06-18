import {Button} from "react-bootstrap";
import {Link} from "react-router-dom";

export const HomePage = () => {

    return <>
        <h1>HomePage</h1>
        <Link to={"/semesters"}>Semesters</Link>
        <br/>
        <Link to={"/courses"}>Courses</Link>
        <br/>
        <Link to={"/semester_courses"}>Semester Courses</Link>
        <br/>
        <Link to={"/reports"}>Reports</Link>
        <br/>
        <Link to={"/groups"}>Groups</Link>
        <br/>
        <Link to={"/groups/1"}>Group Detail</Link>
    </>
}
