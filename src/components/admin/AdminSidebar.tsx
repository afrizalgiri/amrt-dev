"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FolderOpen,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AdminSidebarProps {
  logoUrl: string;
  siteName: string;
}

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: FolderOpen },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminSidebar({ logoUrl, siteName }: AdminSidebarProps) {
  const pathname = usePathname();

  const nameParts = siteName.includes(".")
    ? [siteName.split(".")[0], "." + siteName.split(".").slice(1).join(".")]
    : [siteName, ""];

  return (
    <aside className="w-64 border-r border-glass-border bg-surface-900 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-glass-border">
        <Link href="/admin" className="flex items-center gap-2 text-xl font-bold text-white">
          <Image
            src={logoUrl}
            alt={siteName}
            width={28}
            height={28}
            className="rounded-md object-contain"
          />
          <span className="text-primary-400">{nameParts[0]}</span>
          {nameParts[1] && (
            <span className="text-gray-400 -ml-1">{nameParts[1]}</span>
          )}
        </Link>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {sidebarLinks.map((link) => {
          const isActive =
            link.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-primary-500/10 text-primary-400 border border-primary-500/20"
                  : "text-gray-400 hover:text-white hover:bg-glass-hover"
              }`}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
              {isActive && (
                <ChevronRight className="w-3.5 h-3.5 ml-auto" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-glass-border">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
