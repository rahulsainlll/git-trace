import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark } from "lucide-react";
import axios from "axios";
import SubmitButton from "@/components/submit-btn";

const NewBookmarkBtn = ({
  name,
  url,
  description,
}: {
  name: string;
  url: string;
  description?: string;
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleBookmarkSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    try {
      await axios.post("/api/bookmarks", {
        name: formData.get("name"),
        url: formData.get("url"),
        description: formData.get("description"),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Failed to create bookmark:", error);
      setError("There was an issue creating the bookmark. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    router.push("/dashboard");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full">
          <Bookmark className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogHeader>
          <DialogTitle>New Bookmark</DialogTitle>
          <DialogDescription>
            Create a new bookmark to get started
          </DialogDescription>
        </DialogHeader>
        <form className="flex gap-4 flex-col" onSubmit={handleBookmarkSubmit}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Project Name"
                defaultValue={name}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com"
                defaultValue={url}
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Description (optional)"
              defaultValue={description}
            />
          </div>
          <SubmitButton loading={loading} />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewBookmarkBtn;
