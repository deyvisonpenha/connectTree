'use client'

import { ConnectTreeContext } from "@/context/connectTreeContext"
import { useContext } from "react"
import { Button } from "./ui/button";
import Link from "next/link";
import { EyeIcon } from 'lucide-react'

export default function PreviewButton(){
    const { connectTree } = useContext(ConnectTreeContext);

    return (<Button asChild variant={'outline'}>
    <Link href={`/${connectTree.username}`}>
      <EyeIcon /> Preview
    </Link>
  </Button>)
}