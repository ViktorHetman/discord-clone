"use client";

import React from "react";

import CreateServerModal from "@/components/modals/CreateServerModal";
import InviteModal from "@/components/modals/InviteModal";
import EditServerModal from "@/components/modals/EditServerModal";
import ManageMembersModal from "@/components/modals/ManageMembersModal";
import CreateChannelModal from "@/components/modals/CreateChannelModal";
import LeaveServerModal from "@/components/modals/LeaveServerModal";
import DeleteServerModal from "@/components/modals/DeleteServerModal";
import DeleteChannelModal from "@/components/modals/DeleteChannelModal";
import EditChannelModal from "@/components/modals/EditChannelModal";
import MessageFileModal from "@/components/modals/MessageFileModal";
import DeleteMessageModal from "@/components/modals/DeleteMessageModal";

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
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
