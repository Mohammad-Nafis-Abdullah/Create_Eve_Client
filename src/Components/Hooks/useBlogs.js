/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  /* useEffect(() => {
    fetch("/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []); */
  return [blogs, setBlogs];
};

export default useBlogs;
