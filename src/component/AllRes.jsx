import React, { useContext } from "react";
import { Table } from "flowbite-react";


import { Context } from "./Global/ContextList";
import { ImCross } from "react-icons/im";

const AllRes = () => {
  const { res, deleteRes, topRes, isAdmin } = useContext(Context);

  // console.log(res)
  if (!isAdmin) {
    return (
      <div className="w-full text-red-700  flex flex-col gap-4 justify-center items-center">
        <ImCross className="h-1/2 w-1/2 opacity-30 " />
        <h2 className="text-2xl  font-bold ">
          You can't see all Restaurant page
        </h2>
      </div>
    );
  } else {
    return (
      <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
        <div className="overflow-x-auto">
          <Table>
            <Table.Head>
              <Table.HeadCell>Image</Table.HeadCell>
              <Table.HeadCell>Name</Table.HeadCell>
              <Table.HeadCell>Place</Table.HeadCell>
              <Table.HeadCell>Top restaurent</Table.HeadCell>
              <Table.HeadCell>Owner</Table.HeadCell>
              <Table.HeadCell>Remove</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {res.map((res, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <img
                      src={res.Image}
                      alt="restaurent image"
                      className="h-24 object-contain "
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                    {res.Title}
                  </Table.Cell>
                  <Table.Cell>{res.Place}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => topRes(res._id)}
                      className={
                        res.BestRestaurant === true
                          ? "bg-slate-600 p-2 rounded-lg text-white"
                          : "bg-green-500 p-2 rounded-lg text-white"
                      }
                    >
                      {res.BestRestaurant === true
                        ? "Unmark as Top"
                        : "Mark as Top"}
                    </button>
                  </Table.Cell>
                  <Table.Cell>{res.Owner}</Table.Cell>
                  <Table.Cell>
                    <button
                      onClick={() => deleteRes(res._id)}
                      className="bg-red-700 p-2 rounded-lg text-white "
                    >
                      Remove
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

export default AllRes;
