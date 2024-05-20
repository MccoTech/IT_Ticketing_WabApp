import ToggleMode from "@/components/ToggleMode";
import prisma from "@/prisma/db";
import Link from "next/link";
import React from "react";

const MainNav = () => {
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-10">
        <Link href="/">Dashboard</Link>
        <Link href="/tickets">Tickets</Link>
        <Link href="/users">Users</Link>
      </div>
      <div className="flex items-center gap-10">
        <Link href="/">Logout</Link>
        <ToggleMode />
      </div>
    </div>
  );
};
export default MainNav;
export const Tickets = async () => {
  const tickets = await prisma.ticket.findMany();
  console.log(tickets);
  return <div>Tickets</div>;
};
