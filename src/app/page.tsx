"use client";

import CareerPage from "@/components/CareerPage";
import SideNav from "@/components/SideNav";
import MobileNav from "@/components/MobileNav";
import ThemeToggle from "@/components/ThemeToggle";
import LanguageToggle from "@/components/LanguageToggle";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ThemeToggle />
      <LanguageToggle />
      <SideNav />
      <MobileNav />

      <main className="lg:ml-64">
        <CareerPage />
        <Footer />
      </main>
    </>
  );
}
