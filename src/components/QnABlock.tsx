"use client";

import ScrollAnimation from "./ScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";

interface QnABlockProps {
  question: string;
  questionEn: string;
  answer: string;
  answerEn: string;
  index: number;
}

export default function QnABlock({
  question,
  questionEn,
  answer,
  answerEn,
  index,
}: QnABlockProps) {
  const { lang } = useLang();
  const q = lang === "en" ? questionEn : question;
  const a = lang === "en" ? answerEn : answer;

  return (
    <ScrollAnimation delay={index * 0.1} className="mb-10">
      <div className="space-y-3">
        <p className="font-serif text-lg md:text-xl italic text-accent leading-relaxed">
          Q. {q}
        </p>
        <p className="text-base md:text-lg leading-relaxed text-foreground/90 pl-1">
          {a}
        </p>
      </div>
    </ScrollAnimation>
  );
}
