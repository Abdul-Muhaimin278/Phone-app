import { Outlet } from "react-router-dom";
import StatusBar from "./StatusBar";
import TabBar from "./TabBar";

export const PhoneLayout = () => {
  return (
    <section className="d-flex flex-column m-auto parent-container">
      <StatusBar />
      <Outlet />
      <TabBar />
    </section>
  );
};
