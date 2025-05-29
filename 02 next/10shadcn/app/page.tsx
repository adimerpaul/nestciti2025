"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@radix-ui/react-progress";
import { MailOpen } from "lucide-react";
import Image from "next/image";
import * as React from "react"

export default function Home() {
    const [progress, setProgress] = React.useState(13)
 
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])
  return (
    <>
    <Button variant="destructive" onClick={() => alert("Button clicked!")}>
      Click Me
    </Button>
    <Button>
      <MailOpen /> Login with Email
    </Button>
    <div>
      aa
      <Progress value={progress} className="w-[60%]" />
    </div>
  
    </>
  );
}
