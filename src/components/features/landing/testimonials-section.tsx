"use client";

import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
import { Star, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "I started getting interview calls within two weeks after using My Resume.",
    name: "Priya S.",
    role: "Frontend Engineer",
    img: "https://avatar.vercel.sh/priya",
  },
  {
    quote: "The ATS suggestions are practical and cut my resume editing time in half.",
    name: "Michael R.",
    role: "Product Manager",
    img: "https://avatar.vercel.sh/michael",
  },
  {
    quote: "Private, fast, and genuinely useful. My Resume made resume tailoring painless.",
    name: "Ananya K.",
    role: "Data Analyst",
    img: "https://avatar.vercel.sh/ananya",
  },
  {
    quote: "I love that my data stays on my machine. The AI rewriting is a game changer.",
    name: "David L.",
    role: "Software Developer",
    img: "https://avatar.vercel.sh/david",
  },
  {
    quote: "Finally, a resume builder that doesn't lock my data behind a paywall.",
    name: "Sarah J.",
    role: "UX Designer",
    img: "https://avatar.vercel.sh/sarah",
  },
];

const ReviewCard = ({
  img,
  name,
  role,
  quote,
}: {
  img: string;
  name: string;
  role: string;
  quote: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-[350px] cursor-pointer overflow-hidden rounded-2xl border p-6 transition-all duration-300",
        "border-border/50 bg-background/50 backdrop-blur-xl hover:border-primary/50 hover:bg-background/80 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1"
      )}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <MessageSquareQuote className="size-10" />
      </div>
      <div className="flex flex-row items-center gap-4 mb-4">
        <div className="relative">
           <img className="rounded-full border border-border" width="48" height="48" alt="" src={img} />
           <div className="absolute -bottom-1 -right-1 bg-emerald-500 rounded-full border-2 border-background size-3.5"></div>
        </div>
        <div className="flex flex-col">
          <figcaption className="text-base font-bold tracking-tight text-foreground">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted-foreground">{role}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <blockquote className="text-sm leading-relaxed text-foreground/80">
        &ldquo;{quote}&rdquo;
      </blockquote>
    </figure>
  );
};

export function TestimonialsSection() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 py-32 md:px-10 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,theme(colors.primary.DEFAULT/0.05),transparent_50%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center text-center mb-16">
        <motion.h2 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5 }}
           className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-6"
        >
          Loved by <span className="text-emerald-500">professionals</span><br/>worldwide
        </motion.h2>
        
        <motion.p 
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.5, delay: 0.1 }}
           className="max-w-2xl text-lg text-muted-foreground"
        >
          Join thousands of job seekers who have successfully bypassed ATS filters and landed their dream roles using our local-first AI system.
        </motion.p>
      </div>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
        {/* Gradients for smooth fade out at left/right edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background via-background/80 to-transparent z-20"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background via-background/80 to-transparent z-20"></div>

        <Marquee pauseOnHover className="[--duration:50s]">
          {testimonials.map((review) => (
            <ReviewCard key={review.name} {...review} />
          ))}
        </Marquee>
        
        <Marquee reverse pauseOnHover className="[--duration:55s] mt-6">
          {[...testimonials].reverse().map((review) => (
            <ReviewCard key={review.role} {...review} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
