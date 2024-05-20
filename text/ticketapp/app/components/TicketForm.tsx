"use client";
import React from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ticketSchema } from "@/ValidationSchemas/ticket";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";



 const TicketForm = () => {
  const form = useForm<TicketFormDate>({
    resolver: zodResolver(ticketSchema),
  });
  async function onsubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
  }

  async function onSubmit(values: z.infer<typeof ticketSchema>) {
    console.log(values);
  }
  return (

    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField control={form.control} name="title" render={({ field }) => (

            <FormItem>
              <FormLabel>Ticket Title</FormLabel>
              <FormControl>
                <Input placeholder="Titket Title..." {...field} />
              </FormControl>
            </FormItem>
          // <Controller name="description" control={form.control} name="description" render={({ field }) => (
          //   <FormItem>
          //     rtygreytr
          //   </FormItem>
          )} />
        </form>
       </Form>
      </div>);

};
export default TicketForm