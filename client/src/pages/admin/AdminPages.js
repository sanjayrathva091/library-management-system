import { Outlet, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import BookList from "../../components/BookList";

function AdminPages() {
    return (
        <Routes>
            <Route path="" element={<Outlet />}>
                <Route index path="dashboard" element={<Dashboard />} />
                <Route path="books" element={<BookList />} />
            </Route>
        </Routes>
    )
};

export default AdminPages;