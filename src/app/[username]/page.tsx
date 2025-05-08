import { getConnectTreeByUsername } from "@/actions";
import PreviewConnectTree from "@/components/previewConnectTree";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  try {
    const connectTree = await getConnectTreeByUsername(username);

    return <PreviewConnectTree connectTree={connectTree} />;
  } catch (error) {
    notFound();
  }
}
