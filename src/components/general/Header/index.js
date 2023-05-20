import {Navbar} from "react-bootstrap";
import {useMeQuery} from "../../../store/api/auth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {notificationActions} from "../../../store/notification/notification-slice";
import {useNavigate} from "react-router-dom";
import {BoxArrowLeft} from "react-bootstrap-icons";
import {authActions} from "../../../store/auth/auth-slice";

export const Header = () => {
    const {data: user, isLoading} = useMeQuery();

    const dispatch = useDispatch();
    const nav = useNavigate();

    useEffect(() => {
        dispatch(notificationActions.showLoading(isLoading));
    }, [dispatch, isLoading]);

    useEffect(() => {
        if (!isLoading && !user) {
            nav('/login');
        }
    }, [user, nav, isLoading]);


    const logoutHandler = () => {
        localStorage.removeItem("token");
        dispatch(authActions.logout());
        dispatch(
            notificationActions.showMessage({ message: "Logged out successfully", variant: "success" })
        );
        // navigate("/");
        window.location.reload(false);
    };

    return (
        <Navbar>
            <Navbar.Brand href="/">Proje Sistemi</Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse className="justify-content-end">
                {user && <><Navbar.Text>
                     {user?.email}
                    <BoxArrowLeft color="red" onClick={logoutHandler}/>
                </Navbar.Text>
                </>}
            </Navbar.Collapse>
        </Navbar>
    )
}
