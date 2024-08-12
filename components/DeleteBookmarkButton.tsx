"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader } from "lucide-react";

interface DeleteBookmarkButtonProps {
  bookmarkId: string;
}

export default function DeleteBookmarkButton({
  bookmarkId,
}: DeleteBookmarkButtonProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await axios.delete(`/api/bookmarks/${bookmarkId}`);
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete bookmark:", error);
      // Optionally, show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)} disabled={loading}>
            {loading ? <Loader className="animate-spin w-4 h-4" /> : "Delete"}
          </Button>
        </DialogTrigger>
        <DialogContent className="dialog-content">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this bookmark? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4">
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin w-4 h-4" />
              ) : (
                "Confirm"
              )}
            </Button>
            <Button
              onClick={() => setOpen(false)}
              variant="outline"
              disabled={loading}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
