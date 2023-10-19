import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/ChatHeader";

import { currentProfile } from "@/lib/current-profile";
import { ChannelIdPageProps } from "@/types/propsTypes";
import { db } from "@/lib/db";

const ChannelIDPage = async ({ params }: ChannelIdPageProps) => {
  const profile = await currentProfile();

  if (!profile) redirectToSignIn();

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile?.id,
    },
  });

  if (!channel || !member) redirect("/");

  return (
    <div className="bg-white dark:bg-[#313338] flex flex-col h-full">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />
    </div>
  );
};

export default ChannelIDPage;