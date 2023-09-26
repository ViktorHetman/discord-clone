"use client";

import { useParams, useRouter } from "next/navigation";
import { Edit, Hash, Lock, Trash, Video, Volume2 } from "lucide-react";
import { ChannelType, MemberRole } from "@prisma/client";

import ActionTooltip from "@/components/ActionTooltip";

import { ServerChannelProps } from "@/types/propsTypes";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModalStore";

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Volume2,
  [ChannelType.VIDEO]: Video,
};

const ServerChannel = ({ channel, server, role }: ServerChannelProps) => {
  const params = useParams();
  const router = useRouter();
  const { onOpen } = useModal();

  const Icon = iconMap[channel.type];

  return (
    <button
      onClick={() => {}}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId == channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p
        className={cn(
          "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === channel.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash
              onClick={() => onOpen("deleteServer", { server, channel })}
              className="hidden group-hover:block w-4 h-4 text-rose-500 hover:text-rose-600 transition"
            />
          </ActionTooltip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400" />
      )}
    </button>
  );
};

export default ServerChannel;
