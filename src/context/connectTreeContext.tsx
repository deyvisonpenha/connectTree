"use client"
import { createContext, Dispatch, SetStateAction, useState } from "react";
import { ConnectTree, Link } from "@/generated/prisma";

export type ConnectTreeWithLinks = ConnectTree & {
  links: Link[];
};

type ConnectTreeContextType = {
  connectTree: ConnectTreeWithLinks;
  setConnectTree: Dispatch<SetStateAction<ConnectTreeWithLinks>>;
};

export const ConnectTreeContext = createContext<ConnectTreeContextType>({
  connectTree: {} as ConnectTreeWithLinks,
  setConnectTree: () => {},
});

export const ContextProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [connectTree, setConnectTree] = useState({} as ConnectTreeWithLinks);

  return (
    <ConnectTreeContext.Provider value={{connectTree, setConnectTree}}>
      {children}
    </ConnectTreeContext.Provider>
  );
};
