import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";


const useAdmin = () => {
    const [user] = useAuthState(auth);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            axios
                .get(`https://create-eve-server.onrender.com/admin/${user?.uid}`)
                .then(({ data }) => {
                    setAdmin(data.admin);
                    setLoading(false);
                });
        }
        else {
            setLoading(false);
        }
        return;
    }, [user]);

    return [admin, loading];
};

export default useAdmin;