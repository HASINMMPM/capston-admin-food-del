import { Table } from "flowbite-react";
import React, { useContext } from "react";
import AdminGlobal, { AdminContext } from "./Global/AdminGlobal";

const AllAdmin = () => {
  const { admin, deleteAdmin } = useContext(AdminContext);
  // console.log(admin)

  return (
    <div className="w-full py-4 lg:py-14 px-0 lg:px-8">
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Restaurent</Table.HeadCell>
            <Table.HeadCell>Remove</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {admin.map((admin, index) => (
              <Table.Row key={index}>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white uppercase">
                  {admin.fullName}
                </Table.Cell>
                <Table.Cell>{admin.phoneNumber}</Table.Cell>
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
    </div>
  );
};

export default function App() {
  return (
    <AdminGlobal>
      <AllAdmin />
    </AdminGlobal>
  );
}
