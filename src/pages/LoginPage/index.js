import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useLoginMutation} from "../../store/api/auth";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {notificationActions} from "../../store/notification/notification-slice";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, {isLoading}] = useLoginMutation();

    const nav = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(notificationActions.showLoading(isLoading));
    }, [dispatch, isLoading]);


    const sendRequest = async (e) => {
        e.preventDefault();
        const response = await login({
            email,
            password
        });

        if (response.error) {
            dispatch(notificationActions.showMessage({
                header: "Hata",
                message: response.error.data.detail,
                variant: "danger"
            }));
        } else {
            dispatch(notificationActions.showMessage({
                header: "Giriş",
                message: "Başarı ile giriş yapıldı...",
                variant: "success"
            }));
            nav("/");
        }
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email}
                                  onChange={(e) => setEmail(e.target.value)}/>
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password}
                                  onChange={(e) => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={sendRequest}>
                    Submit
                </Button>
            </Form>
        </>

    )
}
