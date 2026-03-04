"use client";

import type { ReactNode } from "react";
import type { QnA } from "@/lib/types";
import QnABlock from "./QnABlock";
import ScrollAnimation from "./ScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";

interface InterviewSectionProps {
  id: string;
  title: string;
  titleEn: string;
  qna: QnA[];
  timelineSlot?: ReactNode;
  skillsSlot?: ReactNode;
}

export default function InterviewSection({
  id,
  title,
  titleEn,
  qna,
  timelineSlot,
  skillsSlot,
}: InterviewSectionProps) {
  const { lang } = useLang();
  const displayTitle = lang === "en" ? titleEn : title;
  const subtitle = lang === "en" && title !== titleEn ? title : lang === "ko" && title !== titleEn ? titleEn : null;

  return (
    <section id={id} className="py-16 md:py-24">
      <ScrollAnimation>
        <div className="mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {displayTitle}
          </h2>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          <div className="w-12 h-1 bg-accent mt-4 rounded-full" />
        </div>
      </ScrollAnimation>

      <div className="space-y-2">
        {qna.map((item, i) => (
          <div key={i}>
            <QnABlock
              question={item.question}
              questionEn={item.questionEn}
              answer={item.answer}
              answerEn={item.answerEn}
              index={i}
            />
            {item.timeline && timelineSlot}
            {item.skills && skillsSlot}
          </div>
        ))}
      </div>
    </section>
  );
}
