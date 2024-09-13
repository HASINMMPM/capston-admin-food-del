import React, { useContext } from "react";
import { Context } from "./Global/ContextList";
import { Table } from "flowbite-react";
import { ImCross } from "react-icons/im";

const AllFood = () => {
  const { foods, removeFood, popularDish,isAdmin } = useContext(Context);
  console.log("foods",foods)
  if (!isAdmin) {
    return (
      <div className="w-full text-red-700  flex flex-col gap-4 justify-center items-center">
        <ImCross className="h-1/2 w-1/2 opacity-30 " />
        <h2 className="text-2xl  font-bold ">You can't see all Food page</h2>
      </div>
    );
  } else{
  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Restaurant</Table.HeadCell>
            <Table.HeadCell>popularDish</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {foods.map((foods, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <img
                    src={foods.image}
                    alt="verify restaurent image"
                    className="h-24 object-contain "
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                  {foods.title}
                </Table.Cell>
                <Table.Cell className="w-1/4 md:w-auto">
                  {foods.description}
                </Table.Cell>
                <Table.Cell>{foods.restaurant}</Table.Cell>
                <Table.Cell>
                  <button
                    className={
                      foods.isPopular === true
                        ? "bg-slate-500 p-2 rounded-lg text-white"
                        : "bg-primary p-2 rounded-lg text-white"
                    }
                    onClick={() => popularDish(foods._id)}
                  >
                    Popular
                  </button>
                </Table.Cell>

                <Table.Cell>
                  <button
                    className="bg-red-600 p-2 rounded-lg text-white "
                    onClick={() => removeFood(foods._id)}
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

export default AllFood;
