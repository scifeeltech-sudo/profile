"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiVideo,
  FiArrowRight,
  FiBriefcase,
} from "react-icons/fi";
import { profile, interviews, education } from "@/lib/data";
import { useLang } from "@/contexts/LanguageContext";
import ScrollAnimation from "./ScrollAnimation";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  twitter: FiTwitter,
  website: FiVideo,
};

const socialOverrides: Record<string, string> = {
  website: "https://calendly.com/selanet/30min",
};


export default function CareerPage() {
  const { lang } = useLang();

  const socialEntries = Object.entries(profile.social).filter(
    ([, url]) => url !== ""
  );

  // Data sources
  const aboutText =
    lang === "en"
      ? interviews[0].qna[0].answerEn
      : interviews[0].qna[0].answer;

  const timeline = interviews[3].qna[0].timeline ?? [];
  const skills = interviews[4].qna[0].skills ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 pb-16">
      {/* ── Profile Header ── */}
      <section className="relative mb-8">
        {/* Banner */}
        <a
          href="https://selanet.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="block h-48 md:h-56 rounded-b-2xl relative overflow-hidden cursor-pointer"
        >
          <Image
            src="/images/banner.jpg"
            alt="SelaNet.ai Banner"
            fill
            className="object-cover object-bottom"
            priority
          />
        </a>

        {/* Profile card overlapping banner */}
        <div className="relative -mt-16 px-4 md:px-8">
          <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6">
              {/* Avatar */}
              <div className="-mt-20 md:-mt-24 shrink-0">
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden ring-4 ring-card border-4 border-card bg-card">
                  <Image
                    src="/images/profile.png"
                    alt={profile.name || "Profile"}
                    width={144}
                    height={144}
                    className="object-cover w-full h-full"
                    priority
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {profile.name || "Profile"}
                </h1>
                <p className="text-lg text-muted-foreground mt-1">
                  {profile.tagline}
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FiBriefcase size={14} />
                    {profile.currentRole} @ {profile.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Image src="/images/flags/kr.png" alt="Korea" width={20} height={14} className="rounded-sm" />
                    <Image src="/images/flags/us.png" alt="USA" width={20} height={14} className="rounded-sm" />
                    <Image src="/images/flags/sg.png" alt="Singapore" width={20} height={14} className="rounded-sm" />
                  </span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2 shrink-0">
                {socialEntries.map(([key, url]) => {
                  const Icon = socialIcons[key];
                  if (!Icon) return null;
                  const href = socialOverrides[key] ?? (key === "email" ? `mailto:${url}` : url);
                  return (
                    <a
                      key={key}
                      href={href}
                      target={key === "email" ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                      aria-label={key}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <ScrollAnimation>
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            {lang === "en" ? "About" : "소개"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{aboutText}</p>
        </section>
      </ScrollAnimation>

      {/* ── Experience ── */}
      <ScrollAnimation>
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            {lang === "en" ? "Experience" : "경력"}
          </h2>
          <div className="space-y-0">
            {[...timeline].reverse().map((item, i) => (
              <div key={i} className="relative flex gap-4 group">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 group-hover:border-accent transition-colors overflow-hidden">
                    {item.company === "SelaNet.ai" ? (
                      <a href="https://selanet.ai" target="_blank" rel="noopener noreferrer">
                        <Image src="/images/logos/selanet.png" alt="SelaNet.ai" width={40} height={40} className="object-cover" />
                      </a>
                    ) : (
                      <FiBriefcase
                        size={16}
                        className="text-muted-foreground group-hover:text-accent transition-colors"
                      />
                    )}
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-border min-h-[24px]" />
                  )}
                </div>

                {/* Content */}
                <div className="pb-8 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {item.role}
                      </h3>
                      <p className="text-sm text-accent font-medium">
                        {item.company === "SelaNet.ai" ? (
                          <a href="https://selanet.ai" target="_blank" rel="noopener noreferrer" className="hover:underline">
                            {item.company}
                          </a>
                        ) : (
                          item.company
                        )}
                      </p>
                    </div>
                    {item.company === "SelaNet.ai" && (
                      <div className="flex items-center gap-2">
                        <a href="https://x.com/selanetai" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 border border-foreground/20 text-foreground hover:bg-accent hover:text-white hover:border-accent transition-colors" aria-label="X (Twitter)">
                          <FiTwitter size={14} />
                        </a>
                        <a href="https://discord.com/invite/NGrHGDCGd" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-full bg-foreground/10 border border-foreground/20 text-foreground hover:bg-[#5865F2] hover:text-white hover:border-[#5865F2] transition-colors" aria-label="Discord">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.095 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
                        </a>
                      </div>
                    )}
                  </div>
                  {item.period && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.period}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                    {lang === "en" ? item.highlightEn : item.highlight}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* ── Education ── */}
      <ScrollAnimation>
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {lang === "en" ? "Education" : "학력"}
          </h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.school} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted-foreground"
                  >
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c0 1.1 2.7 2 6 2s6-.9 6-2v-5" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {edu.school}
                  </h3>
                  <p className="text-sm text-muted-foreground">{edu.degree}</p>
                  <p className="text-xs text-muted-foreground">
                    {edu.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* ── Skills ── */}
      <ScrollAnimation>
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            {lang === "en" ? "Skills" : "기술"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {skills.map((cat) => (
              <div key={cat.category}>
                <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-2">
                  {cat.category}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-2.5 py-1 rounded-full bg-muted text-card-foreground border border-border hover:border-accent hover:text-accent transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollAnimation>

      {/* ── CTA ── */}
      <ScrollAnimation>
        <section className="bg-card border border-border rounded-2xl p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            {lang === "en"
              ? "Want to know more?"
              : "더 자세한 이야기가 궁금하신가요?"}
          </h2>
          <p className="text-muted-foreground mb-6">
            {lang === "en"
              ? "Read the full interview to learn about my journey, vision, and technical perspective."
              : "인터뷰 전문을 통해 커리어 여정, 비전, 기술 관점을 확인하세요."}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/interview"
              className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-light transition-colors"
            >
              {lang === "en" ? "Read Full Interview" : "인터뷰 전문 보기"}
              <FiArrowRight size={16} />
            </Link>
            {profile.social.email && (
              <a
                href={`mailto:${profile.social.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium border border-border text-foreground hover:bg-muted transition-colors"
              >
                <FiMail size={16} />
                {lang === "en" ? "Contact" : "연락하기"}
              </a>
            )}
          </div>
        </section>
      </ScrollAnimation>
    </div>
  );
}
