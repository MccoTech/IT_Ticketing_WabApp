import { Priority } from "@prisma/client";
import { Flame } from "lucide-react";
import React from "react";

interface Props {
  priority: Priority;
}

const priorityMap: Record<Priority, { label: string; level: 1 | 2 | 3 }> = {
  HIGH: { label: "High", level: 3 },
  MEDIUM: { label: "MEDIUM", level: 2 },
  LOW: { label: "LOW", level: 1 },
};
const TicketPriority = () => {
  return (
    <>
      <Flame
        className={`${
          priorityMap.level >= 1 ? "text-red-500" : "text-red-400"
        }`}
      />
      <Flame
        className={`${
          priorityMap.level >= 2 ? "text-red-500" : "text-red-400"
        }`}
      />
      <Flame
        className={`${
          priorityMap.level >= 3 ? "text-red-500" : "text-red-400"
        }`}
      />
    </>
  );
};
export default TicketPriority;
