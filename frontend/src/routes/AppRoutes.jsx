import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import SignIn from "../components/register/SignIn";
import SignUp from "../components/register/SignUp";

export default function AppRoutes () {
    return(
        <Routes>
            {/*<Route path="/" element={<ProtectedRoutes />}>*/}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
            {/*</Route>*/}

            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />

        </Routes>
    );
}
