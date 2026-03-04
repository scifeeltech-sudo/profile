"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { interviews, domainExpertise } from "@/lib/data";
import { useLang } from "@/contexts/LanguageContext";

export default function SideNav() {
  const { lang } = useLang();
  const pathname = usePathname();
  const isInterview = pathname === "/interview";

  const sectionIds = isInterview
    ? ["hero", ...interviews.map((_, i) => `section-${i}`), "contact"]
    : [];
  const activeId = useActiveSection(sectionIds);

  const interviewNavItems = [
    { id: "hero", label: "Home" },
    ...interviews.map((s, i) => ({
      id: `section-${i}`,
      label: lang === "en" ? s.sectionEn : s.section,
    })),
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 flex-col justify-between py-8 px-6 border-r border-border bg-background/80 backdrop-blur-sm z-40">
      <div>
        <div className="mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Profile
          </p>
        </div>

        {/* Page links */}
        <div className="space-y-1 mb-4">
          <Link
            href="/"
            className={`block px-3 py-2 text-sm rounded-md transition-colors font-medium ${
              !isInterview
                ? "text-accent bg-accent/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Career
          </Link>
          <Link
            href="/interview"
            className={`block px-3 py-2 text-sm rounded-md transition-colors font-medium ${
              isInterview
                ? "text-accent bg-accent/10"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            Story
          </Link>
        </div>

        {/* Interview sub-sections */}
        {isInterview && (
          <>
            <div className="border-t border-border my-3" />
            <ul className="space-y-1">
              {interviewNavItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={`block px-3 py-1.5 text-sm rounded-md transition-colors ${
                      activeId === item.id
                        ? "text-accent bg-accent/10 font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Domain Expertise */}
      <div className="border-t border-border pt-4">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
          Domain Expertise
        </p>
        <ul className="space-y-2">
          {domainExpertise.map((d) => (
            <li key={d.domain}>
              <p className="text-xs font-medium text-foreground">{d.domain}</p>
              <p className="text-xs text-muted-foreground">
                {lang === "en" ? d.relevanceEn : d.relevance}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
