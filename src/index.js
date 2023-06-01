import React from 'react';
import ReactDOM from 'react-dom/client';
import './assests/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Spinner, ThemeProvider} from "react-bootstrap";
import {LoginPage} from "./pages/LoginPage";
import {Provider} from "react-redux";
import store from "./store";
import {ToastMessage} from "./components/general/Toast";
import {Loading} from "./components/general/Loading";
import {HomePage} from "./pages/HomePage";
import {Header} from "./components/general/Header";
import {SemestersPage} from "./pages/SemestersPage";
import {CoursesPage} from "./pages/CoursesPage";
import {SemesterCoursePage} from "./pages/SemesterCoursePage";
import {ReportPage} from "./pages/ReportPage";

const root = ReactDOM.createRoot(document.getElementById('root'));

const HeaderWrapper = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    )
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <HeaderWrapper/>,
        children: [
            {
                path: "/",
                element: <HomePage/>,
            },
            {
                path: "/login",
                element: <LoginPage/>
            },
            {
                path: "/semesters",
                element: <SemestersPage/>
            },
            {
                path: "/courses",
                element: <CoursesPage/>
            },
            {
                path: "/semester_courses",
                element: <SemesterCoursePage/>
            },
            {
                path: "/reports",
                element: <ReportPage/>
            },
        ]
    }]);

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider
                breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                minBreakpoint="xxs"
            >
                <Container>
                    <Loading/>
                    <ToastMessage/>
                    <RouterProvider router={router} fallbackElement={<Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>}/>
                </Container>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
