import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}
const statusMap: Record<
  Status,
  { label: string; color: "bg-red-400" | "bg-blue-400" | "bg-green-400" }
> = {
    OPEN: {label: "Open", color: "bg-red-400"},
    STARTED: {label: "STARTED", color: "bg-blue-400"},
    CLOSED: {label: "CLOSED", color: "bg-green-400"},
};
const TicketStatuBadge = ({ status }: Props) => {
  return <Badge className={`${statusMap[status].color} text-hackground hover:${statusMap[status]}`}>
    {statusMap[status].label}
  </Badge>;
};

export default TicketStatuBadge;
