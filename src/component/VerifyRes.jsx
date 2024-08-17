import React, { useContext } from "react";
import ResGlobal, { ResContext } from "./Global/ResGlobal";
import { Table } from "flowbite-react";

const VerifyRes = () => {
  const { verifyres,conformRes } = useContext(ResContext);
  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Image</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Place</Table.HeadCell>

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
                <Table.Cell>{verifyres.Place}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
export default function App() {
  return (
    <ResGlobal>
      <VerifyRes />
    </ResGlobal>
  );
}
