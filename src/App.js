import logo from './logo.svg';
import './assests/css/App.css';
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {notificationActions} from "./store/notification/notification-slice";

function App() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(notificationActions.showMessage({
            header: "Meydey meydey",
            message: "Please confirm Recaptcha",
            variant: "danger",
            vertical: "middle",
            horizontal: "end"
        }));
    }, [dispatch]);

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
