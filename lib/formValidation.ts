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

export const validationForChatInput = zod.object({
  content: zod.string().min(1, { message: "The count shoul be more than 1" }),
});

export const validationForMessageFile = zod.object({
  fileUrl: zod.string().min(1, { message: "Attachment is required" }),
});

export const validationForEditingMessage = zod.object({
  content: zod.string().min(1, { message: "The count shoul be more than 1" }),
});
