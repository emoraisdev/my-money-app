import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../common/layout/layout";

export default () => {

    const token = useSelector(state => state.auth.token);

    if (!token) return <Navigate to="/login" replace />;

    return (
        <Layout>
            <Outlet />
        </Layout>
    );
}