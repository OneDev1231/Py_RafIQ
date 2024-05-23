import type { NextPage } from "next";
import { AdminDashboardContainer } from "containers";
import { API } from "api";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const AdminDashboard: NextPage = () => {
  const [validAdmin, setValidAdmin] = useState(false);
  const router = useRouter();

  const getUserDetail = async () => {
    const { user_type } = await API.getUserDetail();
    if (user_type === "ADMIN") setValidAdmin(true);
    else router.push("/auth/login");
  };

  useEffect(() => {
    getUserDetail();
  }, []);
  return <>{validAdmin && <AdminDashboardContainer />}</>;
};

export default AdminDashboard;
