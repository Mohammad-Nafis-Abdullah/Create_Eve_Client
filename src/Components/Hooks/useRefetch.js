/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";

const useRefetch = (url, initialValue = [], callback = () => 0) => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(initialValue);
  const [refetcher, setRefetch] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(url,{
      headers:{
        contentType: 'application/json',
        uid: `${user?.uid}`,
      }
    })
    .then(({ data }) => {
      setData(data);
      callback(data);
      setLoading(false);
    });
  }, [refetcher, url]);

  return {
    data,
    loading,
    refetch: () => {
      setLoading(true);
      setRefetch((previous) => !previous);
    },
  };
};

export default useRefetch;
