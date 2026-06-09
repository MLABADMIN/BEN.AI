"use client";

import {
  CompassIcon,
  PanelLeftIcon,
  PenSquareIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { unstable_serialize } from "swr/infinite";
import {
  getChatHistoryPaginationKey,
  SidebarHistory,
} from "@/components/chat/sidebar-history";
import { SidebarUserNav } from "@/components/chat/sidebar-user-nav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function AppSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile, toggleSidebar } = useSidebar();
  const { mutate } = useSWRConfig();
  const [showDeleteAllDialog, setShowDeleteAllDialog] = useState(false);

  const handleDeleteAll = () => {
    setShowDeleteAllDialog(false);
    router.replace("/");
    mutate(unstable_serialize(getChatHistoryPaginationKey), [], {
      revalidate: false,
    });

    fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/history`, {
      method: "DELETE",
    });

    toast.success("BEN.AI chat history cleared");
  };

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader className="border-yellow-500/10 border-b bg-black pb-3 pt-3 text-yellow-50">
          <SidebarMenu>
            <SidebarMenuItem className="flex flex-row items-center justify-between">
              <div className="group/logo relative flex items-center justify-center">
                <SidebarMenuButton
                  asChild
                  className="size-8 !px-0 items-center justify-center border border-yellow-500/25 bg-yellow-500/10 text-yellow-100 group-data-[collapsible=icon]:group-hover/logo:opacity-0"
                  tooltip="BEN.AI"
                >
                  <Link href="/" onClick={() => setOpenMobile(false)}>
                    <CompassIcon className="size-4 text-yellow-400" />
                  </Link>
                </SidebarMenuButton>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton
                      className="pointer-events-none absolute inset-0 size-8 opacity-0 group-data-[collapsible=icon]:pointer-events-auto group-data-[collapsible=icon]:group-hover/logo:opacity-100"
                      onClick={() => toggleSidebar()}
                    >
                      <PanelLeftIcon className="size-4" />
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block" side="right">
                    Open BEN.AI menu
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="group-data-[collapsible=icon]:hidden">
                <SidebarTrigger className="text-yellow-100/60 transition-colors duration-150 hover:text-yellow-100" />
              </div>
            </SidebarMenuItem>
          </SidebarMenu>
          <div className="mt-3 px-2 group-data-[collapsible=icon]:hidden">
            <p className="font-semibold text-sm text-yellow-50">BEN.AI / MLAB</p>
            <p className="mt-1 text-[11px] text-yellow-100/55">
              Chat, history and working controls only.
            </p>
          </div>
        </SidebarHeader>
        <SidebarContent className="bg-black text-yellow-50">
          <SidebarGroup className="pt-3">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    className="h-9 rounded-lg border border-yellow-500/25 bg-yellow-500/10 text-[13px] text-yellow-50 transition-colors duration-150 hover:bg-yellow-500/15 hover:text-yellow-100"
                    onClick={() => {
                      setOpenMobile(false);
                      router.push("/");
                    }}
                    tooltip="New BEN.AI chat"
                  >
                    <PenSquareIcon className="size-4" />
                    <span className="font-medium">New BEN.AI chat</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                {user && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="mt-2 rounded-lg text-yellow-100/45 transition-colors duration-150 hover:bg-yellow-500/10 hover:text-yellow-100"
                      onClick={() => setShowDeleteAllDialog(true)}
                      tooltip="Clear BEN.AI chat history"
                    >
                      <TrashIcon className="size-4" />
                      <span className="text-[13px]">Clear history</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarHistory user={user} />
        </SidebarContent>
        <SidebarFooter className="border-yellow-500/10 border-t bg-black pt-2 pb-3">
          {user && <SidebarUserNav user={user} />}
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <AlertDialog
        onOpenChange={setShowDeleteAllDialog}
        open={showDeleteAllDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Clear BEN.AI chat history?</AlertDialogTitle>
            <AlertDialogDescription>
              This clears the BEN.AI conversations saved to this workspace. It
              will not change your account or website data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep history</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>
              Clear history
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
