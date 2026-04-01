"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Shield,
  Search,
  Sparkles,
  LayoutTemplate,
  Eye,
  Copy,
} from "lucide-react";

const features = [
  {
    title: "Local-first privacy",
    description:
      "Your resume data stays exclusively on your machine with IndexedDB-powered storage.",
    icon: Shield,
    delay: 0,
  },
  {
    title: "ATS optimization",
    description:
      "Match job descriptions quickly with focused keyword and structure suggestions to pass screenings.",
    icon: Search,
    delay: 0.1,
  },
  {
    title: "AI rewriting",
    description:
      "Convert raw experience into impact-driven, quantifiable bullet points in seconds.",
    icon: Sparkles,
    delay: 0.2,
  },
  {
    title: "Section templates",
    description:
      "Choose beautifully crafted, role-based templates for faster, consistent resume writing.",
    icon: LayoutTemplate,
    delay: 0.3,
  },
  {
    title: "Live preview",
    description:
      "Instantly review every stylistic and content change before exporting your final true-to-life version.",
    icon: Eye,
    delay: 0.4,
  },
  {
    title: "Export variants",
    description:
      "Generate role-specific PDF versions of your resume tailored to each application with minimal effort.",
    icon: Copy,
    delay: 0.5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 200, damping: 15 },
  },
};

export function TopFeaturesSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-24 md:px-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-20 flex flex-col items-center text-center"
      >
        <h2 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl text-foreground">
          Everything you need to <span className="text-primary">stand out</span>
        </h2>
        <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          Craft stronger, professional resumes in a fraction of the time, packed with intelligent features and full data privacy.
        </p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} variants={itemVariants} className="h-full">
              <Card className="group relative flex h-full flex-col overflow-hidden rounded-3xl border-border/40 bg-background/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:bg-background/60 hover:shadow-2xl hover:shadow-primary/10">
                {/* Decorative blob */}
                <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary/10 blur-3xl transition-all duration-700 group-hover:bg-primary/20 group-hover:scale-150" />
                
                {/* Soft gradient border overlay on hover */}
                <div className="absolute inset-0 border-2 border-transparent transition-colors duration-500 group-hover:border-primary/5 rounded-3xl" />

                <CardHeader className="relative p-8 pb-4">
                  <motion.div
                    variants={iconVariants}
                    className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 text-primary shadow-inner ring-1 ring-primary/20 transition-transform duration-500 group-hover:scale-110"
                  >
                    <Icon className="size-6" />
                  </motion.div>
                  <CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative flex-1 p-8 pt-0 text-muted-foreground/90 leading-relaxed">
                  {feature.description}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
