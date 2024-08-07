import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssuesPage = () => {
  return (
    <div>
      <Link href="/issues/new">
        <Button size="3">
          New Issue
        </Button>
      </Link>
    </div>
  );
};

export default IssuesPage;
