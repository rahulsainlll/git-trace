import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <div className="container w-full max-w-screen-xl mx-auto py-10 px-2.5 lg:px-20">
      <h1 className="font-medium text-3xl text-gray-900 mb-2">
        Find repository
      </h1>
      <p className="text-base italic max-w-prose text-muted-foreground mb-4">
        Required fields are marked with an asterisk (*).
      </p>

      <div className="max-w-xl flex gap-4">
        <div>
          <p>Owner Name </p>
          <Input />
        </div>

        <div>
          <p>Repository Name *</p>
          <Input />
        </div>
      </div>
    </div>
  );
}
