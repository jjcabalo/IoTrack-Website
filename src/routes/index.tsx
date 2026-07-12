import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  AnimatePresence,
  useMotionValue,
} from "framer-motion";
import confetti from "canvas-confetti";
import {
  ArrowRight,
  Menu,
  X,
  Cpu,
  Radio,
  Zap,
  Bot,
  Cable,
  Battery,
  CircuitBoard,
  Wrench,
  ChevronDown,
  Sparkles,
  Radar,
  Move3d,
  Hand,
  RotateCw,
  MapPin,
  CheckCircle2,
  Play,
  BookOpen,
  Boxes,
  Wifi,
  Cog,
  ScanLine,
  Trophy,
  GraduationCap,
  Mail,
  Github,
  Check,
  Copy,
} from "lucide-react";

import { RoboticArm } from "@/components/RoboticArm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: IoTrackPage,
});

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium tracking-wide uppercase text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.1}>
        <h2 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.2}>
          <p className="mt-5 text-lg text-muted-foreground">{description}</p>
        </Reveal>
      )}
    </div>
  );
}

function MagneticButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  as = "button",
  href,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  as?: "button" | "a";
  href?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    x.set(((e.clientX - r.left - r.width / 2) / r.width) * 20);
    y.set(((e.clientY - r.top - r.height / 2) / r.height) * 20);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    variant === "primary"
      ? "bg-gradient-brand text-primary-foreground shadow-glow"
      : "glass text-foreground";

  const Content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={`group relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-semibold transition-all ${base} ${className}`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.div>
  );

  if (as === "a") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        className="inline-block"
      >
        {Content}
      </a>
    );
  }
  return (
    <button onClick={onClick} className="inline-block">
      {Content}
    </button>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

function FloatingParticles({ count = 20 }: { count?: number }) {
  const items = Array.from({ length: count });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((_, i) => {
        const size = 4 + Math.random() * 10;
        const dur = 6 + Math.random() * 10;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-gradient-brand opacity-40 blur-sm"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.15, 0.55, 0.15],
            }}
            transition={{
              duration: dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        );
      })}
    </div>
  );
}

function BlobsBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-brand/30 blur-3xl animate-blob" />
      <div
        className="absolute right-0 top-40 h-[500px] w-[500px] rounded-full bg-accent-glow/25 blur-3xl animate-blob"
        style={{ animationDelay: "4s" }}
      />
      <div
        className="absolute left-1/3 bottom-0 h-96 w-96 rounded-full bg-brand-2/25 blur-3xl animate-blob"
        style={{ animationDelay: "8s" }}
      />
    </div>
  );
}

// -----------------------------------------------------------------------------
// Nav
// -----------------------------------------------------------------------------

