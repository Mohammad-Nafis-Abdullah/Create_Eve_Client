/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";
import { queryClient } from "../../index";

export const useQueryFetch = (key, url, initialValue = []) => {
    const [fetchUrl, setFetchUrl] = useState(url);

    const { isLoading, data, isFetching } = useQuery({
        queryKey: [key],
        queryFn: () => axios
            .get(fetchUrl,{withCredentials:true})
            .then((res) => res.data),
        initialData: initialValue,
    });

    const refetch = (newUrl = url) => {
        setFetchUrl(newUrl);
        queryClient.invalidateQueries({ queryKey: [key] })
    };


    return { data: data, loading: isLoading || isFetching, refetch };
}