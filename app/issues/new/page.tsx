import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewIssuePage = () => {
  return (
    <div className=" max-w-2xl space-y-3">
      <TextField.Root size="3" placeholder="Title" />
      <TextArea size="3" placeholder="Description" />
      <Button variant="soft" color="tomato" size="3">
        Submit New Issue
      </Button>
    </div>
  );
};

export default NewIssuePage;
