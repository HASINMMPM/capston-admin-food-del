import React, { useContext } from "react";
import { Table } from "flowbite-react";
import { Context } from "./Global/ContextList";

const VerifyRes = () => {
  const { verifyres, conformRes } = useContext(Context);
  console.log(verifyres);
  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Place</Table.HeadCell>
            <Table.HeadCell>Owner</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {verifyres.map((verifyres, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <img
                    src={verifyres.Image}
                    alt="verify restaurent image"
                    className="h-24 object-contain "
                  />
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                  {verifyres.Title}
                </Table.Cell>
                <Table.Cell>{verifyres.Place}</Table.Cell>
                <Table.Cell>{verifyres.Owner}</Table.Cell>
                <Table.Cell>
                  <button
                    className="bg-primary p-2 rounded-lg text-white "
                    onClick={() => conformRes(verifyres._id)}
                  >
                    Confirm
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default VerifyRes;
