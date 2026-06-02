"use client";

import { PanelLeftIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { VisibilitySelector, type VisibilityType } from "./visibility-selector";

const topNavItems = [
  { label: "About Us", href: "https://www.mylifeasben.co.uk/about" },
  { label: "Join", href: "https://www.mylifeasben.co.uk/join" },
  { label: "Contact", href: "https://www.mylifeasben.co.uk/contact" },
  { label: "Sign In", href: "/login" },
];

function PureChatHeader({
  chatId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const { state, toggleSidebar, isMobile } = useSidebar();

  if (state === "collapsed" && !isMobile) {
    return null;
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-yellow-500/15 bg-black/95 px-3 text-yellow-50 shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur">
      <Button
        className="text-yellow-100 hover:bg-yellow-500/10 hover:text-yellow-50 md:hidden"
        onClick={toggleSidebar}
        size="icon-sm"
        variant="ghost"
      >
        <PanelLeftIcon className="size-4" />
      </Button>

      <Link
        className="flex items-center gap-2 rounded-full border border-yellow-500/25 bg-yellow-500/10 px-3 py-1.5 font-semibold text-[11px] text-yellow-100 uppercase tracking-[0.22em] transition-colors hover:border-yellow-400/60 hover:bg-yellow-500/15"
        href="/"
      >
        <span className="size-2 rounded-full bg-yellow-400 shadow-[0_0_16px_rgba(250,204,21,0.7)]" />
        BEN.AI
      </Link>

      <nav className="ml-auto hidden items-center gap-1 md:flex">
        {topNavItems.map((item) => (
          <Button
            asChild
            className="h-8 rounded-full px-3 text-yellow-50/72 text-xs hover:bg-yellow-500/10 hover:text-yellow-100"
            key={item.label}
            variant="ghost"
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </nav>

      <Button
        asChild
        className="h-8 rounded-full border border-yellow-500/20 px-3 text-yellow-50/80 text-xs hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-100"
        variant="ghost"
      >
        <Link href="/settings">
          <SettingsIcon className="size-3.5" />
          <span className="hidden sm:inline">Settings</span>
        </Link>
      </Button>

      {!isReadonly && (
        <div className="ml-1 hidden md:block">
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
          />
        </div>
      )}
    </header>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return (
    prevProps.chatId === nextProps.chatId &&
    prevProps.selectedVisibilityType === nextProps.selectedVisibilityType &&
    prevProps.isReadonly === nextProps.isReadonly
  );
});
