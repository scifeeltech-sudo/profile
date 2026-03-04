"use client";

import Hero from "@/components/Hero";
import InterviewSection from "@/components/InterviewSection";
import Timeline from "@/components/Timeline";
import SkillTags from "@/components/SkillTags";
import ContactCTA from "@/components/ContactCTA";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import Footer from "@/components/Footer";
import { interviews } from "@/lib/data";

export default function InterviewPage() {
  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
      <SideNav />
      <MobileNav />

      <main className="lg:ml-64">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <Hero />

          {interviews.map((section, i) => {
            const timelineQna = section.qna.find((q) => q.timeline);
            const skillsQna = section.qna.find((q) => q.skills);

            return (
              <InterviewSection
                key={i}
                id={`section-${i}`}
                title={section.section}
                titleEn={section.sectionEn}
                qna={section.qna}
                timelineSlot={
                  timelineQna?.timeline ? (
                    <Timeline items={timelineQna.timeline} />
                  ) : undefined
                }
                skillsSlot={
                  skillsQna?.skills ? (
                    <SkillTags skills={skillsQna.skills} />
                  ) : undefined
                }
              />
            );
          })}

          <ContactCTA />
        </div>
        <Footer />
      </main>
    </>
  );
}
