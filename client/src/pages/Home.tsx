import { useState, useEffect } from "react";
import {
  ArrowRight,
  Code2,
  Star,
  MessageSquare,
  ThumbsUp,
  Search,
  Layers,
  Zap,
  Globe,
  ChevronRight,
  Terminal,
  GitBranch,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const GRID_COLS = 12;
const GRID_ROWS = 8;

function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.04] dark:opacity-[0.06]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Radial fade overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white dark:to-black opacity-80" />
    </div>
  );
}

function GlowOrb({
  className,
  size = 400,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl opacity-10 dark:opacity-[0.07] pointer-events-none ${className}`}
      style={{ width: size, height: size }}
    />
  );
}

const projects = [
  {
    name: "NeuralKit",
    tag: "AI/ML",
    stars: 284,
    comments: 43,
    likes: 512,
    icon: <Zap size={14} />,
    gradient: "from-neutral-100 to-neutral-50 dark:from-neutral-800/60 dark:to-neutral-900/60",
  },
  {
    name: "FlowState",
    tag: "Productivity",
    stars: 176,
    comments: 28,
    likes: 341,
    icon: <GitBranch size={14} />,
    gradient: "from-neutral-100 to-neutral-50 dark:from-neutral-800/60 dark:to-neutral-900/60",
  },
  {
    name: "StackTrace",
    tag: "DevTools",
    stars: 412,
    comments: 67,
    likes: 891,
    icon: <Terminal size={14} />,
    gradient: "from-neutral-100 to-neutral-50 dark:from-neutral-800/60 dark:to-neutral-900/60",
  },
  {
    name: "PackMan",
    tag: "CLI",
    stars: 93,
    comments: 15,
    likes: 208,
    icon: <Package size={14} />,
    gradient: "from-neutral-100 to-neutral-50 dark:from-neutral-800/60 dark:to-neutral-900/60",
  },
];

function ProjectCard({ project, delay = 0 }: { project: typeof projects[0]; delay?: number }) {
  return (
    <div
      className="group relative rounded-xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br p-4 transition-all duration-300 hover:border-neutral-400 dark:hover:border-neutral-600 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/30 cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both" }}
    >
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${project.gradient} -z-10`} />

      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-black dark:bg-white flex items-center justify-center text-white dark:text-black">
            {project.icon}
          </div>
          <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
            {project.name}
          </span>
        </div>
        <Badge
          variant="outline"
          className="text-[10px] px-1.5 py-0 h-5 border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400"
        >
          {project.tag}
        </Badge>
      </div>

      {/* Mini preview bar */}
      <div className="h-1.5 rounded-full bg-neutral-200 dark:bg-neutral-700 mb-3 overflow-hidden">
        <div
          className="h-full bg-black dark:bg-white rounded-full transition-all duration-700 group-hover:w-full"
          style={{ width: `${(project.stars / 500) * 100}%` }}
        />
      </div>

      <div className="flex items-center gap-3 text-[11px] text-neutral-500 dark:text-neutral-400">
        <span className="flex items-center gap-1">
          <Star size={10} className="fill-current" />
          {project.stars}
        </span>
        <span className="flex items-center gap-1">
          <ThumbsUp size={10} />
          {project.likes}
        </span>
        <span className="flex items-center gap-1">
          <MessageSquare size={10} />
          {project.comments}
        </span>
      </div>
    </div>
  );
}

const features = [
  {
    icon: <Layers size={18} />,
    title: "Portfolio Space",
    desc: "Clean, structured profiles built for developers to display their best work.",
  },
  {
    icon: <Star size={18} />,
    title: "Ratings & Feedback",
    desc: "Collect likes, ratings, and comments from the community to refine your projects.",
  },
  {
    icon: <Search size={18} />,
    title: "Discovery Engine",
    desc: "Powerful search and filters to help great projects get found.",
  },
  {
    icon: <Globe size={18} />,
    title: "Community Reach",
    desc: "Connect with developers, get visibility, and grow your presence in tech.",
  },
];

