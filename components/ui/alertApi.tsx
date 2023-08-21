"use client";

import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Description } from "@radix-ui/react-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface alertApiProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<alertApiProps["variant"], string> = {
  public: "public",
  admin: "admin",
};
const variantMap: Record<alertApiProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const AlertApi: React.FC<alertApiProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success("Api route copied to clipboard");
  };
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between mt-4">
        <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
          {description}
        </code>
        <Button variant={"outline"} size="icon" onClick={onCopy}>
          <Copy className="h-4 w-4"></Copy>
        </Button>
      </AlertDescription>
    </Alert>
  );
};
