"use client";

import React from "react";

import CreateServerModal from "@/components/modals/CreateServerModal";
import InviteModal from "@/components/modals/InviteModal";
import EditServerModal from "@/components/modals/EditServerModal";
import ManageMembersModal from "@/components/modals/ManageMembersModal";
import CreateChannelModal from "@/components/modals/CreateChannelModal";
import LeaveChannelModal from "@/components/modals/LeaveChannelModal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <LeaveChannelModal />
    </>
  );
};
