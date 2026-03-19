"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Github,
  Twitter,
  Linkedin,
  ArrowRight,
  Code2,
  Heart,
  ExternalLink,
  Rss,
  CheckCircle2,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
  badge?: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

// ─── Data ──────────────────────────────────────────────────────────────────

const COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { label: "Explore Projects", href: "/explore" },
      { label: "Trending", href: "/explore/trending", badge: "Hot" },
      { label: "New Arrivals", href: "/explore/new" },
      { label: "Top Rated", href: "/explore/top" },
      { label: "Upload Project", href: "/upload" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Discussions", href: "/community/discussions" },
      { label: "Showcases", href: "/community/showcases" },
      { label: "Guidelines", href: "/community/guidelines" },
      { label: "Changelog", href: "/changelog", badge: "v1.2" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Developers",
    links: [
      { label: "API Reference", href: "/docs/api", external: true },
      { label: "Documentation", href: "/docs", external: true },
      { label: "Status Page", href: "/status", external: true },
      { label: "Open Source", href: "https://github.com/devdock", external: true },
      { label: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOCIAL = [
  {
    label: "GitHub",
    href: "https://github.com/devdock",
    icon: <Github size={15} />,
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/devdock",
    icon: <Twitter size={15} />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/devdock",
    icon: <Linkedin size={15} />,
  },
  {
    label: "RSS Feed",
    href: "/rss.xml",
    icon: <Rss size={15} />,
  },
];

const STATS = [
  { val: "2,400+", label: "Developers" },
  { val: "8,900+", label: "Projects" },
  { val: "41K+", label: "Interactions" },
];

// ─── Newsletter ─────────────────────────────────────────────────────────────

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="w-full">
      <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest mb-2">
        Stay in the loop
      </p>
      <h3 className="text-[15px] font-semibold text-neutral-900 dark:text-white mb-1 tracking-tight">
        Dev updates, weekly.
      </h3>
      <p className="text-[12px] text-neutral-500 dark:text-neutral-500 mb-4 font-light leading-relaxed">
        New projects, platform features, and community picks — no spam.
      </p>

      {submitted ? (
        <div className="flex items-center gap-2.5 h-10 px-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <CheckCircle2 size={14} className="text-neutral-600 dark:text-neutral-400" />
          <span className="text-[12px] font-medium text-neutral-700 dark:text-neutral-300">
            You're subscribed — check your inbox.
          </span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-9 rounded-lg text-[12px] border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 font-mono flex-1 min-w-0 focus-visible:ring-1 focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600"
          />
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            className="h-9 px-4 rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 text-[12px] font-semibold shrink-0 transition-all duration-200"
          >
            {loading ? (
              <span className="w-3.5 h-3.5 border-2 border-white/30 dark:border-black/30 border-t-white dark:border-t-black rounded-full animate-spin" />
            ) : (
              <ArrowRight size={13} />
            )}
          </Button>
        </form>
      )}
    </div>
  );
}

// ─── Main Footer ────────────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="border-t border-neutral-100 dark:border-neutral-900 bg-white dark:bg-black"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* ── Top strip — stats ── */}
      <div className="border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-wrap items-center gap-6 justify-between">
          <div className="flex items-center flex-wrap gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <span className="text-[18px] font-bold tracking-tight text-neutral-900 dark:text-white">
                  {s.val}
                </span>
                <span className="text-[11px] text-neutral-400 dark:text-neutral-600 font-mono uppercase tracking-wider">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Status pill */}
          <a
            href="/status"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors group"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
              All systems operational
            </span>
          </a>
        </div>
      </div>

      {/* ── Main footer body ── */}
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 lg:gap-16">

          {/* Left — brand + newsletter */}
          <div className="space-y-8">
            {/* Logo */}
            <div>
              <a href="/" className="inline-flex items-center gap-2.5 group mb-4">
                <div className="w-8 h-8 rounded-[9px] bg-neutral-900 dark:bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white dark:text-black">
                    <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
                    <rect x="9" y="9" width="5" height="5" rx="1" fill="currentColor" opacity="0.35" />
                  </svg>
                </div>
                <span className="font-bold text-[16px] tracking-tight text-neutral-900 dark:text-white">
                  DevDock
                </span>
              </a>
              <p className="text-[13px] text-neutral-500 dark:text-neutral-500 leading-relaxed max-w-[240px] font-light">
                The portfolio platform where developers showcase projects, collect feedback, and get discovered.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-2">
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-600 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-150"
                >
                  {s.icon}
                </a>
              ))}
            </div>

            {/* Newsletter */}
            <Newsletter />
          </div>

          {/* Right — link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.heading}>
                <p className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest mb-4">
                  {col.heading}
                </p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={link.external ? "_blank" : undefined}
                        rel={link.external ? "noopener noreferrer" : undefined}
                        className="group inline-flex items-center gap-1.5 text-[13px] text-neutral-500 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors duration-150 font-light"
                      >
                        {link.label}
                        {link.badge && (
                          <Badge
                            variant="outline"
                            className="text-[9px] px-1.5 py-0 h-4 border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600 font-mono"
                          >
                            {link.badge}
                          </Badge>
                        )}
                        {link.external && (
                          <ExternalLink
                            size={10}
                            className="opacity-0 group-hover:opacity-40 transition-opacity"
                          />
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-neutral-100 dark:border-neutral-900">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
              © {new Date().getFullYear()} DevDock, Inc.
            </span>
            <span className="text-neutral-200 dark:text-neutral-800">·</span>
            <span className="flex items-center gap-1.5 text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
              Built with
              <Heart size={10} className="fill-neutral-400 dark:fill-neutral-600 text-neutral-400 dark:text-neutral-600" />
              for developers
            </span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-1">
            <Code2 size={11} className="text-neutral-300 dark:text-neutral-700" />
            <span className="text-[11px] font-mono text-neutral-300 dark:text-neutral-700">
              v1.2.0
            </span>
            <span className="mx-2 text-neutral-200 dark:text-neutral-800">·</span>
            <a
              href="/privacy"
              className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400 transition-colors"
            >
              Privacy
            </a>
            <span className="mx-2 text-neutral-200 dark:text-neutral-800">·</span>
            <a
              href="/terms"
              className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-400 transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}