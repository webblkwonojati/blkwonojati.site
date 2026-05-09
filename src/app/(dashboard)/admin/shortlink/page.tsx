import { getShortlinks } from "./actions";
import ShortlinkClient from "./ShortlinkClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shortlink Manager",
};

export const dynamic = "force-dynamic";

export default async function ShortlinkAdminPage() {
  const shortlinks = await getShortlinks();
  
  return <ShortlinkClient initialData={shortlinks} />;
}
