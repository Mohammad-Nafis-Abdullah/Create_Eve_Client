import React from "react";
import WriteAComment from "../../WriteAComment/WriteAComment";
import Loading from '../../../../Share/Loading/Loading'
import "./BlogComment.s.css";
import Comment from "./Comment";
import { useQueryFetch } from "../../../../Hooks/useQueryFetch";

const BlogComments = ({ blogId }) => {
  const { data: comments, loading, refetch } = useQueryFetch('comments', `https://create-eve-server.onrender.com/comment/${blogId}`);

  return (
    <section className="max-w-7xl mx-auto px-5  ">
      {
        comments?.length ?
          <h1 className="text-[36px] "
            data-aos="fade-right"

          >
            Blog <strong>Comments</strong>
          </h1> : ''
      }
      {
        loading && <Loading />
      }
      <div className="max-w-3xl">
        {[...comments]
          .reverse()
          .slice(0, 4)
          .map((comment) => (
            <Comment comment={comment}></Comment>
          ))}
      </div>
      <WriteAComment refetch={refetch} blogId={blogId}></WriteAComment>
    </section>
  );
};

export default BlogComments;
