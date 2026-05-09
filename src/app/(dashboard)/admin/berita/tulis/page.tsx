import BeritaForm from "../BeritaForm";
import { checkRole } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function TulisBeritaPage() {
  const role = await checkRole();
  
  if (!role) {
    redirect("/");
  }

  return <BeritaForm mode="add" />;
}
