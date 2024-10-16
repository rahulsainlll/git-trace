import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserImage({ image, name }: any) {
  return (
    <div className="relative h-10 w-10 rounded-full">
      <Avatar className="h-10 w-10 rounded-full mt-1">
        <AvatarImage src={image} alt="" />
        <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
    </div>
  );
}
