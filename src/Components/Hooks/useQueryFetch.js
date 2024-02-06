/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react";
import { queryClient } from "../../index";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";

export const useQueryFetch = (key, url, initialValue = [], callBack = () => { }) => {
    const [currentUser] = useAuthState(auth);
    const [fetchUrl, setFetchUrl] = useState(url);
    // console.log(state);

    const { isLoading, data, isFetching } = useQuery({
        queryKey: [key],
        queryFn: () => axios
            .get(fetchUrl, {
                headers: {
                    uid: currentUser.uid,
                },
                withCredentials: true
            })
            .then((res) => res.data),
        initialData: initialValue,
    });

    useEffect(() => {
        callBack(data);
    }, [data]);

    const refetch = (newUrl = url) => {
        setFetchUrl(newUrl);
        queryClient.invalidateQueries({ queryKey: [key] });
    };


    return { data: data, loading: isLoading || isFetching, refetch };
}