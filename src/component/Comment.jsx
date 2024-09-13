import React, { useContext, useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { Context } from "./Global/ContextList";
import { ImCross } from "react-icons/im";
import axios from "axios"; // Ensure axios is imported

const Comments = () => {
  const [comments, setComments] = useState([]); // Array of comments
  const { isAdmin, URL } = useContext(Context);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${URL}/get/comment`);
        const data = await response.json();
        console.log(data);
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [URL]);

  const bestComment = async (id) => {
      const newURL = `${URL}/best/comment/${id}`
      console.log(newURL)
    try {
      const response = await axios.put(`${URL}/best/comment/${id}`);
      console.log("Response from server:", response.data);

      // Update the comment list to reflect the change
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment._id === id ? { ...comment, isShow: !comment.isShow } : comment
        )
      );
    } catch (error) {
      console.error("Error marking comment as best:", error);
      console.log(error.response.data)
    }
  };

  if (!isAdmin) {
    return (
      <div className="w-full text-red-700 flex flex-col gap-4 justify-center items-center">
        <ImCross className="h-1/2 w-1/2 opacity-30" />
        <h2 className="text-2xl font-bold">
          You can't see the comments page
        </h2>
      </div>
    );
  } else {
    return (
      <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Comment</Table.HeadCell>
              <Table.HeadCell className="w-[20%]">Is Show</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {comments.map((comment, index) => (
                <Table.Row key={index}>
                  <Table.Cell>{comment.comment}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => bestComment(comment._id)}
                      className={
                        comment.isShow
                          ? "bg-slate-600 p-2 rounded-lg text-white"
                          : "bg-green-500 p-2 rounded-lg text-white"
                      }
                    >
                      {comment.isShow ? "Unmark as Top" : "Mark as Top"}
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
};

export default Comments;
