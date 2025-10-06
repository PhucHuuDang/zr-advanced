import React from "react";
import { UserTable } from "../_components/users/user-table";

const UserManagementPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <UserTable />
    </div>
  );
};

export default UserManagementPage;
