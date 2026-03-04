"use client";

import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiGlobe,
} from "react-icons/fi";
import { profile } from "@/lib/data";
import ScrollAnimation from "./ScrollAnimation";
import { useLang } from "@/contexts/LanguageContext";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  twitter: FiTwitter,
  website: FiGlobe,
};

export default function ContactCTA() {
  const { lang } = useLang();
  const socialEntries = Object.entries(profile.social).filter(
    ([, url]) => url !== ""
  );

  return (
    <section id="contact" className="py-20 md:py-28">
      <ScrollAnimation>
        <div className="text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Let&apos;s Talk
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-lg">
            {lang === "en"
              ? "Building at the intersection of AI agents, blockchain, and DePIN — I'd love to connect with builders, partners, and investors."
              : "AI 에이전트 인프라, 블록체인, DePIN — 교차점에서 함께 만들어갈 빌더, 파트너, 투자자분들을 환영합니다."}
          </p>

          {profile.social.email && (
            <a
              href={`mailto:${profile.social.email}`}
              className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-light transition-colors text-lg"
            >
              <FiMail size={20} />
              Get in Touch
            </a>
          )}

          <div className="flex items-center justify-center gap-4 pt-4">
            {socialEntries.map(([key, url]) => {
              const Icon = socialIcons[key];
              if (!Icon) return null;
              const href = key === "email" ? `mailto:${url}` : url;
              return (
                <a
                  key={key}
                  href={href}
                  target={key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-border text-muted-foreground hover:text-accent hover:border-accent transition-colors"
                  aria-label={key}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
