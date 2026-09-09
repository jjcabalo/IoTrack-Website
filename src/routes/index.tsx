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
  FileText,
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
  { id: "curriculum", label: "Curriculum" },
  { id: "learn", label: "What You'll Learn" },
  { id: "faqs", label: "FAQs" },
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
                as="a"
                href="https://iotrack-learning-kit.vercel.app"
              >
                Take Course
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>
              <MagneticButton
                variant="ghost"
                onClick={() =>
                  document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="h-4 w-4" />
                Your Learning Journey
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
// What You Will Learn
// -----------------------------------------------------------------------------

function WhatYouWillLearn() {
  return (
    <section id="learn" className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-7xl px-8">
        <SectionHeader
          eyebrow="Course Overview"
          title="What you will master"
          description="A hands-on approach to modern IoT and robotics."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { title: "IoT Fundamentals", icon: Wifi, blurb: "Understand how devices collect data, communicate, and act autonomously." },
            { title: "Robotic Arm Kinematics", icon: Bot, blurb: "Learn how base, shoulder, elbow, and wrist joints work together." },
            { title: "Sensor Data Processing", icon: ScanLine, blurb: "Read and interpret raw RGB values from an optical color sensor." },
            { title: "Automated Workflows", icon: Cog, blurb: "Program complete pick-and-place routines and logic loops." },
            { title: "Hardware Integration", icon: CircuitBoard, blurb: "Safely bridge microcontrollers, servo motors, and power supplies." },
            { title: "C++ & Microcontrollers", icon: Cpu, blurb: "Write and upload firmware to the ESP32 brain." },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={i * 0.06}>
                <div className="group relative w-full overflow-hidden rounded-3xl glass p-6 text-left shadow-soft transition-all hover:shadow-glow">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{c.blurb}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Course Curriculum
// -----------------------------------------------------------------------------

const CURRICULUM = [
  { id: 'pretest', num: 'Assessment', title: 'Course Pre-Test', desc: 'Establish your baseline understanding.', icon: FileText },
  { id: 1, title: 'IoTrack Introduction', desc: 'What is IoTrack, IoT, and the hardware behind the kit.', icon: BookOpen },
  { id: 2, title: 'Robot Arm Control', desc: 'How the robotic arm works, prerequisite activities, and movement.', icon: Move3d },
  { id: 3, title: 'Sensors & Data', desc: 'How the RGB sensors work and how to read raw sensor data.', icon: Radar },
  { id: 4, title: 'Color Detection', desc: 'Interactive demos and logic for detecting colors.', icon: ScanLine },
  { id: 5, title: 'Stacking', desc: 'Coordinate-based open-loop stacking routines.', icon: Boxes },
  { id: 6, title: 'Pick Up Blocks', desc: 'Full automated pick and place workflows.', icon: Hand },
  { id: 'posttest', num: 'Assessment', title: 'Course Post-Test', desc: 'Measure what you have learned.', icon: Trophy },
];

function CourseCurriculum() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineH = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 60, damping: 20 });
  return (
    <section id="curriculum" className="relative overflow-hidden py-32">
      <div className="relative mx-auto max-w-6xl px-8">
        <SectionHeader eyebrow="Course Curriculum" title="Your learning journey" description="Step-by-step interactive modules from basics to advanced robotics programming." />
        <div ref={ref} className="relative mt-24">
          <div className="absolute left-6 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <motion.div style={{ height: lineH }} className="absolute left-6 top-0 w-px bg-gradient-brand md:left-1/2 md:-translate-x-1/2" />
          <div className="space-y-16">
            {CURRICULUM.map((step, i) => {
              const Icon = step.icon;
              const isRight = i % 2 === 1;
              return (
                <div key={step.id} className="relative grid grid-cols-1 items-center gap-6 md:grid-cols-2">
                  <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", stiffness: 200, damping: 15 }} className="absolute left-6 z-10 grid h-12 w-12 -translate-x-1/2 place-items-center rounded-full bg-gradient-brand text-primary-foreground shadow-glow md:left-1/2">
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <div className={`pl-16 md:pl-0 ${isRight ? "md:col-start-2 md:pl-16" : "md:pr-16 md:text-right"}`}>
                    <Reveal y={20}>
                      <div className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${isRight ? "" : "md:justify-end md:w-full"}`}>
                        <span className="rounded-full bg-accent px-2.5 py-0.5">{step.num || `Module ${step.id}`}</span>
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
    q: "How does the stacking function work without color sensors?",
    a: "Stacking operates open-loop using precise coordinate sequences. The microcontroller runs a timed step-by-step routine with pre-calculated servo angles for picking up blocks at base angle 170° and placing them in stacks at 73° and 55°.",
  },
  {
    q: "How does the arm adjust for the height of stacked blocks?",
    a: "For each layer in the stack (levels 1, 2, and 3), the shoulder and elbow servos are programmed with specific angular values to compensate for the height of the previously placed blocks, ensuring the gripper releases each block precisely.",
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
          eyebrow="Course FAQs"
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

const STACKING_SUMMARY = [
  { t: "Robot Initializes", icon: Zap },
  { t: "Move to Pickup Zone", icon: Move3d },
  { t: "Grip Block", icon: Hand },
  { t: "Lift Block", icon: RotateCw },
  { t: "Rotate to Stack", icon: MapPin },
  { t: "Release Object", icon: CheckCircle2 },
  { t: "Return to Home", icon: Bot },
];

function DemoSummary() {
  const [activeArmMode, setActiveArmMode] = useState<'sorting' | 'stacking'>('sorting');
  const scrollRef = useRef<HTMLDivElement>(null);

  const currentSummary = activeArmMode === "sorting" ? SUMMARY : STACKING_SUMMARY;
  const tripleSummary = [...currentSummary, ...currentSummary, ...currentSummary];

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
  }, [activeArmMode]);

  return (
    <section id="demo" className="relative overflow-hidden py-32">
      <BlobsBackground />
      <div className="relative mx-auto max-w-6xl px-8">
        <SectionHeader
          eyebrow="Step 9 · Demonstration Summary"
          title="The complete loop"
          description="A recap of the active program routine — one continuous automated flow."
        />

        {/* Dynamic Mode Switcher */}
        <div className="mt-10 flex justify-center">
          <div className="relative flex rounded-full glass p-1.5 shadow-soft">
            <button
              onClick={() => setActiveArmMode("sorting")}
              className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeArmMode === "sorting"
                  ? "text-primary-foreground bg-gradient-brand shadow-glow font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Color Sorting Demo
            </button>
            <button
              onClick={() => setActiveArmMode("stacking")}
              className={`relative z-10 rounded-full px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer ${
                activeArmMode === "stacking"
                  ? "text-primary-foreground bg-gradient-brand shadow-glow font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Stacking Demo
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-none md:mask-fade-edges mt-10 flex flex-col items-stretch gap-4 py-16 md:flex-row md:items-center md:overflow-x-auto"
          style={{ scrollBehavior: "auto" }}
        >
          {tripleSummary.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`flex shrink-0 flex-col items-center gap-4 md:flex-row ${
                  i >= currentSummary.length ? "hidden md:flex" : ""
                }`}
              >
                <Reveal delay={(i % currentSummary.length) * 0.1} y={20} className="shrink-0">
                  <motion.div
                    whileHover={{ y: -6, scale: 1.05 }}
                    className="flex w-52 flex-col items-center gap-3 rounded-2xl glass p-5 text-center shadow-soft transition-all hover:shadow-glow"
                  >
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-brand text-primary-foreground shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="text-sm font-semibold">{s.t}</div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {String((i % currentSummary.length) + 1).padStart(2, "0")}
                    </div>
                  </motion.div>
                </Reveal>
                {i < tripleSummary.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % currentSummary.length) * 0.1 + 0.2 }}
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
// Enroll Now CTA
// -----------------------------------------------------------------------------

function EnrollNow() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-0 bg-gradient-hero" />
      <FloatingParticles count={30} />
      <BlobsBackground />
      <div className="relative mx-auto max-w-4xl px-8 text-center">
        <Reveal>
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-3xl bg-gradient-brand text-primary-foreground shadow-glow">
            <GraduationCap className="h-9 w-9" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 text-5xl font-bold sm:text-6xl md:text-7xl">
            Ready to <span className="text-gradient-brand">start learning?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Jump right in. No installations, no setup. Access the full IoTrack course and interactive simulators immediately.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton as="a" href="https://iotrack-learning-kit.vercel.app">
              Start the Course
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
                  document.getElementById("curriculum")?.scrollIntoView({ behavior: "smooth" })
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
        <CourseCurriculum />
        <WhatYouWillLearn />
        <FAQs />
        <EnrollNow />
      </main>
      <Footer />
      {/* Silence unused warning for design-system Button import */}
      <span className="hidden">
        <Button>_</Button>
      </span>
    </div>
  );
}
