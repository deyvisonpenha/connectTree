"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import InputAvatar from "./inputAvatar";
import { useContext, useEffect, useTransition } from "react";
import { ConnectTreeContext } from "@/context/connectTreeContext";
import { updateProfile } from "@/actions";
import { Loader2 } from "lucide-react";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "title must be at least 2 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
});

export default function ConnectTreeHeaderForm() {
  const { connectTree } = useContext(ConnectTreeContext);
  const [isPending, startTrasition] = useTransition();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (connectTree?.title && connectTree?.bio) {
      form.setValue("title", connectTree.title);
      form.setValue("bio", connectTree.bio);
    }
  }, [connectTree]);

  console.log(connectTree);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTrasition(async () => {
      updateProfile(data, connectTree.id).then(() => {
        toast("You submitted the following values:");
      });
    });
  }
  return (
    <div className="mt-12">
      <div className="flex gap-8">
        <InputAvatar />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-xl space-y-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Something interesting" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-1 w-full justify-end">
              <Button
                disabled={isPending}
                className="bg-indigo-600 hover:bg-indigo-700 w-[81px]"
                type="submit"
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
