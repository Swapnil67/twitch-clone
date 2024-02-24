import { WifiOff } from "lucide-react";

import React from 'react'

interface OfflineVideoProps {
  username: string
}

const OfflineVideo = ({ username }: OfflineVideoProps) => {

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <WifiOff className="app-icon-xl text-muted-foreground" /> 
      <p className="text-muted-foreground" >
        {username} is offline
      </p>
    </div>
  )
}

export default OfflineVideo