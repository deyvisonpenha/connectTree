"use client";
import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import {
  createAccount,
  verifyUsernameAvailability,
  createConnectTree,
  updateOnboardingStatus,
} from "@/actions";
import {
  InputBase,
  InputBaseAdornment,
  InputBaseControl,
  InputBaseInput,
} from "@/components/ui/input-base";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export default function Onboarding() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      const username = values.username;

      const hasUsername = await verifyUsernameAvailability(username);

      if (hasUsername) {
        const messageError = "This ConnectTree username already taken";
        form.setError("username", {
          type: "manual",
          message: messageError,
        });
        return;
      }

      try {
        const { user } = await createAccount();
        await createConnectTree(username, user.id);
        const { onboardingComplete } = await updateOnboardingStatus();

        if(onboardingComplete){
            toast.success("Account created successfully!");
            router.push("/dashboard")
        }
        
      } catch (error) {
        toast.error(error as string);
        return;
      }
    });
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full flex flex-col px-12 mt-24"
        >
          <h1 className="text-5xl font-extrabold antialiased">
            Create your account
          </h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <InputBase className="w-1/2">
                    <InputBaseAdornment>connecttree/</InputBaseAdornment>
                    <InputBaseControl>
                      <InputBaseInput {...field} disabled={isPending} />
                    </InputBaseControl>
                  </InputBase>
                </FormControl>
                <FormDescription>
                  Choose your ConnectTree username. You can always change it
                  later.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-1/2" type="submit" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="animate-spin" />
                Please wait
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
