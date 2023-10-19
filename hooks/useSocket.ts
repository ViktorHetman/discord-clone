import { SocketContext } from "@/components/providers/socket-provider";
import React from "react";

export const useSocket = () => {
  return React.useContext(SocketContext);
};
