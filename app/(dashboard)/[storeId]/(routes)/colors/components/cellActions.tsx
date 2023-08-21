"use client";
import axios from "axios";
import { useState } from "react";


import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { ColorsColumn } from "./colums";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alertModal";

interface CellActionProps {
  data: ColorsColumn;
}
 
export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Color id added to clipboard");
  };
  const forwardEditColor = (id: string) => {
    router.push(`/${params.storeId}/colors/${id}`);
  };
  const [loading, setLoading] = useState(false);
  const [Open, setOpen] = useState(false);

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/colors/${id}`
      );
      router.refresh();
      toast.success("Color Successfully Deleted!");
    } catch (error) {
      toast.error("Make sure you've removed every product inside the Color");
      console.log(error)
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal isOpen={Open} onClose={() => setOpen(false)} onConfirm={() => onDelete(data.id)} loading={loading}/>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="focused-within:ring-offset-0">
            <span className="sr-only">Actions Menu</span>
            <MoreHorizontal className="h-4 w-4 " />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => forwardEditColor(data.id)}>
            <Edit className="w-4 h-4 mr-1" /> Edit Color
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="w-4 h-4 mr-1" /> Copy Url
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="bg-red-500 focus:bg-red-600/95 text-white focus:text-slate-100" onClick={() => setOpen(true)}>
            <Trash className="w-4 h-4 mr-1 " /> Delete Color
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
