import React from "react";
import { StoreSwitcher } from "@/components/StoreSwitcher";
import { MainNav } from "@/components/MainNav";
import ThemeToggle from "./ThemeToggle";
import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();
  if (!userId) redirect("/sign-in");
  const stores = await prismadb.store.findMany({
    where:{
      userId,
    }
  })
  return (
    <div className="p-2 m-2 border-b flex">
      <div className="px-4 items-center flex">
        <StoreSwitcher items={stores} />
        <MainNav />
      </div>
      <div className="ml-auto flex space-x-4 items-center">
        <ThemeToggle />
        <UserButton />
      </div>
    </div>
  );
};
export default Navbar;
