import TicketPriority from "@/components/TicketPriority";
import TicketStatuBadge from "@/components/TicketStatuBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@prisma/client";
import React from "react";

interface props {
  tickets: Ticket[];
}

const DataTable = ({ tickets }: props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border ">
        <table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>description</TableHead>
              <TableHead>
                {" "}
                <div className="flex justify-center">Status</div>
              </TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Update At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets
              ? tickets.map((tickets) => (
                  <TableRow key={tickets.id} data-href="/">
                    <TableCell>{tickets.title}</TableCell>

                    <TableCell>{tickets.description}</TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <TicketStatuBadge status={tickets.status} />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center">
                        <TicketPriority priority={tickets.Priority} />
                      </div>
                    </TableCell>
                    <TableCell>
                      {tickets.createdAt.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>

                    <TableCell>
                      {tickets.updatedAt.toLocaleDateString("en-US", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </table>
      </div>
    </div>
  );
};
export default DataTable;
