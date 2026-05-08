import BeritaForm from "../BeritaForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function TulisBeritaPage() {
  const session = await auth();
  if (!session || (session.user as any).role !== "admin") {
    redirect("/login");
  }

  return <BeritaForm mode="add" />;
}
