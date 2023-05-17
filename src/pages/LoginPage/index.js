import {Alert, Button, Form} from "react-bootstrap";
import {useState} from "react";
import {LOGIN_URL} from "../../helpers/urls";
import {useLoginMutation} from "../../store/api/auth";

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    debugger;
    const [login] = useLoginMutation();
    console.log(login)
    const sendRequest = async (e) => {
        e.preventDefault();
        debugger;
        await login({
            email,
            password
        })
        // const response = await fetch(LOGIN_URL, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
        // })
        // if (response.status === 200) {
        //     const payload = await response.json();
        //     console.log("Login başarılı");
        //     localStorage.setItem("token", payload.access);
        //     setError(null);
        // } else {
        //     console.log("Login başarısız");
        //     setError(response.statusText);
        // }
    }

    return (
        <>
            {
                error && (<Alert variant="danger">
                    {error}
                </Alert>)
            }

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
