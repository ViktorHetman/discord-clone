import {
  Channel,
  ChannelType,
  Member,
  MemberRole,
  Profile,
  Server,
} from "@prisma/client";

import { ServerWithMembersWithProfiles } from "./types";

export interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "messageFile" | "serverImage";
}

export interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

export interface NavigationItemProps {
  id: string;
  imageUrl: string;
  name: string;
}

export interface ServerSidebarProps {
  serverId: string;
}

export interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

export interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

export interface UserAvatarProps {
  src?: string;
  className?: string;
}

export interface ServerSearchProps {
  data: {
    label: string;
    type: "channel" | "member";
    data:
      | {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

export interface ServerSectionProps {
  label: string;
  role?: MemberRole;
  sectionType: "channels" | "members";
  channelType?: ChannelType;
  server?: ServerWithMembersWithProfiles;
}

export interface ServerChannelProps {
  channel: Channel;
  server: Server;
  role?: MemberRole;
}

export interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
}

export interface ServerIDPageProps {
  params: {
    serverId: string;
  };
}

export interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

export interface ChatHeaderProps {
  serverId: string;
  name: string;
  type: "channel" | "conversation";
  imageUrl?: string;
}

export interface MemberIdPageProps {
  params: {
    memberId: string;
    serverId: string;
  };
}

export interface ChatInputProps {
  apiUrl: string;
  query: Record<string, any>;
  name: string;
  type: "conversation" | "channel";
}

export interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export interface ChatMessagesProps {
  name: string;
  member: Member;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
  type: "channel" | "conversation";
}

export interface ChatWelcomeProps {
  type: "channel" | "conversation";
  name: string;
}

export interface ChatQueryProps {
  queryKey: string;
  apiUrl: string;
  paramKey: "channelId" | "conversationId";
  paramValue: string;
}

export interface ChatItemProps {
  id: string;
  content: string;
  member: Member & {
    profile: Profile;
  };
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentMember: Member;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
}
