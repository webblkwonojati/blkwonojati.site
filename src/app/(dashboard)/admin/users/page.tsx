import { checkRole } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUsers } from "./actions";
import UserManagementClient from "./UserManagementClient";

export const dynamic = "force-dynamic";

export default async function UserManagementPage() {
  const role = await checkRole();
  
  if (role !== "super_admin") {
    redirect("/admin");
  }

  const users = await getUsers();

  return <UserManagementClient initialUsers={users} />;
}
