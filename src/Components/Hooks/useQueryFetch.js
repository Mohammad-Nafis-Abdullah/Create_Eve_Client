import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react";
import { queryClient } from "../../index";

export const useQueryFetch = (key,url)=> {
    const [fetchUrl, setFetchUrl] = useState(url);
    const { isLoading, data, isFetching } = useQuery({
        queryKey:[key],
        queryFn:() =>axios
            .get(fetchUrl)
            .then((res) => res.data),
        
    });

    const refetch = (newUrl = url)=> {
        setFetchUrl(newUrl);
        queryClient.invalidateQueries({ queryKey: [key] })
    };


    return { data, loading: isLoading || isFetching, refetch };
}