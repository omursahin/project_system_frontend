import React from 'react';
import ReactDOM from 'react-dom/client';
import './assests/css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, ThemeProvider} from "react-bootstrap";
import {LoginPage} from "./pages/LoginPage";
import {Provider} from "react-redux";
import store from "./store";

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>
            <Alert variant="danger">
                This is a danger alert—check it out!
            </Alert>
        </div>,
    },
    {
        path: "/app",
        element: <App />
    },
    {
        path: "/login",
        element: <LoginPage/>
    }
]);

root.render(
  <React.StrictMode>
      <Provider store={store}>
              <ThemeProvider
                  breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
                  minBreakpoint="xxs"
              >
                 <RouterProvider router={router} />
              </ThemeProvider>
          </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
