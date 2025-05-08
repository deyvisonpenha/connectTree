"use client";
import { ConnectTreeContext } from "@/context/connectTreeContext";
import { useContext, useState, useTransition } from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartColumnIcon, Loader2, PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import LinkSheetForm from "./linkSheetForm";
import { deleteLink } from "@/actions";
import { toast } from "sonner";

export default function ConnectTreeList() {
  const { connectTree, setConnectTree } = useContext(ConnectTreeContext);
  const [isPending, startTransition] = useTransition();
  const [deletedItem, setDeletedItem] = useState("");

  function handleDelete(linkId: string) {
    setDeletedItem(linkId);
    startTransition(async () => {
      const updatedConnectTree = await deleteLink(linkId, connectTree.id);
      setConnectTree(updatedConnectTree);
      toast("Link successfully deleted.");
    });
  }

  return (
    <div className="mt-7 space-y-2">
      {connectTree?.links?.map((link) => (
        <Card key={link.id}>
          <CardHeader className="flex gap-3">
            {link?.thumbnail && (
              <Avatar>
                <AvatarImage src={link?.thumbnail || ""} alt="@shadcn" />
                <AvatarFallback />
              </Avatar>
            )}
            <div>
              <CardTitle>{link.title}</CardTitle>
              <CardDescription>{link.url}</CardDescription>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <div className="flex gap-1 text-sm">
              <ChartColumnIcon size={18} />
              {`${link.clicks} Clicks`}
            </div>
            <div className="flex gap-4">
              <LinkSheetForm link={link}>
                <Button variant="outline" size="icon">
                  <PencilIcon />
                </Button>
              </LinkSheetForm>

              <Button
                disabled={isPending}
                onClick={() => handleDelete(link.id)}
                variant="destructive"
                size="icon"
              >
                {isPending && deletedItem === link.id ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <TrashIcon />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
