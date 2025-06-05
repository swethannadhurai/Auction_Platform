import { Outlet } from "react-router-dom";
import SellerSidebar from "../../components/SellerSidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function SellerDashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios
      .get("/api/sellers/profile", { withCredentials: true })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, []);

  return (
    <div className="flex">
      <SellerSidebar profile={profile} />
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerDashboard;
