import { Outlet } from "react-router-dom";
import 'flowbite/dist/flowbite.css';



import Header from "./component/Header";
import Sidebar from "./component/Sidebar";

export default function App() {
  return (
    <body className="max-w-screen-2xl mx-auto ">
      <Header />
      <div className="flex flex-row">
        <Sidebar />
        <Outlet/>
      </div>
    </body>
  );
}
