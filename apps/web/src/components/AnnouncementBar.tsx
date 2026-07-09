import type { ReactNode } from "react";

export default function AnnouncementBar({ children }: { children: ReactNode }) {
  return <div className="announcement-bar">{children}</div>;
}
