"use client";

import React from "react";
import axios from "axios";
import * as zod from "zod";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, FileIcon, ShieldAlert, ShieldCheck, Trash } from "lucide-react";
import { MemberRole } from "@prisma/client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";

import ActionTooltip from "@/components/ActionTooltip";
import UserAvatar from "@/components/UserAvatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { ChatItemProps } from "@/types/propsTypes";
import { validationForEditingMessage } from "@/lib/formValidation";
import { cn } from "@/lib/utils";
import { useModal } from "@/hooks/useModalStore";

const roleIconMap = {
  GUEST: null,
  MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
  ADMIN: <ShieldAlert className="h-4 w-4 ml-2 text-rose-500" />,
};

const ChatItem = ({
  content,
  currentMember,
  deleted,
  fileUrl,
  id,
  isUpdated,
  member,
  socketQuery,
  socketUrl,
  timestamp,
}: ChatItemProps) => {
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const { onOpen } = useModal();
  const params = useParams();
  const router = useRouter();

  const form = useForm<zod.infer<typeof validationForEditingMessage>>({
    resolver: zodResolver(validationForEditingMessage),
    defaultValues: {
      content: content,
    },
  });

  const onMemberClick = () => {
    if (member.id === currentMember.id) {
      return;
    }

    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
  };

  React.useEffect(() => {
    const handleKeyDown = (event: any) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        setIsEditing(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (
    values: zod.infer<typeof validationForEditingMessage>
  ) => {
    try {
      const url = qs.stringifyUrl({
        url: `${socketUrl}/${id}`,
        query: socketQuery,
      });
      await axios.patch(url, values);

      form.reset();
      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async () => {};

  React.useEffect(() => {
    form.reset({
      content: content,
    });
  }, [form, content]);

  const fileType = fileUrl?.split(".").pop();

  const isAdmin = currentMember.role === MemberRole.ADMIN;
  const isModerator = currentMember.role === MemberRole.MODERATOR;
  const isOwner = currentMember.id === member.id;
  const canDeleteMessage = !deleted && (isAdmin || isModerator || isOwner);
  const canEditMessage = !deleted && isOwner && !fileUrl;
  const isPDF = fileType === "pdf" && fileUrl;
  const isImage = !isPDF && fileUrl;

  return (
    <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
      <div className="group flex gap-x-2 items-start w-full">
        <div
          onClick={() => onMemberClick()}
          className="cursor-pointer hover:drop-shadow-md transition"
        >
          <UserAvatar src={member.profile.imageUrl} />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <div className="flex items-center">
              <p
                onClick={() => onMemberClick()}
                className="font-semibold text-sm hover:underline cursor-pointer"
              >
                {member.profile.name}
              </p>
              <ActionTooltip label={member.role}>
                {roleIconMap[member.role]}
              </ActionTooltip>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              {timestamp}
            </span>
          </div>
          {isImage && (
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-md overflow-hidden border flex items-center
          bg-secondary h-48 w-48"
            >
              <Image
                src={fileUrl}
                alt={content}
                fill
                className="object-cover"
              />
            </a>
          )}
          {isPDF && (
            <div
              className="relative flex items-center p-2 mt-2 rounded-md
           bg-background/10"
            >
              <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
              >
                PDF File
              </a>
            </div>
          )}
          {!fileUrl && !isEditing && (
            <p
              className={cn(
                "text-sm text-zinc-600 dark:text-zinc-300",
                deleted &&
                  "italic text-zinc-500 dark:text-zinc-400 text-xs mt-1"
              )}
            >
              {content}
              {isUpdated && !deleted && (
                <span className="text-[10px] mx-2 text-zinc-500 dark:text-zinc-400">
                  (edited)
                </span>
              )}
            </p>
          )}
          {!fileUrl && isEditing && (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full gap-x-2 pt-2"
              >
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            disabled={isLoading}
                            className="p-2 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0
                          focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                            placeholder="Edited message"
                            {...field}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button disabled={isLoading} size="sm" variant="primary">
                  Save
                </Button>
              </form>
              <span className="text-[10px] mt-1 text-zinc-400">
                Press esc to cancel, enter to save
              </span>
            </Form>
          )}
        </div>
      </div>
      {canDeleteMessage && (
        <div
          className="hidden group-hover:flex items-center gap-x-2 absolute p-1 -top-2 right-5
        bg-white dark:bg-zinc-800 border rounded-sm"
        >
          {canEditMessage && (
            <ActionTooltip label="Edit">
              <Edit
                onClick={() => setIsEditing(true)}
                className="cursor-pointer ml-auto w-4 h-4 text-zinc-500
                    hover:text-zinc-600 dark:hover:text-zinc-300 transition"
              />
            </ActionTooltip>
          )}
          <ActionTooltip label="Delete">
            <Trash
              onClick={() =>
                onOpen("deleteMessage", {
                  apiUrl: `${socketUrl}/${id}`,
                  query: socketQuery,
                })
              }
              className="cursor-pointer ml-auto w-4 h-4 text-zinc-500
                    hover:text-zinc-600 dark:hover:text-zinc-300 transition"
            />
          </ActionTooltip>
        </div>
      )}
    </div>
  );
};

export default ChatItem;
