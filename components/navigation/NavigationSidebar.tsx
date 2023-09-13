import { redirect } from "next/navigation";

import NavigationAction from "./NavigationAction";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

const NavigationSidebar = async () => {
  const profile = await currentProfile();

  if (!profile) redirect("/");

  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  return (
    <nav className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <NavigationAction />
    </nav>
  );
};

export default NavigationSidebar;
