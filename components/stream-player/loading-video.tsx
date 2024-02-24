import { Loader } from "lucide-react";

import React from "react";

interface LoadingVideoProps {
  label: string;
}

const LoadingVideo = ({ label }: LoadingVideoProps) => {
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <Loader className="app-icon-xl text-muted-foreground animate-spin" />
      <p className="text-muted-foreground capitalize">{label}</p>
    </div>
  );
};

export default LoadingVideo;
