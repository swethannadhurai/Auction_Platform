import { Outlet } from "react-router-dom";
import SellerSidebar from "../../components/SellerSidebar";

const SellerDashboard = () => {
  return (
    <div className="flex min-h-screen">
      <SellerSidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default SellerDashboard;




