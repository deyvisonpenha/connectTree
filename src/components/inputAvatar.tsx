"use client";
import { useContext, useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ConnectTreeContext } from "@/context/connectTreeContext";
import { updateAvatar } from "@/actions";

export default function InputAvatar() {
  const { connectTree } = useContext(ConnectTreeContext);
  const [imageUrl, setImageUrl] = useState("");
  const [isHovering, setIsHovering] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    setImageUrl(connectTree?.avatar || "");
  }, [connectTree]);

  const handleAvatarClick = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    fileInputRef.current.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const base64Image = e.target.result.toString();
          setImageUrl(base64Image);
          await updateAvatar(base64Image, connectTree.id);
        }
      };
      reader.readAsDataURL(file);
    }

    // if (file) {
    //   // Create a URL for the selected image file
    //   const newImageUrl = URL.createObjectURL(file);
    //   setImageUrl(newImageUrl);

    //   await updateAvatar(newImageUrl, connectTree.id);
    // }
  };

  return (
    <div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={handleAvatarClick}
    >
      <Avatar
        className={cn("h-28 w-28", isHovering ? "opacity-40" : "opacity-100")}
      >
        <AvatarImage src={imageUrl} alt="@shadcn" />
        <AvatarFallback />
      </Avatar>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Hover overlay with "Update" label */}
      <div
        className={cn(
          "absolute inset-0  rounded-full flex items-center justify-center h-28 w-28 text-black font-bold transition-opacity duration-200",
          isHovering ? "opacity-100" : "opacity-0"
        )}
      >
        Update
      </div>
    </div>
  );
}
