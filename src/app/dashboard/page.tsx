import ConnectTreeHeaderForm from "@/components/ConnectTreeHeaderForm";
import ConnectTreeList from "@/components/connectTreeList";
import LinkSheetForm from "@/components/linkSheetForm";
import PreviewButton from "@/components/previewButton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { PlusIcon } from "lucide-react";

export default async function Page() {
  return (
    <div className="m-4 w-full">
      <div className="flex w-full justify-between">
        <h1>My ConnectTree</h1>
        <div className="flex gap-4">
          <LinkSheetForm>
            <Button>
              <PlusIcon />
              Add Link
            </Button>
          </LinkSheetForm>
          <PreviewButton />
        </div>
      </div>

      <div className="flex flex-1 w-full justify-center">
        <ConnectTreeHeaderForm />
      </div>

      <Separator className="my-4" />

      <div>
        <ConnectTreeList />
      </div>
    </div>
  );
}
