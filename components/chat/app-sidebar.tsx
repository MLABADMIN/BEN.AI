"use client";

import {
  CalendarDaysIcon,
  ChevronDownIcon,
  CompassIcon,
  GiftIcon,
  LayoutDashboardIcon,
  NotebookPenIcon,
  PanelLeftIcon,
  PenSquareIcon,
  SettingsIcon,
  SparklesIcon,
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

const previewWidgets = [
  {
    title: "My Life OS",
    description:
      "Early-access workspace preview: choose, move and minimise the life widgets you need.",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Notes",
    description:
      "A safe place to park thoughts, lists and open loops without keeping a million tabs open.",
    icon: NotebookPenIcon,
  },
  {
    title: "Calendar",
    description:
      "Future calendar support for birthdays, reminders, travel dates and life-admin moments.",
    icon: CalendarDaysIcon,
  },
  {
    title: "Gift prompts",
    description:
      "Planned gift-voucher suggestions connected to important dates, notes and reminders.",
    icon: GiftIcon,
  },
  {
    title: "Declutter nudge",
    description:
      "Optional future reminder to save, archive or clear stale open items. Never auto-deletes.",
    icon: SparklesIcon,
  },
  {
    title: "Widget settings",
    description:
      "Choose which modules appear, what can remind you, and how calm the workspace feels.",
    icon: SettingsIcon,
  },
];

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

    toast.success("All BEN.AI chats deleted");
  };

  const askAboutEarlyAccess = () => {
    setOpenMobile(false);
    router.push("/");
    toast.message("Ask BEN.AI about My Life OS early access");
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
              Launch guide now. My Life OS early-access previews below.
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

                <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                  <details className="group mt-2 rounded-xl border border-yellow-500/20 bg-[#080808] p-2 open:bg-yellow-500/5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-2 rounded-lg px-2 py-2 text-yellow-50 text-xs">
                      <span className="flex min-w-0 flex-col">
                        <span className="font-semibold">My Life OS preview</span>
                        <span className="text-[11px] text-yellow-100/50">
                          Demo modules for early access
                        </span>
                      </span>
                      <ChevronDownIcon className="size-4 text-yellow-300/80 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 space-y-2">
                      {previewWidgets.map((item) => {
                        const Icon = item.icon;

                        return (
                          <button
                            className="w-full rounded-lg border border-yellow-500/10 bg-black/40 p-2 text-left transition-colors hover:border-yellow-500/30 hover:bg-yellow-500/10"
                            key={item.title}
                            onClick={askAboutEarlyAccess}
                            type="button"
                          >
                            <span className="flex items-start gap-2">
                              <Icon className="mt-0.5 size-4 shrink-0 text-yellow-400/85" />
                              <span className="min-w-0">
                                <span className="flex items-center gap-2 font-medium text-[12px] text-yellow-50">
                                  {item.title}
                                  <span className="rounded-full border border-yellow-500/20 px-1.5 py-0.5 text-[9px] text-yellow-200/75 uppercase tracking-[0.16em]">
                                    Preview
                                  </span>
                                </span>
                                <span className="mt-1 block text-[11px] leading-4 text-yellow-100/55">
                                  {item.description}
                                </span>
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </details>
                </SidebarMenuItem>

                <SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
                  <Link
                    className="mt-2 flex rounded-xl border border-yellow-500/25 bg-gradient-to-br from-yellow-500/15 to-black p-3 text-left transition-colors hover:border-yellow-400/60"
                    href="https://www.mylifeasben.co.uk/join"
                  >
                    <span>
                      <span className="block font-semibold text-sm text-yellow-50">
                        Join early access
                      </span>
                      <span className="mt-1 block text-[11px] leading-4 text-yellow-100/60">
                        Register interest for BEN.AI, MLAB membership and future My Life OS features.
                      </span>
                    </span>
                  </Link>
                </SidebarMenuItem>

                {user && (
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      className="mt-2 rounded-lg text-sidebar-foreground/40 transition-colors duration-150 hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => setShowDeleteAllDialog(true)}
                      tooltip="Delete all BEN.AI chats"
                    >
                      <TrashIcon className="size-4" />
                      <span className="text-[13px]">Delete all</span>
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
            <AlertDialogTitle>Delete all BEN.AI chats?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete all
              your BEN.AI chats and remove them from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAll}>
              Delete all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
