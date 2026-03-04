"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiTwitter,
  FiGlobe,
} from "react-icons/fi";
import { profile } from "@/lib/data";
import Image from "next/image";

const socialIcons: Record<string, React.ComponentType<{ size?: number }>> = {
  github: FiGithub,
  linkedin: FiLinkedin,
  email: FiMail,
  twitter: FiTwitter,
  website: FiGlobe,
};

export default function Hero() {
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubtitleIndex((prev) => (prev + 1) % profile.subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const socialEntries = Object.entries(profile.social).filter(
    ([, url]) => url !== ""
  );

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="text-center space-y-6 px-4">
        {/* Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto ring-4 ring-accent/20 ring-offset-4 ring-offset-background">
            <Image
              src="/images/profile.png"
              alt={profile.name || "Profile"}
              width={160}
              height={160}
              className="object-cover w-full h-full"
              priority
            />
          </div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-foreground"
        >
          {profile.name || "Profile"}
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
        >
          {profile.tagline}
        </motion.p>

        {/* Rotating Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="h-8 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={subtitleIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-accent font-medium text-base md:text-lg"
            >
              {profile.subtitles[subtitleIndex]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Current Role */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-muted-foreground"
        >
          {profile.currentRole} @{" "}
          <span className="text-foreground font-medium">
            {profile.company}
          </span>
        </motion.p>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-4 pt-4"
        >
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
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="pt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-muted-foreground"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mx-auto"
            >
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
