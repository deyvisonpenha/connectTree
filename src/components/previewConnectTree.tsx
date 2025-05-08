"use client"

import { updateClickEvent } from "@/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { ConnectTreeWithLinks } from "@/context/connectTreeContext";
import { ensureAbsoluteUrl } from "@/lib/utils";
import Link from "next/link";

type Props = {
    connectTree: ConnectTreeWithLinks
}

export default function PreviewConnectTree({connectTree}: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container mx-auto px-4 py-8 max-w-2xl">
            <div className="flex flex-col items-center space-y-4 mb-8">
              <Avatar className="w-24 h-24">
                <AvatarImage src={connectTree?.avatar || ""} />
                <AvatarFallback>
                  {connectTree.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h1 className="text-2xl font-bold">
                {connectTree.title || connectTree.username}
              </h1>
              {connectTree.bio && (
                <p className="text-gray-600 dark:text-gray-300 text-center max-w-md">
                  {connectTree.bio}
                </p>
              )}
            </div>
  
            <div className="space-y-4">
              {connectTree.links.map((link) => (
                <Link
                  onClick={()=> updateClickEvent(link.id)}
                  key={link.id}
                  href={ensureAbsoluteUrl(link.url)}
                  target="_blank"
                >
                  <Card className="p-4 hover:scale-[1.02] transition-transform cursor-pointer">
                    <div className="flex items-center gap-4">
                      {link.thumbnail && (
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={link.thumbnail} />
                          <AvatarFallback>
                            {link.title.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h3 className="font-semibold">{link.title}</h3>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      );
}