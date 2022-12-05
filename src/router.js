import { useRoutes } from "react-router-dom"
import AddJobForm from "./components/AddJobForm";
import Header from "./components/Header";
import JobPostAsCategory from "./components/JobPostAsCategory";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import PrivateRoute from "./PrivateRoute";

const Router = () => useRoutes([
    {
        path: '/',
        element: <Header />,
        children: [
            {
                path: 'add_new_job_post',
                element: <PrivateRoute><AddJobForm /></PrivateRoute>,
            },
            {
                path: 'all_job_post',
                element: <PrivateRoute><JobPostAsCategory /></PrivateRoute>
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'sign_up',
                element: <SignUp />
            },
        ]
    }
])
export default Router;