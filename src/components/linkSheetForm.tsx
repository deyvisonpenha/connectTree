"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { Link } from "@/generated/prisma";
import { Suspense, useContext, useState, useTransition } from "react";
import { submitConnectTree } from "@/actions";
import { ConnectTreeContext } from "@/context/connectTreeContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

type LinkFormData = {
  id: string;
  title: string;
  url: string;
  thumbnail: string | null;
};

export default function LinkSheetForm({
  children,
  link,
}: {
  children: React.ReactNode;
  link?: Link;
}) {
  const { connectTree, setConnectTree } = useContext(ConnectTreeContext);
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const form = useForm<LinkFormData>({
    defaultValues: link,
  });

  function submit(data: LinkFormData) {
    const linkId = link?.id || "";
    startTransition(async () => {
      const updatedConnectTree = await submitConnectTree({
        connectTreeId: connectTree.id,
        data,
        linkId,
      });

      setConnectTree(updatedConnectTree);
      setOpen(false);
      toast(link ? "Link successfully edited." : "Link successfully created.")
      form.reset();
    });
  }

  function handleImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          form.setValue("thumbnail", e.target.result.toString());
        }
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{link ? "Edit link" : "New Link"}</SheetTitle>
          <SheetDescription>
            {link ? "Make changes to your " : "Create your new "} link here.
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-2 py-4 px-2">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              className="col-span-3"
              {...form.register("title", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input
              className="col-span-3"
              {...form.register("url", { required: true })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="thumbnail" className="text-right">
              Thumbnail
            </Label>
            <Input
              accept="image/*"
              type="file"
              onChange={handleImage}
              className="col-span-3"
            />
          </div>
        </div>
        <SheetFooter>
          <Suspense
            fallback={
              <Button>
                <Loader2 className="animate-spin" />
              </Button>
            }
          >
            <Button disabled={isPending} onClick={form.handleSubmit(submit)}>
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                `${link ? "Save changes" : "Create"}`
              )}
            </Button>
          </Suspense>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
