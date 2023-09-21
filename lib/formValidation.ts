import * as zod from "zod";
import { ChannelType } from "@prisma/client";

export const formValidation = zod.object({
  name: zod.string().min(1, { message: "Server name is required." }),
  imageUrl: zod.string().min(1, { message: "Server image is required" }),
});

export const validationForCreateChannelForm = zod.object({
  name: zod
    .string()
    .min(1, { message: "Channel name is required" })
    .refine((name) => name !== "general", {
      message: "Channel name cannot be 'general'",
    }),
  type: zod.nativeEnum(ChannelType),
});
