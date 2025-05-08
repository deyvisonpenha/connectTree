import { getConnectTreeByUsername } from "@/actions";
import PreviewConnectTree from "@/components/previewConnectTree";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  try {
    const connectTree = await getConnectTreeByUsername(params.username);

    return <PreviewConnectTree connectTree={connectTree} />;
  } catch (error) {
    notFound();
  }
}
