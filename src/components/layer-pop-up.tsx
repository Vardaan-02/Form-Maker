import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";

export function LayerPopUp({ layerId }: { layerId: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="absolute -right-5 -top-5 hover:bg-secondary transition-all p-2 rounded-full opacity-0 group-hover:opacity-100">
          <Settings className="h-6 w-6" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Layer</DialogTitle>
          <DialogDescription>
            Make changes to your Layer here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div></div>
        <DialogFooter>
          <DialogClose>
            <span className="px-4 py-3 bg-primary text-white rounded-md hover:bg-primary/90">
              Save changes
            </span>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
