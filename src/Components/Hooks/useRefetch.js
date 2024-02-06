/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../Firebase/firebase.init";

const useRefetch = (url, initialValue = [], callback = () => 0) => {
  const [user] = useAuthState(auth);
  const [data, setData] = useState(initialValue);
  const [link,setLink] = useState(url);
  const [refetcher, setRefetch] = useState(true);
  const [loading, setLoading] = useState(false);
  let headers;

  useEffect(() => {
    if (!url) {
      return;
    };
    // console.log(user);
    if (user) {
      headers = {
        headers:{
          contentType: 'application/json',
          uid: `${user?.uid}`,
        }
      }
    }    
      setLoading(true);
      axios.get(link,headers)
      .then(({ data }) => {
        setData(data);
        callback(data);
        setLoading(false);
      });

  }, [refetcher, link, user]);

  return {
    data,
    loading,
    refetch: (URL) => {
      if (URL) {
        setLink(URL);
      }
      setLoading(true);
      setRefetch((previous) => !previous);
      return;
    },
  };
};

export default useRefetch;
