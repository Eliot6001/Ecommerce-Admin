"use client"
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeId}`,
      label: "Overview",
      active: pathname === `/${params.storeId}`,
    },
    {
      href: `/${params.storeId}/billboards`,
      label: "Billboards",
      active: pathname === `/${params.storeId}/billboards`,
    },
    {
      href: `/${params.storeId}/settings`,
      label: "Settings",
      active: pathname === `/${params.storeId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6 mx-3", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={
            (cn("text-sm font-medium transition-colors hover:text-primary"),
            route.active ? "text-black dark:text-white" : "text-gray-500 dark:text-slate-300")
          }
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
