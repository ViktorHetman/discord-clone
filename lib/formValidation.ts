import * as zod from "zod";

export const formValidation = zod.object({
  name: zod.string().min(1, { message: "Server name is required." }),
  imageUrl: zod.string().min(1, { message: "Server image is required" }),
});
