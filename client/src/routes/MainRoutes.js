import { Route, Routes } from "react-router-dom";
import AdminPages from "../pages/admin/AdminPages";
import GlobalLayout from "../components/layout/GlobalLayout";

const MainRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<GlobalLayout />}>

                {/* <Route path="user/*" element={<h1>Library Management System</h1>}>
                    <Route path="dashboard" element={<h1>user routes</h1>} />
                </Route> */}

                <Route path="admin/*" element={<AdminPages />} />

            </Route>
        </Routes>
    )
};

export default MainRoutes;