 import { Outlet } from 'react-router-dom';
import SellerSidebar from '../../components/SellerSidebar';
function SellerDashboard() {
  return (
    <div className="flex">
      <SellerSidebar />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerDashboard;



