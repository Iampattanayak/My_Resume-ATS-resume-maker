import { EasyFlowSection } from "@/components/features/landing/easy-flow-section";
import { HeroSection } from "@/components/features/landing/hero-section";
import { LandingFooter } from "@/components/features/landing/landing-footer";
import { OrbitingCirclesSection } from "@/components/features/landing/orbiting-circles-section";
import { TemplatesSection } from "@/components/features/landing/templates-section";
import { TestimonialsSection } from "@/components/features/landing/testimonials-section";
import { TopFeaturesSection } from "@/components/features/landing/top-features-section";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { buildPageMetadata } from "@/lib/seo";
import { FileText } from "lucide-react";

export const metadata = buildPageMetadata({
  title: "My Resume",
  description:
    "Build ATS-ready resumes for free with local-first privacy, modern templates, and AI-assisted refinements tailored to your target role.",
  path: "/",
  keywords: [
    "free resume builder",
    "ATS optimization",
    "resume templates",
    "job-specific resume",
  ],
});

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors">
      <div className="flex justify-between items-center px-4 py-1">
        <img src="/assets/logos/logo1.png" alt="My Resume" className="h-8 w-auto object-contain" />
        <ModeToggle />
      </div>
      <HeroSection />
      <OrbitingCirclesSection />
      <TopFeaturesSection />
      <TemplatesSection />
      <EasyFlowSection />
      <TestimonialsSection />
      <LandingFooter />
    </main>
  );
}


