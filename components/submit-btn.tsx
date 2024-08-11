"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const SubmitButton = ({ loading }: { loading: boolean }) => {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Create Bookmark"
      )}
    </Button>
  );
};

export default SubmitButton;
