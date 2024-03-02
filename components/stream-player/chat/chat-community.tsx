import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useParticipants } from "@livekit/components-react";
import React, { useMemo, useState } from "react";
import { useDebounce } from "usehooks-ts";
import CommunityItem from "./community-item";
import {
  LocalParticipant,
  Participant,
  RemoteParticipant,
} from "livekit-client";

interface ChatCommunityProps {
  hostName: string;
  viewerName: string;
  isHidden: boolean;
}

const ChatCommunity = (props: ChatCommunityProps) => {
  const { hostName, viewerName, isHidden } = props;

  // ** State
  const [value, setValue] = useState("");

  // ** Hooks
  const participants = useParticipants();

  const debouncedValue = useDebounce<string>(value, 500);

  const onChange = (newValue: string) => {
    setValue(newValue);
  };

  const filteredParticipants = useMemo(() => {
    const deduped = participants.reduce((acc, participant) => {
      const hostAsViewer = `host-${participant.identity}`;
      if (!acc.some((p) => p.identity === hostAsViewer)) {
        acc.push(participant);
      }
      return acc;
    }, [] as (RemoteParticipant | LocalParticipant)[]);
    return deduped.filter((participant) => {
      return participant.name
        ?.toLowerCase()
        .includes(debouncedValue.toLocaleLowerCase());
    });
  }, [participants, debouncedValue]);

  if (isHidden) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="text-sm text-muted-foreground">Community is disabled</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <Input
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search Community"
        className="border-white/10"
      />
      <ScrollArea>
        <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
          No Results
        </p>
        {filteredParticipants.map((participant) => (
          <CommunityItem
            hostName={hostName}
            viewerName={viewerName}
            key={participant.identity}
            participantName={participant.name}
            participantIdentity={participant.identity}
          />
        ))}
      </ScrollArea>
    </div>
  );
};

export default ChatCommunity;
