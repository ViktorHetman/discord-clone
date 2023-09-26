import { NextResponse } from "next/server";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";

export const DELETE = async (
  req: Request,
  { params }: { params: { channelId: string } }
) => {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);

    const serverId = searchParams.get("serverId");

    if (!profile) new NextResponse("Unauthorized", { status: 401 });

    if (!serverId) new NextResponse("Missing Server ID", { status: 400 });

    if (!params.channelId)
      new NextResponse("Missing Channel Id", { status: 400 });

    const server = await db.server.update({
      where: {
        id: serverId!,
        members: {
          some: {
            profileId: profile?.id,
            role: {
              in: [MemberRole.MODERATOR, MemberRole.ADMIN],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
