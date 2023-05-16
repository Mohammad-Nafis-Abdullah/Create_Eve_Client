import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../Firebase/firebase.init";
import Loading from "../../Share/Loading/Loading";
import { useContext } from "react";
import { StateContext } from "../../../App";


const RequireAdmin = ({ children }) => {
    const [state] = useContext(StateContext);
    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    if (loading) {
        return <Loading />;
    }
    if (!user) {
        return <Navigate to="/authentication" state={{ from: location }} replace />;
    }
    if (state.admin) {
        return children;
    }
};

export default RequireAdmin;