export default function DevDockHome() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 overflow-hidden font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300&family=DM+Mono:wght@400;500&display=swap');
        
        * { font-family: 'DM Sans', sans-serif; }
        .font-mono-custom { font-family: 'DM Mono', monospace; }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease forwards; }
        .animate-fade-in { animation: fade-in 0.8s ease forwards; }
        .animate-float { animation: float 4s ease-in-out infinite; }

        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, transparent 0%, transparent 40%, var(--tw-gradient-to) 100%);
        }
        
        .grid-dots {
          background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .border-gradient {
          border-image: linear-gradient(135deg, transparent, rgba(0,0,0,0.08), transparent) 1;
        }
      `}</style>

      {/* ── HERO SECTION ─────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center">
        <GridBackground />
        <GlowOrb className="bg-neutral-400 dark:bg-neutral-500 -top-20 -left-20" size={500} />
        <GlowOrb className="bg-neutral-300 dark:bg-neutral-600 -bottom-20 -right-20" size={400} />

        {/* Square grid overlay — upper half premium accent */}
        <div className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden pointer-events-none">
          <div className="absolute inset-0 grid-dots text-neutral-400 dark:text-neutral-600 opacity-20 dark:opacity-10" />
          {/* Fade bottom of grid */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-black to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          {/* Pill badge */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-4 py-1.5 mb-8 animate-fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono-custom text-xs text-neutral-500 dark:text-neutral-400 tracking-wide">
              v1.0 — Now in public beta
            </span>
          </div>

          {/* Main heading */}
          <h1
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            Your projects.{" "}
            <span className="relative inline-block">
              <span className="relative z-10">Amplified.</span>
              <span className="absolute inset-x-0 bottom-1 h-3 bg-neutral-100 dark:bg-neutral-800 -z-0 rounded" />
            </span>
          </h1>

          {/* Sub */}
          <p
            className="text-lg md:text-xl text-neutral-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up font-light"
            style={{ animationDelay: "160ms" }}
          >
            DevDock is the developer portfolio platform where code meets community — showcase demos, collect real feedback, and get discovered by the tech world.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "240ms" }}
          >
            <Button
              size="lg"
              className="rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 px-8 h-12 text-sm font-semibold shadow-lg shadow-black/10 dark:shadow-white/5 transition-all duration-200 group"
            >
              Start for free
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl border-neutral-200 dark:border-neutral-800 bg-transparent hover:bg-neutral-50 dark:hover:bg-neutral-900 px-8 h-12 text-sm font-medium text-neutral-700 dark:text-neutral-300"
            >
              Browse projects
              <ChevronRight size={16} className="ml-1 opacity-50" />
            </Button>
          </div>

          {/* Social proof */}
          <p
            className="mt-6 text-xs text-neutral-400 dark:text-neutral-600 animate-fade-in-up"
            style={{ animationDelay: "320ms" }}
          >
            Trusted by <span className="text-neutral-700 dark:text-neutral-300 font-medium">2,400+</span> developers · No credit card required
          </p>
        </div>

        {/* ── FLOATING PROJECT CARDS GRID ────────── */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto px-6 mt-16 animate-fade-in-up"
          style={{ animationDelay: "380ms" }}
        >
          {/* Terminal-style top bar */}
          <div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-2xl shadow-black/8 dark:shadow-black/40 overflow-hidden">
            {/* Window chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-neutral-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-400 font-mono-custom">
                  <Search size={10} />
                  devdock.io/explore
                </div>
              </div>
              <Code2 size={14} className="text-neutral-400" />
            </div>

            {/* Cards grid */}
            <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-3">
              {projects.map((p, i) => (
                <ProjectCard key={p.name} project={p} delay={i * 60} />
              ))}
            </div>

            {/* Status bar */}
            <div className="flex items-center justify-between px-5 py-2.5 border-t border-neutral-100 dark:border-neutral-900 bg-neutral-50/50 dark:bg-neutral-900/30">
              <span className="font-mono-custom text-[10px] text-neutral-400">
                4 of 2,400+ projects
              </span>
              <span className="flex items-center gap-1.5 font-mono-custom text-[10px] text-neutral-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live · Updated now
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES SECTION ─────────────────────────── */}
      <section className="relative py-28 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />
            <span className="font-mono-custom text-xs text-neutral-400 uppercase tracking-widest">
              Platform
            </span>
            <div className="h-px w-8 bg-neutral-300 dark:bg-neutral-700" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-center tracking-tight mb-3">
            Everything developers need
          </h2>
          <p className="text-center text-neutral-500 dark:text-neutral-400 mb-14 max-w-xl mx-auto font-light">
            From portfolio to community — built to give your work the stage it deserves.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 hover:border-neutral-400 dark:hover:border-neutral-600 transition-all duration-300 hover:shadow-md hover:shadow-black/5 dark:hover:shadow-black/20 bg-white dark:bg-neutral-950"
              >
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center mb-4 text-neutral-700 dark:text-neutral-300 group-hover:bg-black dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-colors duration-200">
                  {f.icon}
                </div>
                <h3 className="font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed font-light">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────── */}
      <section className="border-y border-neutral-100 dark:border-neutral-900 py-12 px-6 bg-neutral-50/50 dark:bg-neutral-900/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { val: "2,400+", label: "Developers" },
            { val: "8,900+", label: "Projects Hosted" },
            { val: "41K+", label: "Community Interactions" },
            { val: "99.9%", label: "Uptime SLA" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold tracking-tight mb-1">{s.val}</div>
              <div className="text-xs text-neutral-400 dark:text-neutral-500 font-mono-custom uppercase tracking-wider">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────── */}
      <section className="relative py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 grid-dots text-neutral-300 dark:text-neutral-700 opacity-20 dark:opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white dark:from-black dark:via-transparent dark:to-black" />
        </div>

        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 px-3 py-1 mb-6 bg-white/80 dark:bg-black/80 backdrop-blur-sm">
            <Zap size={11} className="text-neutral-500" />
            <span className="font-mono-custom text-[11px] text-neutral-500 dark:text-neutral-400">
              Get started in 60 seconds
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Ship. Share.{" "}
            <span className="italic font-light">Stand out.</span>
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 mb-10 max-w-lg mx-auto font-light leading-relaxed">
            Join thousands of developers building their reputation, one project at a time.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              className="rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 px-10 h-12 text-sm font-semibold shadow-xl shadow-black/15 dark:shadow-white/10 group transition-all duration-200"
            >
              Create your dock
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-0.5 transition-transform" />
            </Button>
            <p className="text-xs text-neutral-400 dark:text-neutral-600">
              Free forever · No setup required
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}