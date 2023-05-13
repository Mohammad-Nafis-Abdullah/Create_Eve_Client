import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";


const useAdmin = () => {
    const [user] = useAuthState(auth);
    const [admin, setAdmin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (user) {
            const fn = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:5000/admin/${user?.uid}`);
                    setAdmin(data.admin);
                    setLoading(false);

                } catch (err) {
                    console.log(err);
                }
            }
            fn();
        }
        else {
            setLoading(false);
        }
        return;
    }, [user]);

    return [admin, loading];
};

export default useAdmin;