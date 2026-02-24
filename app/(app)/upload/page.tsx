import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { UploadClient } from "./upload-client";

export default async function UploadPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  return <UploadClient />;
}
