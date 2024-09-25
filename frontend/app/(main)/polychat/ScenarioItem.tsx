"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type ScenarioItemProps = {
  label: string;
  href: string;
};

export const ScenarioItem = ({ label, href }: ScenarioItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={"sidebarOutline"}
      className="h-[52px] justify-start w-full"
      asChild
    >
      <Link href={href} className="w-full">
        <span className="text-lg font-bold">{label}</span>
      </Link>
    </Button>
  );
};
