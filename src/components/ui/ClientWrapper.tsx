"use client";

import { CursorFollower } from "@/components/ui/cursor-follower";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      {typeof window !== "undefined" && window.innerWidth > 768 && (
        <CursorFollower />
      )}
      {children}
    </>
  );
}
