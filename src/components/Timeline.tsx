"use client";

import type { TimelineItem } from "@/lib/types";
import ScrollAnimation from "./ScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  const { lang } = useLang();

  return (
    <div className="relative mt-8 mb-8">
      {/* Vertical line */}
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-8">
        {items.map((item, i) => (
          <ScrollAnimation key={i} delay={i * 0.1}>
            <div className="relative pl-12 md:pl-16">
              {/* Dot */}
              <div
                className={`absolute left-2.5 md:left-4.5 top-1.5 w-3 h-3 rounded-full border-2 ${
                  i === items.length - 1
                    ? "bg-accent border-accent"
                    : "bg-background border-accent"
                }`}
              />

              <div className="bg-card rounded-lg p-4 md:p-5 border border-border">
                <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 mb-2">
                  {item.period && (
                    <span className="text-xs font-mono text-muted-foreground shrink-0">
                      {item.period}
                    </span>
                  )}
                  <h4 className="font-semibold text-foreground">
                    {item.role}
                  </h4>
                </div>
                <p className="text-sm text-accent font-medium mb-2">
                  {item.company}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lang === "en" ? item.highlightEn : item.highlight}
                </p>
                {item.tags && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
}
