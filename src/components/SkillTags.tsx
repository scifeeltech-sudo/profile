"use client";

import type { SkillCategory } from "@/lib/types";
import ScrollAnimation from "./ScrollAnimation";

interface SkillTagsProps {
  skills: SkillCategory[];
}

export default function SkillTags({ skills }: SkillTagsProps) {
  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2">
      {skills.map((cat, i) => (
        <ScrollAnimation key={cat.category} delay={i * 0.1}>
          <div className="bg-card rounded-lg p-5 border border-border">
            <h4 className="font-semibold text-accent mb-3 text-sm uppercase tracking-wider">
              {cat.category}
            </h4>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span
                  key={item}
                  className="text-sm px-3 py-1 rounded-full bg-muted text-card-foreground border border-border hover:border-accent hover:text-accent transition-colors cursor-default"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      ))}
    </div>
  );
}
