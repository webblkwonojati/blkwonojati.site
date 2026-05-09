import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linktree | UPT BLK Wonojati",
  description: "Daftar tautan resmi UPT BLK Wonojati Malang.",
};

export default function LinktreeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {children}
    </div>
  );
}
