"use client";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Faq: React.FC = () => {


  return (
    <div className="faq-container" style={{ maxWidth: '1000px', margin: 'auto', marginTop: '2rem' }}>
      <strong><h1>Frequently Asked Questions</h1></strong>
      <br />
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Git-trace?</AccordionTrigger>
          <AccordionContent>
            Git-trace is an open-source tool that allows users to view and bookmark GitHub repositories and issues, making it easier to keep track of projects.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>What features does Git-trace offer?</AccordionTrigger>
          <AccordionContent>
            Git-trace allows you to search for repositories, view issues related to those repositories, and bookmark important repositories and issues for quick access.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>What technology stack is used for Git-trace?</AccordionTrigger>
          <AccordionContent>
            Git-trace uses Next.js and React for the frontend,while the backend utilizes GitHub&#39;s API for data retrieval, along with Prisma and Neon DB for data management.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>How do I search for repositories on Git-trace?</AccordionTrigger>
          <AccordionContent>
            You can search for repositories by entering the owner&#39;s name and the repository&#39;s name in the search bar.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>How can I bookmark repositories and issues?</AccordionTrigger>
          <AccordionContent>
            After viewing a repository or issue, you can use the bookmarking feature to save it for easy access later.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>What should I do if I encounter issues while using Git-trace?</AccordionTrigger>
          <AccordionContent>
            You can report any issues on the GitHub repository, where maintainers and the community can assist you.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-7">
          <AccordionTrigger>Can I use Git-trace without installing it locally?</AccordionTrigger>
          <AccordionContent>
            Yes, you can access Git-trace directly through the web at git-trace.vercel.com.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
