import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/organisms/Header";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;