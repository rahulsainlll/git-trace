"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SubmitButton = ({
  loading,
  error,
}: {
  loading: boolean;
  error: string | null;
}) => {
  const router = useRouter();

  if (!loading && !error) {
    router.push("/user/dashboard");
  }

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
