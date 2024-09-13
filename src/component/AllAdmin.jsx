import { Table } from "flowbite-react";
import { FaUsersSlash } from "react-icons/fa6";
import React, { useContext } from "react";

import { Context } from "./Global/ContextList";
import { ImCross } from "react-icons/im";

const AllAdmin = () => {
  const { admin, deleteAdmin, isAdmin, token, setLoginPage } =
    useContext(Context);
  if (!token) {
    return (
      <div className="w-full  flex flex-col gap-4 justify-center items-center">
        <h2 className="text-2xl  text-black  font-bold ">
          You are not logged in{" "}
          <span
            className="text-primary cursor-pointer"
            onClick={() => setLoginPage(true)}
          >
            Click here to login
          </span>
        </h2>
      </div>
    );
  } else {
    if (!isAdmin) {
      return (
        <div className="w-full text-red-700  flex flex-col gap-4 justify-center items-center">
          <ImCross className="h-1/2 w-1/2 opacity-30 " />
          <h2 className="text-2xl  font-bold ">You can't see all Admin page</h2>
        </div>
      );
    } else {
      return (
        <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
          {admin.length === 0 ? (
            <div className="w-full flex text-primary opacity-25 justify-center items-center h-full">
              <FaUsersSlash className="text-2xl md:text-9xl text-center " />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Name</Table.HeadCell>
                  <Table.HeadCell>Contact</Table.HeadCell>
                  <Table.HeadCell>Restaurant</Table.HeadCell>
                  <Table.HeadCell>Remove</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {admin.map((admin, index) => (
                    <Table.Row key={index}>
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                        {admin.fullName}
                      </Table.Cell>
                      <Table.Cell>{admin.email}</Table.Cell>
                      <Table.Cell>{admin.restaurant}</Table.Cell>
                      <Table.Cell>
                        <button
                          onClick={() => deleteAdmin(admin._id)}
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
          )}
        </div>
      );
    }
  }
};

export default AllAdmin;
