"use client";

import { Stream, User } from "@prisma/client";

import { useViewerToken } from "@/hooks/use-viewer-token";

interface StreamPlayerProps {
  stream: Stream;
  isFollowing: boolean;
  user: User & { stream: Stream | null };
}

const StreamPlayer = (props: StreamPlayerProps) => {
  const { user, stream, isFollowing } = props;
  const { token, name, identity } = useViewerToken(user.id);
  
  if(!token || !name || !identity) {
    return (
      <>
      <div>Cannot watch the stream</div>
      </>
    )
  }

  return (
    <div>Allowed to watch the stream</div> 
  );
};

export default StreamPlayer;