const NAV = [
  { id: "home", label: "Home" },
  { id: "journey", label: "Learning Journey" },
  { id: "robotic-arm", label: "Robotic Arm" },
  { id: "assembly", label: "Assembly Guide" },
  { id: "manual", label: "User Manual" },
  { id: "faqs", label: "FAQs" },
  { id: "evaluation", label: "Evaluation" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all ${scrolled ? "py-2" : "py-4"}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 sm:px-8">
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full px-6 py-2.5 transition-all ${scrolled ? "glass shadow-soft" : ""}`}
        >
          <button onClick={() => go("home")} className="flex items-center gap-2 font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
              <Bot className="h-5 w-5" />
            </span>
            <span className="hidden sm:inline">IoTrack</span>
          </button>
          <div className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => go(n.id)}
                className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {n.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
              className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-4 mt-2 rounded-3xl glass p-3 shadow-soft lg:hidden"
          >
            <div className="flex flex-col">
              {NAV.map((n) => (
                <button
                  key={n.id}
                  onClick={() => go(n.id)}
                  className="rounded-2xl px-4 py-3 text-left text-sm font-medium hover:bg-accent"
                >
                  {n.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// -----------------------------------------------------------------------------
// Hero
// -----------------------------------------------------------------------------

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-1, 1], [8, -8]), { stiffness: 100, damping: 20 });
  const ry = useSpring(useTransform(mx, [-1, 1], [-8, 8]), { stiffness: 100, damping: 20 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };
  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={handleMove}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero pt-28"
    >
      <BlobsBackground />
      <FloatingParticles count={26} />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-8 pb-20 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
              </span>
              HANDS ON LEARNING ON IOT
            </span>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl md:text-7xl">
              <span className="text-gradient-brand">IoTrack</span>
              <br />
              Learning Kit
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
              Learn the fundamentals of the Internet of Things through an interactive robotic arm
              demonstration.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <MagneticButton
                onClick={() =>
                  document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Start Learning Session
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                onClick={() =>
                  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="h-4 w-4" />
                Go to Demo
              </MagneticButton>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="mt-12 grid max-w-md grid-cols-3 gap-6">
              {[
                { n: 9, s: "+", l: "Modules" },
                { n: 8, s: "", l: "Components" },
                { n: 100, s: "%", l: "Hands-on" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-gradient-brand">
                    <Counter to={s.n} suffix={s.s} />
                  </div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div
          style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
          className="relative"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative mx-auto aspect-square max-w-lg"
          >
            <div className="absolute inset-6 rounded-[3rem] bg-gradient-brand opacity-20 blur-3xl" />
            <div className="relative h-full w-full rounded-[3rem] glass p-4 shadow-glow">
              <RoboticArm className="h-full w-full" />
              {/* HUD */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute left-4 top-4 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs font-medium"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                System Online
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="absolute right-4 top-4 rounded-full glass px-3 py-1.5 text-xs font-medium"
              >
                ESP32 · Wi-Fi
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full glass px-4 py-2 text-xs font-medium"
              >
                <span className="text-gradient-brand font-bold">Sensor:</span> Detecting…
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="h-6 w-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Learning Journey - timeline
// -----------------------------------------------------------------------------

const JOURNEY = [
  {
    id: 1,
    title: "Pre-Evaluation",
    desc: "Take the Pre-Test to measure your baseline understanding.",
    icon: GraduationCap,
  },
  {
    id: 2,
    title: "What is IoTrack?",
    desc: "Understand the project, its objectives and its educational purpose.",
    icon: BookOpen,
  },
  {
    id: 3,
    title: "IoT Concepts",
    desc: "Explore sensors, microcontrollers, communication and automation.",
    icon: Wifi,
  },
  {
    id: 4,
    title: "Components Used",
    desc: "Meet the hardware that powers the IoTrack robotic arm.",
    icon: Boxes,
  },
  {
    id: 5,
    title: "How the Robotic Arm Works",
    desc: "Watch the full pick-and-place workflow, step by step.",
    icon: Bot,
  },
  {
    id: 6,
    title: "Assembly Guide",
    desc: "Follow a guided build — from frame to first movement.",
    icon: Wrench,
  },
  {
    id: 7,
    title: "User Manual",
    desc: "Operate, calibrate and maintain the robotic arm.",
    icon: BookOpen,
  },
  {
    id: 8,
    title: "FAQs",
    desc: "Answers to the most common questions from students.",
    icon: Sparkles,
  },
  {
    id: 9,
    title: "Demonstration Summary",
    desc: "Recap the complete pick-and-sort demonstration.",
    icon: Radar,
  },
  {
    id: 10,
    title: "Post-Evaluation",
    desc: "Complete the Post-Test to measure what you've learned.",
    icon: Trophy,
  },
];

function LearningJourney() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
    stiffness: 60,
    damping: 20,
  });
  return (
    <section id="journey" className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-6xl px-8">
        <SectionHeader
          eyebrow="Learning Journey"
          title="Your path through IoTrack"
          description="A ten-step guided experience that begins with a Pre-Test and ends with a Post-Test. Scroll to reveal each stage."
        />

        <div ref={ref} className="relative mt-24">
          {/* Center line */}
          <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineH }}
            className="absolute left-6 top-0 w-px bg-gradient-brand md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-16">
            {JOURNEY.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              return (
                <div
                  key={step.id}
                  className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2"
                >
                  {/* Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="absolute left-6 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow md:left-1/2"
                  >
                    <Icon className="h-5 w-5" />
                  </motion.div>

                  <div
                    className={`pl-16 md:pl-0 ${isRight ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}`}
                  >
                    <Reveal y={20}>
                      <div
                        className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${isRight ? "" : "md:justify-end md:w-full"}`}
                      >
                        <span className="rounded-full bg-accent px-2.5 py-0.5">Step {step.id}</span>
                      </div>
                      <h3 className="mt-3 text-2xl font-bold sm:text-3xl">{step.title}</h3>
                      <p className="mt-3 text-muted-foreground">{step.desc}</p>
                    </Reveal>
                  </div>
                  <div className="hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Pre-Evaluation CTA */}
        <div className="mt-24 rounded-3xl glass p-10 shadow-soft">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                Step 1
              </span>
              <h3 className="mt-2 text-3xl font-bold sm:text-4xl">Begin with the Pre-Test</h3>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                Before we dive in, answer a short Pre-Test so we can measure how much you'll grow
                through this learning session.
              </p>
            </div>
            <MagneticButton as="a" href="https://forms.gle/DcyKiAgZfFmZqwfdA">
              Take Pre-Test
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// What is IoTrack
// -----------------------------------------------------------------------------

function WhatIsIoTrack() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-7xl px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <BookOpen className="h-3.5 w-3.5" /> Step 2 · What is IoTrack?
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-5 text-4xl font-bold sm:text-5xl md:text-6xl">
                An IoT-powered <span className="text-gradient-brand">learning kit</span> built to
                teach by doing.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-lg text-muted-foreground">
                IoTrack combines a 4DOF (Four Degrees of Freedom) robotic arm with a companion
                learning website to help students see abstract IoT concepts come alive—from sensor
                readings to physical actuation.
              </p>
            </Reveal>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { t: "Overview", d: "A physical robotic arm paired with a guided web experience." },
                { t: "Objectives", d: "Bridge theory and practice in IoT and robotics education." },
                { t: "Purpose", d: "Make sensors, microcontrollers and automation tangible." },
                { t: "Benefits", d: "Boost engagement, retention and problem-solving skills." },
              ].map((c, i) => (
                <Reveal key={c.t} delay={0.3 + i * 0.08}>
                  <div className="group rounded-2xl glass p-5 transition-all hover:-translate-y-1 hover:shadow-glow">
                    <div className="text-sm font-semibold text-brand">{c.t}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.d}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="relative mx-auto max-w-lg animate-float-slow">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-cool opacity-20 blur-3xl" />
              <div className="relative rounded-[3rem] glass p-6 shadow-soft">
                <RoboticArm className="w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// IoT Concepts - interactive cards
// -----------------------------------------------------------------------------

const CONCEPTS = [
  {
    title: "Internet of Things",
    icon: Wifi,
    blurb: "A network of physical devices that sense, communicate and act.",
    detail:
      "IoT devices collect real-world data through sensors and exchange it over the internet, enabling automation and remote intelligence.",
  },
  {
    title: "Sensors",
    icon: Radar,
    blurb: "Devices that convert physical phenomena into digital signals.",
    detail:
      "IoTrack uses a color sensor that reads RGB values from a block's surface and reports them to the microcontroller.",
  },
  {
    title: "Microcontrollers",
    icon: Cpu,
    blurb: 'A compact, low-power "computer-on-a-chip" embedded inside devices.',
    detail:
      "The ESP32 is the brain of IoTrack — it reads the sensor, decides what to do, and drives the servos of the arm.",
  },
  {
    title: "Communication",
    icon: Radio,
    blurb:
      "How devices talk and execute tasks without human intervention to each other and to the cloud.",
    detail:
      "The ESP32 supports Wi-Fi and Bluetooth, allowing IoTrack to be monitored and updated wirelessly.",
  },
  {
    title: "Automation",
    icon: Cog,
    blurb: "Turning sensor data into physical action, hands-free.",
    detail:
      "When the sensor detects a color, the arm autonomously picks and places the block in its designated area.",
  },
  {
    title: "Robotics",
    icon: Bot,
    blurb: "Mechanical systems that perform tasks in the physical world.",
    detail:
      "IoTrack's arm uses servo motors and a gripper to demonstrate a real pick-and-place robotic workflow.",
  },
];

function IoTConcepts() {
  const [active, setActive] = useState<number | null>(null);
  return (
    <section className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-7xl px-8">
        <SectionHeader
          eyebrow="Step 3 · Core Concepts"
          title="The IoT ideas that power IoTrack"
          description="Tap any card to expand and learn how each concept comes to life inside the kit."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CONCEPTS.map((c, i) => {
            const Icon = c.icon;
            const open = active === i;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <motion.button
                  onClick={() => setActive(open ? null : i)}
                  layout
                  whileHover={{ y: -6 }}
                  className="group relative w-full overflow-hidden rounded-3xl glass p-6 text-left shadow-soft transition-all hover:shadow-glow"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-gradient-brand opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-40" />
                  <div className="relative flex items-start justify-between gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <motion.div animate={{ rotate: open ? 180 : 0 }}>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 rounded-2xl bg-accent/50 p-4 text-sm text-foreground/80">
                          {c.detail}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

const COMPONENTS = [
  {
    name: "ESP32",
    icon: Cpu,
    desc: "Wi-Fi + Bluetooth microcontroller — the brain.",
    func: "Reads sensor data and drives servo motors in real time.",
  },
  {
    name: "Servo Motors",
    icon: Cog,
    desc: "Precise angular motors for each joint.",
    func: "Move the base, elbow, wrist and gripper of the robotic arm.",
  },
  {
    name: "Color Sensor",
    icon: ScanLine,
    desc: "RGB color detector positioned above the pick area.",
    func: "Identifies each block's color to determine its destination.",
  },
  {
    name: "Power Supply",
    icon: Battery,
    desc: "Regulated 5V supply for stable operation.",
    func: "Feeds both the ESP32 and the servo motors safely.",
  },
  {
    name: "Breadboard",
    icon: CircuitBoard,
    desc: "Solderless prototyping platform or expansion board.",
    func: "Hosts the wiring between the ESP32, sensor and power rails.",
  },
  {
    name: "Jumper Wires",
    icon: Cable,
    desc: "Flexible connectors in multiple colors.",
    func: "Route signals and power between the components.",
  },
  {
    name: "4DOF Robot Arm Frame",
    icon: Bot,
    desc: "Rigid mechanical chassis with articulated joints.",
    func: "Provides the structure the servos and gripper attach to.",
  },
  {
    name: "Gripper",
    icon: Hand,
    desc: "Two-finger claw at the end of the arm.",
    func: "Grasps and releases the color-coded blocks.",
  },
];

function ComponentsSection() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-7xl px-8">
        <SectionHeader
          eyebrow="Step 4 · Components Used"
          title="The hardware behind the kit"
          description="Each part plays a specific role in turning IoT theory into a working robotic demonstration."
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COMPONENTS.map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -8, rotate: -0.5 }}
                  animate={{ y: [0, -4, 0] }}
                  transition={{ y: { duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" } }}
                  className="group relative h-full rounded-3xl glass p-6 shadow-soft transition-all hover:shadow-glow"
                >
                  <div className="mb-5 grid aspect-video place-items-center rounded-2xl bg-gradient-brand/10 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-brand opacity-10" />
                    <Icon className="relative h-14 w-14 text-brand" />
                  </div>
                  <h3 className="text-lg font-bold">{c.name}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{c.desc}</p>
                  <div className="mt-4 border-t border-border/50 pt-4">
                    <div className="text-xs font-semibold uppercase tracking-wider text-brand">
                      Function
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">{c.func}</p>
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// How the arm works - big animated process
// -----------------------------------------------------------------------------

const ARM_STEPS = [
  {
    t: "Initialize System",
    d: "Microcontroller boots and calibrates every servo to its 90-degree home position.",
    icon: Zap,
  },
  { t: "Detect Block", d: "The arm scans the pickup zone for a new block.", icon: Radar },
  {
    t: "Scan Block Color",
    d: "The color sensor reads the RGB values of the block's surface.",
    icon: ScanLine,
  },
  { t: "Process Detection", d: "The controller decides where this color should go.", icon: Cpu },
  { t: "Move Arm", d: "Servos rotate to align the gripper above the block.", icon: Move3d },
  {
    t: "Pick Block",
    d: "The gripper closes and lifts the block from the pickup area.",
    icon: Hand,
  },
  {
    t: "Rotate Arm",
    d: "The base rotates (DOF 1) toward the designated color area.",
    icon: RotateCw,
  },
  {
    t: "Move to Correct Area",
    d: "The shoulder (DOF 2) and elbow (DOF 3) extend to the correct drop zone.",
    icon: MapPin,
  },
  {
    t: "Release Block",
    d: "The gripper (DOF 4) opens and places the block precisely.",
    icon: CheckCircle2,
  },
  { t: "Return to Default Position", d: "The arm returns to its idle home pose.", icon: Bot },
  { t: "Ready for Next Block", d: "System waits for the next detection cycle.", icon: Sparkles },
];

function RoboticArmWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  return (
    <section id="robotic-arm" ref={ref} className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-7xl px-8">
        <SectionHeader
          eyebrow="Step 5 · The Main Event"
          title="How the robotic arm works"
          description="A cinematic breakdown of the full pick-and-place workflow — from boot to sort."
        />

        <div className="mt-20 grid gap-14 lg:grid-cols-[1fr_1.2fr] lg:items-start">
          {/* Sticky arm */}
          <div className="lg:sticky lg:top-28">
            <motion.div style={{ y }} className="relative mx-auto max-w-md">
              <div className="absolute inset-0 rounded-[3rem] bg-gradient-brand opacity-25 blur-3xl" />
              <div className="relative rounded-[3rem] glass p-6 shadow-glow">
                <RoboticArm className="w-full" />
                {/* Scan line */}
                <div className="pointer-events-none absolute inset-6 overflow-hidden rounded-[2.5rem]">
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-2 to-transparent animate-scan" />
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute left-6 top-0 h-full w-px bg-border" />
            <motion.div
              style={{
                height: useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), {
                  stiffness: 60,
                  damping: 20,
                }),
              }}
              className="absolute left-6 top-0 w-px bg-gradient-brand"
            />
            <div className="space-y-8">
              {ARM_STEPS.map((s, i) => {
                const Icon = s.icon;
                return (
                  <Reveal key={s.t} delay={i * 0.03} y={20}>
                    <div className="relative pl-16">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="absolute left-6 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow"
                      >
                        <Icon className="h-4 w-4" />
                      </motion.div>
                      <div className="rounded-2xl glass p-5 transition-all hover:shadow-glow">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-brand">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-xl font-bold">{s.t}</h3>
                        </div>
                        <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Assembly Guide
// -----------------------------------------------------------------------------

const ASSEMBLY = [
  {
    t: "Prepare Components",
    d: "Lay out every component (acrylic plates, 4 SG90 servos, screws) and check the parts list. Peel the protective film off the acrylic.",
    icon: Boxes,
  },
  {
    t: "Build Frame",
    d: "Assemble the base and the mechanical structural linkages of the 4DOF robotic arm.",
    icon: Wrench,
  },
  {
    t: "Attach Servo Motors",
    d: "Mount the 4 servos into each joint (Base, Shoulder, Elbow, Gripper) of the frame.",
    icon: Cog,
  },
  {
    t: "Install Microcontroller",
    d: "Secure the ESP32/Arduino microcontroller and sensor shield onto the base.",
    icon: Cpu,
  },
  { t: "Connect Sensor", d: "Wire the color sensor above the pickup area.", icon: ScanLine },
  {
    t: "Wire Components",
    d: "Route signal (PWM) and power wires from the servos to the expansion board.",
    icon: Cable,
  },
  {
    t: "Upload Program",
    d: "Flash the IoTrack firmware to the microcontroller.",
    icon: Zap,
  },
  { t: "Power On", d: "Apply regulated 5V power and verify LEDs light up.", icon: Battery },
  {
    t: "Test Robot",
    d: "Run the demonstration and observe the sort routine.",
    icon: Play,
  },
];

function AssemblyGuide() {
  return (
    <section id="assembly" className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-7xl px-8">
        <SectionHeader
          eyebrow="Step 6 · Assembly Guide"
          title="Build your IoTrack, step by step"
          description="A guided sequence you can follow at your own pace — each step reveals as you scroll."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ASSEMBLY.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.t} delay={i * 0.05} y={30}>
                <motion.div
                  whileHover={{ y: -6 }}
                  className="group relative h-full overflow-hidden rounded-3xl glass p-6 shadow-soft transition-all hover:shadow-glow"
                >
                  <div className="absolute right-4 top-4 text-6xl font-black text-foreground/5 transition-colors group-hover:text-brand/10">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-cool text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                  {i < ASSEMBLY.length - 1 && (
                    <motion.div
                      initial={{ x: 0 }}
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-brand"
                    >
                      Next step <ArrowRight className="h-3.5 w-3.5" />
                    </motion.div>
                  )}
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// User Manual accordion
// -----------------------------------------------------------------------------

function CodeClipboard() {
  const [copied, setCopied] = useState(false);
  const codeText = `#include <Servo.h>

// Define Servo Objects
Servo baseServo;
Servo shoulderServo;
Servo elbowServo;
Servo gripperServo;

// Pin Configurations
const int BASE_PIN = 3;
const int SHOULDER_PIN = 5;
const int ELBOW_PIN = 6;
const int GRIPPER_PIN = 9;

const int JOY_X1 = A0; // Base Control
const int JOY_Y1 = A1; // Shoulder Control

void setup() {
  // Attach servos to respective PWM pins
  baseServo.attach(BASE_PIN);
  shoulderServo.attach(SHOULDER_PIN);
  elbowServo.attach(ELBOW_PIN);
  gripperServo.attach(GRIPPER_PIN);

  // Calibration Safe-State: Force all servos to mid-points
  baseServo.write(90);
  shoulderServo.write(90);
  elbowServo.write(90);
  gripperServo.write(90);
  
  delay(2000); // Wait 2 seconds for mechanical alignment
}

void loop() {
  // Read joystick input values (0 to 1023)
  int valX = analogRead(JOY_X1);
  int valY = analogRead(JOY_Y1);

  // Map analog inputs to safe operating angles
  int targetBase = map(valX, 0, 1023, 10, 170);
  int targetShoulder = map(valY, 0, 1023, 30, 150);

  // Write smooth updates to actuators
  baseServo.write(targetBase);
  shoulderServo.write(targetShoulder);
  
  delay(20); // Frequency delay stabilizing the loop
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background/60 dark:bg-black/30 text-left font-mono shadow-soft">
      {/* Clipboard Header */}
      <div className="flex items-center justify-between border-b border-border/40 bg-background/80 dark:bg-black/20 px-5 py-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-brand" />
          <span>calibration.ino</span>
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-lg border border-border/40 bg-background/10 dark:bg-background/5 px-2.5 py-1 text-xs font-semibold text-muted-foreground transition-all hover:bg-background/20 dark:hover:bg-background/10 hover:text-foreground dark:hover:text-foreground active:scale-95 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto p-5 text-xs leading-relaxed text-zinc-800 dark:text-foreground/90 selection:bg-brand/30">
        <pre className="scrollbar-none">
          <code>
            <span className="text-purple-600 dark:text-brand">#include</span>{" "}
            <span className="text-emerald-600 dark:text-brand-2">&lt;Servo.h&gt;</span>
            {"\n\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">
              // Define Servo Objects
            </span>
            {"\n"}
            <span className="text-purple-600 dark:text-brand">Servo</span> baseServo;{"\n"}
            <span className="text-purple-600 dark:text-brand">Servo</span> shoulderServo;{"\n"}
            <span className="text-purple-600 dark:text-brand">Servo</span> elbowServo;{"\n"}
            <span className="text-purple-600 dark:text-brand">Servo</span> gripperServo;{"\n\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">// Pin Configurations</span>
            {"\n"}
            <span className="text-purple-600 dark:text-brand">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">int</span> BASE_PIN ={" "}
            <span className="text-amber-600 dark:text-cyan-400">3</span>;{"\n"}
            <span className="text-purple-600 dark:text-brand">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">int</span> SHOULDER_PIN ={" "}
            <span className="text-amber-600 dark:text-cyan-400">5</span>;{"\n"}
            <span className="text-purple-600 dark:text-brand">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">int</span> ELBOW_PIN ={" "}
            <span className="text-amber-600 dark:text-cyan-400">6</span>;{"\n"}
            <span className="text-purple-600 dark:text-brand">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">int</span> GRIPPER_PIN ={" "}
            <span className="text-amber-600 dark:text-cyan-400">9</span>;{"\n\n"}
            <span className="text-purple-600 dark:text-brand">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">int</span> JOY_X1 ={" "}
            <span className="text-amber-600 dark:text-cyan-400">A0</span>;{" "}
            <span className="text-zinc-500 dark:text-muted-foreground">// Base Control</span>
            {"\n"}
            <span className="text-purple-600 dark:text-brand">const</span>{" "}
            <span className="text-blue-600 dark:text-blue-400">int</span> JOY_Y1 ={" "}
            <span className="text-amber-600 dark:text-cyan-400">A1</span>;{" "}
            <span className="text-zinc-500 dark:text-muted-foreground">// Shoulder Control</span>
            {"\n\n"}
            <span className="text-blue-600 dark:text-blue-400">void</span>{" "}
            <span className="text-fuchsia-600 dark:text-purple-400 font-semibold">setup</span>()
            &#123;{"\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">
              {" "}
              // Attach servos to respective PWM pins
            </span>
            {"\n"}
            {"  "}baseServo.<span className="text-fuchsia-600 dark:text-purple-400">attach</span>
            (BASE_PIN);{"\n"}
            {"  "}shoulderServo.
            <span className="text-fuchsia-600 dark:text-purple-400">attach</span>(SHOULDER_PIN);
            {"\n"}
            {"  "}elbowServo.<span className="text-fuchsia-600 dark:text-purple-400">attach</span>
            (ELBOW_PIN);{"\n"}
            {"  "}gripperServo.<span className="text-fuchsia-600 dark:text-purple-400">attach</span>
            (GRIPPER_PIN);{"\n\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">
              {" "}
              // Calibration Safe-State: Force all servos to mid-points
            </span>
            {"\n"}
            {"  "}baseServo.<span className="text-fuchsia-600 dark:text-purple-400">write</span>(
            <span className="text-amber-600 dark:text-cyan-400">90</span>);{"\n"}
            {"  "}shoulderServo.<span className="text-fuchsia-600 dark:text-purple-400">write</span>
            (<span className="text-amber-600 dark:text-cyan-400">90</span>);{"\n"}
            {"  "}elbowServo.<span className="text-fuchsia-600 dark:text-purple-400">write</span>(
            <span className="text-amber-600 dark:text-cyan-400">90</span>);{"\n"}
            {"  "}gripperServo.<span className="text-fuchsia-600 dark:text-purple-400">write</span>(
            <span className="text-amber-600 dark:text-cyan-400">90</span>);{"\n\n"}
            {"  "}
            <span className="text-fuchsia-600 dark:text-purple-400">delay</span>(
            <span className="text-amber-600 dark:text-cyan-400">2000</span>);{" "}
            <span className="text-zinc-500 dark:text-muted-foreground">
              // Wait 2 seconds for mechanical alignment
            </span>
            {"\n"}
            &#125;{"\n\n"}
            <span className="text-blue-600 dark:text-blue-400">void</span>{" "}
            <span className="text-fuchsia-600 dark:text-purple-400 font-semibold">loop</span>()
            &#123;{"\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">
              {" "}
              // Read joystick input values (0 to 1023)
            </span>
            {"\n"}
            {"  "}
            <span className="text-blue-600 dark:text-blue-400">int</span> valX ={" "}
            <span className="text-fuchsia-600 dark:text-purple-400">analogRead</span>(JOY_X1);{"\n"}
            {"  "}
            <span className="text-blue-600 dark:text-blue-400">int</span> valY ={" "}
            <span className="text-fuchsia-600 dark:text-purple-400">analogRead</span>(JOY_Y1);
            {"\n\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">
              {" "}
              // Map analog inputs to safe operating angles
            </span>
            {"\n"}
            {"  "}
            <span className="text-blue-600 dark:text-blue-400">int</span> targetBase ={" "}
            <span className="text-fuchsia-600 dark:text-purple-400">map</span>(valX,{" "}
            <span className="text-amber-600 dark:text-cyan-400">0</span>,{" "}
            <span className="text-amber-600 dark:text-cyan-400">1023</span>,{" "}
            <span className="text-amber-600 dark:text-cyan-400">10</span>,{" "}
            <span className="text-amber-600 dark:text-cyan-400">170</span>);{"\n"}
            {"  "}
            <span className="text-blue-600 dark:text-blue-400">int</span> targetShoulder ={" "}
            <span className="text-fuchsia-600 dark:text-purple-400">map</span>(valY,{" "}
            <span className="text-amber-600 dark:text-cyan-400">0</span>,{" "}
            <span className="text-amber-600 dark:text-cyan-400">1023</span>,{" "}
            <span className="text-amber-600 dark:text-cyan-400">30</span>,{" "}
            <span className="text-amber-600 dark:text-cyan-400">150</span>);{"\n\n"}
            <span className="text-zinc-500 dark:text-muted-foreground">
              {" "}
              // Write smooth updates to actuators
            </span>
            {"\n"}
            {"  "}baseServo.<span className="text-fuchsia-600 dark:text-purple-400">write</span>
            (targetBase);{"\n"}
            {"  "}shoulderServo.<span className="text-fuchsia-600 dark:text-purple-400">write</span>
            (targetShoulder);{"\n\n"}
            {"  "}
            <span className="text-fuchsia-600 dark:text-purple-400">delay</span>(
            <span className="text-amber-600 dark:text-cyan-400">20</span>);{" "}
            <span className="text-zinc-500 dark:text-muted-foreground">
              // Frequency delay stabilizing the loop
            </span>
            {"\n"}
            &#125;
          </code>
        </pre>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// User Manual accordion
// -----------------------------------------------------------------------------

const MANUAL = [
  {
    t: "Getting Started",
    d: "Unbox the kit, verify components against the parts list, and place the arm on a stable surface with room to move.",
  },
  {
    t: "Powering On",
    d: "Always use the dedicated 5V external power supply. Do not rely solely on USB power, as 4 servos will draw too much current.",
  },
  {
    t: "Running Demonstration",
    d: "Boot the system and use the web dashboard or analog joysticks to control the X/Y axes of the arm.",
  },
  {
    t: "Sensor & Servo Calibration",
    d: "Crucial Step. You must electronically center all 4 servos to 90 degrees before screwing the acrylic pieces to them to prevent mechanical binding.",
  },
  {
    t: "Maintenance",
    d: "Check for loose nuts periodically due to mechanical vibrations. Do not force the joints by hand when powered off to protect the fragile nylon gears.",
  },
  {
    t: "Troubleshooting",
    d: "If the arm twitches, check your power supply. If a servo buzzes and gets hot, it is stalling; unplug immediately and recalibrate the center point.",
  },
  {
    t: "Safety",
    d: "Keep fingers clear of the pinch points in the parallel linkages and gripper gears during operation.",
  },
];

function UserManual() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="manual" className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-4xl px-8">
        <SectionHeader
          eyebrow="Step 7 · User Manual"
          title="Operating IoTrack"
          description="Everything you need to run, calibrate and take care of the kit."
        />
        <div className="mt-16 space-y-3">
          {MANUAL.map((m, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={m.t} delay={i * 0.04}>
                <motion.div layout className="overflow-hidden rounded-2xl glass shadow-soft">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="flex items-center gap-3">
                      <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <span className="text-lg font-semibold">{m.t}</span>
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-border/50 px-5 pb-5 pt-4 text-sm text-muted-foreground space-y-4">
                          <div>{m.d}</div>
                          {m.t.includes("Calibration") && (
                            <div className="mt-4 border-t border-border/30 pt-4">
                              <div className="mb-1 text-xs font-bold uppercase tracking-wider text-brand">
                                Initial Software Calibration Code
                              </div>
                              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                                This script centers and holds the servos for calibration and
                                establishes basic manual control.
                              </p>
                              <CodeClipboard />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// FAQs
// -----------------------------------------------------------------------------

const FAQS = [
  {
    q: "What is IoTrack?",
    a: "IoTrack is an IoT-powered educational kit that pairs a 4DOF robotic arm with a companion learning website to teach IoT and robotics concepts through hands-on demonstration.",
  },
  {
    q: "How does color detection work?",
    a: "An RGB sensor shines a white light on an object and measures the intensity of red, green, and blue light reflected back to determine the color.",
  },
  {
    q: "How does the 4DOF robotic arm move?",
    a: "It uses Pulse Width Modulation (PWM). The microcontroller sends electrical pulses to four separate servos: one rotates the base, one pitches the shoulder, one pitches the elbow, and one actuates the gripper.",
  },
  {
    q: "How does the microcontroller communicate?",
    a: "It utilizes built-in Wi-Fi to connect to a local network, allowing it to send telemetry data and receive movement commands via WebSockets or MQTT.",
  },
  {
    q: "How do I calibrate the servos?",
    a: 'Run the provided calibration script to lock all motors at exactly 90 degrees. Once locked, attach the acrylic horns so the arm sits in a perfect "L" shape.',
  },
  {
    q: "How do I maintain the robotic arm?",
    a: "Ensure the power supply is stable, never manually force the joints, and keep the pivot screws snug but not overly tight to allow smooth articulation.",
  },
];

function FAQs() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faqs" className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-4xl px-8">
        <SectionHeader
          eyebrow="Step 8 · FAQs"
          title="Frequently asked questions"
          description="Answers to the most common questions from students and instructors."
        />
        <div className="mt-16 space-y-3">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.04}>
                <motion.div layout className="overflow-hidden rounded-2xl glass shadow-soft">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-lg font-semibold">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      className="grid h-8 w-8 place-items-center rounded-full bg-accent"
                    >
                      <span className="text-xl leading-none">+</span>
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="border-t border-border/50 px-5 pb-5 pt-4 text-sm text-muted-foreground">
                          {f.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Demonstration Summary
// -----------------------------------------------------------------------------

const SUMMARY = [
  { t: "Robot Initializes", icon: Zap },
  { t: "Detects Block", icon: Radar },
  { t: "Reads Color", icon: ScanLine },
  { t: "Picks Object", icon: Hand },
  { t: "Moves Object", icon: Move3d },
  { t: "Drops Object", icon: MapPin },
  { t: "Ready Again", icon: Sparkles },
];

const TRIPLE_SUMMARY = [...SUMMARY, ...SUMMARY, ...SUMMARY];

function DemoSummary() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    const speed = 0.8; // scrolling speed (pixels per frame, slightly faster but readable)
    let isHovered = false;
    let scrollPos = el.scrollLeft;

    const tick = () => {
      if (!isHovered && el.scrollWidth > el.clientWidth) {
        const oneSetWidth = el.scrollWidth / 3;
        scrollPos = scrollPos + speed;

        if (scrollPos >= oneSetWidth) {
          scrollPos = scrollPos % oneSetWidth;
        }

        el.scrollLeft = Math.round(scrollPos);
      } else {
        // Keep scrollPos synchronized if user manually scrolls/drags
        const oneSetWidth = el.scrollWidth / 3;
        scrollPos = el.scrollLeft % oneSetWidth;
      }
      animId = requestAnimationFrame(tick);
    };

    const handleMouseEnter = () => {
      isHovered = true;
    };
    const handleMouseLeave = () => {
      isHovered = false;
    };

    el.addEventListener("mouseenter", handleMouseEnter);
    el.addEventListener("mouseleave", handleMouseLeave);

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section id="demo" className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-6xl px-8">
        <SectionHeader
          eyebrow="Step 9 · Demonstration Summary"
          title="The complete pick-and-sort loop"
          description="A recap of the routine you just watched — one continuous animated flow."
        />
        <div
          ref={scrollRef}
          className="scrollbar-none md:mask-fade-edges mt-20 flex flex-col items-stretch gap-4 py-8 md:flex-row md:items-center md:overflow-x-auto"
          style={{ scrollBehavior: "auto" }}
        >
          {TRIPLE_SUMMARY.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`flex shrink-0 flex-col items-center gap-4 md:flex-row ${
                  i >= SUMMARY.length ? "hidden md:flex" : ""
                }`}
              >
                <Reveal delay={(i % SUMMARY.length) * 0.1} y={20} className="shrink-0">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.05 }}
                    className="flex w-52 flex-col items-center gap-3 rounded-2xl glass p-5 text-center shadow-soft transition-all hover:shadow-glow"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold">{s.t}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {String((i % SUMMARY.length) + 1).padStart(2, "0")}
                    </div>
                  </motion.div>
                </Reveal>
                {i < TRIPLE_SUMMARY.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % SUMMARY.length) * 0.1 + 0.2 }}
                    className="hidden shrink-0 text-muted-foreground md:block"
                  >
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      <ArrowRight className="h-5 w-5" />
                    </motion.div>
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Robotic Arm Simulator (Step 9 Subsection)
// -----------------------------------------------------------------------------

function RoboticArmSimulator() {
  const [baseRotation, setBaseRotation] = useState(90);
  const [shoulderAngle, setShoulderAngle] = useState(45);
  const [elbowAngle, setElbowAngle] = useState(90);
  const [gripperClaws, setGripperClaws] = useState(50);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  // Kinematic parameters (Link lengths in cm)
  const l1_cm = 15.0;
  const l2_cm = 12.0;
  const l3_cm = 3.0; // claw length
  const base_h_cm = 5.0;

  const radShoulder = (shoulderAngle * Math.PI) / 180;
  const globalForearmAngle = shoulderAngle + elbowAngle - 90;
  const radForearm = (globalForearmAngle * Math.PI) / 180;
  const radBase = (baseRotation * Math.PI) / 180;

  // Forward Kinematics Telemetry
  const R = l1_cm * Math.cos(radShoulder) + (l2_cm + l3_cm) * Math.cos(radForearm);
  const Z = l1_cm * Math.sin(radShoulder) + (l2_cm + l3_cm) * Math.sin(radForearm) + base_h_cm;
  const X = R * Math.cos(radBase);
  const Y = R * Math.sin(radBase);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw engineering grid background (no shadow)
    ctx.save();
    ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.04)";
    ctx.lineWidth = 1;
    const gridSize = 25;
    for (let x = 0; x < canvas.width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }
    ctx.restore();

    // Kinematic pixel parameters for side-profile view (matching riser alignment)
    const x0 = canvas.width / 2;
    const y0 = canvas.height - 75; // Top surface of base where shoulder pivots

    const L1_px = 100;
    const L2_px = 80;

    // Joint positions
    const x1 = x0;
    const y1 = y0; // Shoulder joint
    const x2 = x1 + L1_px * Math.cos(radShoulder);
    const y2 = y1 - L1_px * Math.sin(radShoulder); // Elbow joint
    const x3 = x2 + L2_px * Math.cos(radForearm);
    const y3 = y2 - L2_px * Math.sin(radForearm); // Wrist joint

    // Draw coordinate axis in bottom-left corner (no shadow)
    ctx.save();
    ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, canvas.height - 40);
    ctx.lineTo(70, canvas.height - 40);
    ctx.lineTo(65, canvas.height - 43);
    ctx.moveTo(70, canvas.height - 40);
    ctx.lineTo(65, canvas.height - 37);
    ctx.moveTo(40, canvas.height - 40);
    ctx.lineTo(40, canvas.height - 70);
    ctx.lineTo(37, canvas.height - 65);
    ctx.moveTo(40, canvas.height - 70);
    ctx.lineTo(43, canvas.height - 65);
    ctx.stroke();

    ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.5)";
    ctx.font = "10px monospace";
    ctx.fillText("X", 75, canvas.height - 37);
    ctx.fillText("Z", 37, canvas.height - 75);
    ctx.restore();

    // Enable soft drop-shadow styling for physical arm components
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.shadowOffsetX = 0;

    // 1. Draw Base Shadow Ellipse
    ctx.fillStyle = "oklch(0.55 0.02 260 / 0.25)";
    ctx.beginPath();
    ctx.ellipse(x0, y0 + 55, 110, 14, 0, 0, 2 * Math.PI);
    ctx.fill();

    // 2. Draw Main Base Rect (gradient matching armGrad2: blue-to-purple)
    const baseGrad1 = ctx.createLinearGradient(x0 - 70, y0 + 15, x0 + 70, y0 + 45);
    baseGrad1.addColorStop(0, "oklch(0.72 0.18 190)");
    baseGrad1.addColorStop(1, "oklch(0.6 0.22 265)");
    ctx.fillStyle = baseGrad1;
    ctx.beginPath();
    ctx.roundRect(x0 - 70, y0 + 15, 140, 30, 10);
    ctx.fill();

    // 3. Draw Base Riser Rect (gradient matching armGrad: fuchsia-to-violet)
    const baseGrad2 = ctx.createLinearGradient(x0 - 50, y0, x0 + 50, y0 + 20);
    baseGrad2.addColorStop(0, "oklch(0.72 0.18 265)");
    baseGrad2.addColorStop(1, "oklch(0.7 0.2 320)");
    ctx.fillStyle = baseGrad2;
    ctx.beginPath();
    ctx.roundRect(x0 - 50, y0, 100, 20, 6);
    ctx.fill();
    ctx.restore();

    // 4. Draw Base Rotation Indicator Gauge (no shadow)
    ctx.save();
    ctx.strokeStyle = isDark ? "rgba(236, 72, 153, 0.4)" : "rgba(236, 72, 153, 0.6)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x0, y0 + 30, 18, Math.PI, 0);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(x0, y0 + 30);
    ctx.lineTo(x0 + 18 * Math.cos(radBase), y0 + 30 - 18 * Math.sin(radBase));
    ctx.stroke();
    ctx.restore();

    // Apply drop shadows for links & components
    ctx.save();
    ctx.shadowColor = "rgba(0, 0, 0, 0.25)";
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.shadowOffsetX = 0;

    // 5. Draw Link 1 (Shoulder to Elbow) using fuchsia/violet linear gradient (armGrad)
    const linkGrad1 = ctx.createLinearGradient(x1, y1, x2, y2);
    linkGrad1.addColorStop(0, "oklch(0.72 0.18 265)");
    linkGrad1.addColorStop(1, "oklch(0.7 0.2 320)");
    ctx.strokeStyle = linkGrad1;
    ctx.lineWidth = 20; // Thick premium physical link
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // 6. Draw Link 2 (Elbow to Wrist) using blue/purple linear gradient (armGrad2)
    const linkGrad2 = ctx.createLinearGradient(x2, y2, x3, y3);
    linkGrad2.addColorStop(0, "oklch(0.72 0.18 190)");
    linkGrad2.addColorStop(1, "oklch(0.6 0.22 265)");
    ctx.strokeStyle = linkGrad2;
    ctx.lineWidth = 16;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.stroke();

    // 7. Draw Wrist + Gripper Head (gradient matching armGrad, and rotated claws)
    ctx.save();
    ctx.translate(x3, y3);
    ctx.rotate((-globalForearmAngle * Math.PI) / 180);

    // Gripper head block
    const gripHeadGrad = ctx.createLinearGradient(-8, -17, 12, 17);
    gripHeadGrad.addColorStop(0, "oklch(0.72 0.18 265)");
    gripHeadGrad.addColorStop(1, "oklch(0.7 0.2 320)");
    ctx.fillStyle = gripHeadGrad;
    ctx.beginPath();
    ctx.roundRect(-8, -17, 20, 34, 6);
    ctx.fill();

    // Decorative gripper circles
    ctx.fillStyle = "oklch(0.98 0 0)";
    ctx.beginPath();
    ctx.arc(2, 0, 5, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "oklch(0.6 0.22 265)";
    ctx.beginPath();
    ctx.arc(2, 0, 2.5, 0, 2 * Math.PI);
    ctx.fill();

    // Gripper claws responsive slider values mapping
    const gripperRatio = gripperClaws / 100;
    const clawOffset = 5 * gripperRatio;
    ctx.fillStyle = "oklch(0.3 0.03 260)";

    // Top claw
    ctx.beginPath();
    ctx.roundRect(12, -16 + clawOffset, 14, 6, 1.5);
    ctx.fill();

    // Bottom claw
    ctx.beginPath();
    ctx.roundRect(12, 10 - clawOffset, 14, 6, 1.5);
    ctx.fill();
    ctx.restore();

    // 8. Draw Joint Center Caps (drawn on top of links to cover junctions)
    // Shoulder joint cap
    ctx.fillStyle = "oklch(0.2 0.03 260)";
    ctx.beginPath();
    ctx.arc(x1, y1, 14, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "oklch(0.72 0.18 265)";
    ctx.beginPath();
    ctx.arc(x1, y1, 6, 0, 2 * Math.PI);
    ctx.fill();

    // Elbow joint cap
    ctx.fillStyle = "oklch(0.2 0.03 260)";
    ctx.beginPath();
    ctx.arc(x2, y2, 11, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = "oklch(0.72 0.18 190)";
    ctx.beginPath();
    ctx.arc(x2, y2, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();

    // Draw Joint text labels (no shadow)
    ctx.save();
    ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.6)";
    ctx.font = "9px monospace";
    ctx.fillText("Base", x0 - 80, y0 + 35);
    ctx.fillText("Shoulder", x1 + 18, y1 + 3);
    ctx.fillText("Elbow", x2 + 15, y2 + 3);
    ctx.fillText("Gripper", x3 + 18, y3 - 10);
    ctx.restore();
  }, [
    baseRotation,
    shoulderAngle,
    elbowAngle,
    gripperClaws,
    radBase,
    radForearm,
    radShoulder,
    isDark,
  ]);

  return (
    <section
      id="simulator"
      className="relative overflow-hidden border-t border-border/50 py-24 bg-background/5"
    >
      <BlobsBackground />
      <div className="relative mx-auto max-w-5xl px-8">
        <SectionHeader
          eyebrow="Interactive Simulation"
          title="Robotic Arm Kinematics Simulator"
          description="An educational workspace demonstrating real-time coordinate calculation. Adjust the joint angles below to simulate side-profile kinematics."
        />

        <div className="mt-16 rounded-3xl glass p-8 shadow-soft flex flex-col items-center">
          {/* Canvas Viewport */}
          <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-background/50 dark:bg-black/40 p-4 shadow-soft flex flex-col items-center w-full max-w-lg">
            <div className="absolute top-2 left-3 text-[9px] font-mono uppercase tracking-wider text-muted-foreground/60"></div>
            <canvas
              ref={canvasRef}
              width={500}
              height={350}
              className="w-full aspect-[500/350] bg-black/5 dark:bg-black/50 border border-border/10 rounded-xl mt-3"
            />

            {/* Live Telemetry Display */}
            <div className="mt-6 w-full grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-border/20 pt-4 text-center">
              <div className="rounded-xl bg-background/50 dark:bg-background/10 p-2 border border-border/20">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  X Position
                </div>
                <div className="mt-1 text-sm font-bold text-gradient-brand">{X.toFixed(1)} cm</div>
              </div>
              <div className="rounded-xl bg-background/50 dark:bg-background/10 p-2 border border-border/20">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Y Position
                </div>
                <div className="mt-1 text-sm font-bold text-gradient-brand">{Y.toFixed(1)} cm</div>
              </div>
              <div className="rounded-xl bg-background/50 dark:bg-background/10 p-2 border border-border/20">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Z Position
                </div>
                <div className="mt-1 text-sm font-bold text-gradient-brand">{Z.toFixed(1)} cm</div>
              </div>
              <div className="rounded-xl bg-background/50 dark:bg-background/10 p-2 border border-border/20">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Gripper
                </div>
                <div className="mt-1 text-sm font-bold text-pink-400">{gripperClaws}%</div>
              </div>
            </div>
          </div>

          {/* Controls Below Visualization Workspace */}
          <div className="mt-10 w-full max-w-2xl grid gap-6 sm:grid-cols-2">
            {/* Slider 1: Base */}
            <div className="flex flex-col gap-2 rounded-2xl bg-background/60 dark:bg-background/20 p-4 border border-border/20 shadow-soft">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Base Rotation</span>
                <span className="text-brand font-mono">{baseRotation}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="180"
                value={baseRotation}
                onChange={(e) => setBaseRotation(Number(e.target.value))}
                className="w-full h-1.5 rounded bg-border accent-brand cursor-pointer mt-1"
              />
            </div>

            {/* Slider 2: Shoulder */}
            <div className="flex flex-col gap-2 rounded-2xl bg-background/60 dark:bg-background/20 p-4 border border-border/20 shadow-soft">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Shoulder Angle</span>
                <span className="text-brand font-mono">{shoulderAngle}°</span>
              </div>
              <input
                type="range"
                min="15"
                max="165"
                value={shoulderAngle}
                onChange={(e) => setShoulderAngle(Number(e.target.value))}
                className="w-full h-1.5 rounded bg-border accent-brand cursor-pointer mt-1"
              />
            </div>

            {/* Slider 3: Elbow */}
            <div className="flex flex-col gap-2 rounded-2xl bg-background/60 dark:bg-background/20 p-4 border border-border/20 shadow-soft">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Elbow Angle</span>
                <span className="text-brand font-mono">{elbowAngle}°</span>
              </div>
              <input
                type="range"
                min="15"
                max="165"
                value={elbowAngle}
                onChange={(e) => setElbowAngle(Number(e.target.value))}
                className="w-full h-1.5 rounded bg-border accent-brand cursor-pointer mt-1"
              />
            </div>

            {/* Slider 4: Gripper */}
            <div className="flex flex-col gap-2 rounded-2xl bg-background/60 dark:bg-background/20 p-4 border border-border/20 shadow-soft">
              <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-foreground/80">
                <span>Gripper Claws</span>
                <span className="text-brand font-mono">{gripperClaws}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={gripperClaws}
                onChange={(e) => setGripperClaws(Number(e.target.value))}
                className="w-full h-1.5 rounded bg-border accent-brand cursor-pointer mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Post-Evaluation
// -----------------------------------------------------------------------------

function PostEvaluation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-200px" });
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => {
      const end = Date.now() + 1200;
      const colors = ["#7c3aed", "#22d3ee", "#f472b6", "#facc15"];
      (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
      })();
    }, 400);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section id="evaluation" ref={ref} className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-hero" />
      <FloatingParticles count={30} />
      <BlobsBackground />
      <div className="relative mx-auto max-w-4xl px-8 text-center">
        <Reveal>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-brand text-primary-foreground shadow-glow">
            <Trophy className="h-9 w-9" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 text-5xl font-bold sm:text-6xl md:text-7xl">
            <span className="text-gradient-brand">Congratulations!</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            You have completed the IoTrack Learning Session. Please answer the Post-Test and
            Evaluation Form so we can measure your growth and improve the kit.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton as="a" href="https://forms.gle/hQo4p9bneBuRinpq6">
              Take Post-Test Assessment
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() =>
                document.getElementById("home")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Back to Top
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Footer
// -----------------------------------------------------------------------------

function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/50 py-12 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Brand & Affiliation */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-2.5 font-bold text-xl">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand text-primary-foreground shadow-glow">
                <Bot className="h-5.5 w-5.5" />
              </span>
              <span className="text-gradient-brand">IoTrack</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              An integrated, IoT-based educational learning kit combining a physical 4DOF robotic
              arm with a companion learning website. Developed for Mapúa University Makati.
            </p>
            <div className="flex gap-4 pt-1">
              <a
                href="mailto:iotrack@university.edu"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-brand" />
                <span>iotrack@university.edu</span>
              </a>
              <a
                href="https://github.com/iotrack"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-brand transition-colors"
              >
                <Github className="h-3.5 w-3.5 text-brand" />
                <span>github.com/iotrack</span>
              </a>
            </div>
          </div>

          {/* Thesis Members */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground/75">
              Thesis Group Members
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground md:flex-col md:gap-2">
              <span>Selene Angel G. Aguilar</span>
              <span>Julia Venice B. Fulgar</span>
              <span>Emmanuel Josh M. Pabillo</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-foreground/75">
              Quick Links
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-muted-foreground md:flex-col md:gap-2">
              <button
                onClick={() =>
                  document.getElementById("journey")?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-brand transition-colors text-left cursor-pointer"
              >
                Learning Journey
              </button>
              <button
                onClick={() =>
                  document.getElementById("assembly")?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-brand transition-colors text-left cursor-pointer"
              >
                Assembly Guide
              </button>
              <button
                onClick={() =>
                  document.getElementById("manual")?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-brand transition-colors text-left cursor-pointer"
              >
                User Manual
              </button>
              <button
                onClick={() =>
                  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })
                }
                className="hover:text-brand transition-colors text-left cursor-pointer"
              >
                Robotic Simulator
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/20 pt-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} IoTrack. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors">
              Documentation
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// Scroll progress
// -----------------------------------------------------------------------------

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const width = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      style={{ scaleX: width, transformOrigin: "0% 50%" }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-gradient-brand"
    />
  );
}

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

function IoTrackPage() {
  return (
    <div className="relative">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <LearningJourney />
        <WhatIsIoTrack />
        <IoTConcepts />
        <ComponentsSection />
        <RoboticArmWorkflow />
        <AssemblyGuide />
        <UserManual />
        <FAQs />
        <DemoSummary />
        <RoboticArmSimulator />
        <PostEvaluation />
      </main>
      <Footer />
      {/* Silence unused warning for design-system Button import */}
      <span className="hidden">
        <Button>_</Button>
      </span>
    </div>
  );
}
