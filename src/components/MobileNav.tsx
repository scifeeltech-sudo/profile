"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMenu, FiX } from "react-icons/fi";
import { interviews } from "@/lib/data";
import { useLang } from "@/contexts/LanguageContext";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { lang } = useLang();
  const pathname = usePathname();
  const isInterview = pathname === "/interview";

  const interviewNavItems = [
    { id: "hero", label: "Home" },
    ...interviews.map((s, i) => ({
      id: `section-${i}`,
      label: lang === "en" ? s.sectionEn : s.section,
    })),
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border text-foreground"
        aria-label="Open menu"
      >
        <FiMenu size={18} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-background border-r border-border z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <span className="text-sm font-medium text-foreground">
            Navigation
          </span>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted"
            aria-label="Close menu"
          >
            <FiX size={18} />
          </button>
        </div>

        <div className="p-4 space-y-1">
          {/* Page links */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`block px-3 py-2.5 text-sm rounded-md transition-colors font-medium ${
              !isInterview
                ? "text-accent bg-accent/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Career
          </Link>
          <Link
            href="/interview"
            onClick={() => setOpen(false)}
            className={`block px-3 py-2.5 text-sm rounded-md transition-colors font-medium ${
              isInterview
                ? "text-accent bg-accent/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Story
          </Link>

          {/* Interview sub-sections */}
          {isInterview && (
            <>
              <div className="border-t border-border my-3" />
              {interviewNavItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
