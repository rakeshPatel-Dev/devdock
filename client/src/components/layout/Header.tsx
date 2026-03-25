"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Sun,
  Moon,
  Menu,
  X,
  Code2,
  Zap,
  Globe,
  Star,
  MessageSquare,
  Layers,
  ShieldCheck,
  ChevronRight,
  Bell,
  LogOut,
  Settings,
  User,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: {
    icon: React.ReactNode;
    title: string;
    desc: string;
    href: string;
    badge?: string;
  }[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXPLORE_ITEMS = [
  {
    icon: <Zap size={15} />,
    title: "Trending Projects",
    desc: "Discover what the community is building right now",
    href: "/explore/trending",
    badge: "Hot",
  },
  {
    icon: <Star size={15} />,
    title: "Top Rated",
    desc: "Highest rated demos voted by developers",
    href: "/explore/top",
  },
  {
    icon: <Globe size={15} />,
    title: "Browse All",
    desc: "Filter by tech stack, category, or recency",
    href: "/explore",
  },
  {
    icon: <Sparkles size={15} />,
    title: "New Arrivals",
    desc: "Fresh projects submitted in the last 48 hours",
    href: "/explore/new",
    badge: "New",
  },
];

const COMMUNITY_ITEMS = [
  {
    icon: <MessageSquare size={15} />,
    title: "Discussions",
    desc: "Ask questions, share insights with other devs",
    href: "/community/discussions",
  },
  {
    icon: <Layers size={15} />,
    title: "Showcases",
    desc: "Curated collections from community curators",
    href: "/community/showcases",
  },
  {
    icon: <BookOpen size={15} />,
    title: "Changelog",
    desc: "What's new on DevDock — updates and releases",
    href: "/changelog",
    badge: "v1.2",
  },
  {
    icon: <ShieldCheck size={15} />,
    title: "Guidelines",
    desc: "Community standards for quality projects",
    href: "/community/guidelines",
  },
];

const SIMPLE_NAV: NavItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 shrink-0 group">
      <div className="relative w-7 h-7 rounded-[8px] bg-neutral-900 dark:bg-white flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <svg
          width="15"
          height="15"
          viewBox="0 0 16 16"
          fill="none"
          className="text-white dark:text-black"
        >
          <rect x="2" y="2" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="9" y="2" width="5" height="5" rx="1" fill="currentColor" />
          <rect x="2" y="9" width="5" height="5" rx="1" fill="currentColor" />
          <rect
            x="9"
            y="9"
            width="5"
            height="5"
            rx="1"
            fill="currentColor"
            opacity="0.35"
          />
        </svg>
      </div>
      <span className="font-bold text-[15px] tracking-tight text-neutral-900 dark:text-white">
        DevDock
      </span>
    </a>
  );
}

function NavDropdown({ group }: { group: NavGroup }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="h-8 px-3 text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white bg-transparent hover:bg-neutral-100 dark:hover:bg-neutral-900 data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-900 rounded-lg transition-colors">
        {group.label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-[440px] p-3 grid grid-cols-2 gap-1.5">
          {group.items.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="group flex items-start gap-3 rounded-xl p-3 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-150"
            >
              <div className="mt-0.5 w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0 group-hover:bg-neutral-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black transition-all duration-200">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[13px] font-semibold text-neutral-900 dark:text-white truncate">
                    {item.title}
                  </span>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className="text-[9px] px-1.5 py-0 h-4 border-neutral-300 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-mono shrink-0"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-500 leading-relaxed line-clamp-2">
                  {item.desc}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Footer strip */}
        <div className="border-t border-neutral-100 dark:border-neutral-900 mx-3 mt-1 pt-2.5 pb-2 flex items-center justify-between">
          <span className="text-[11px] text-neutral-400 dark:text-neutral-600 font-mono">
            devdock.io/{group.label.toLowerCase()}
          </span>
          <a
            href={`/${group.label.toLowerCase()}`}
            className="flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors font-medium"
          >
            View all
            <ChevronRight size={10} />
          </a>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function SearchBar() {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center gap-2 h-8 rounded-lg border px-3 transition-all duration-200 cursor-text",
        focused
          ? "w-52 border-neutral-400 dark:border-neutral-600 bg-white dark:bg-neutral-950 shadow-sm"
          : "w-36 border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700"
      )}
      onClick={() => inputRef.current?.focus()}
    >
      <Search size={12} className="text-neutral-400 dark:text-neutral-500 shrink-0" />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search projects…"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="flex-1 min-w-0 bg-transparent text-[12px] text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 outline-none font-['DM_Mono',monospace]"
      />
      {!focused && (
        <kbd className="hidden sm:flex items-center gap-0.5 shrink-0">
          <span className="text-[9px] text-neutral-400 dark:text-neutral-600 font-mono bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-1 py-0.5">
            ⌘K
          </span>
        </kbd>
      )}
    </div>
  );
}

function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-200"
      aria-label="Toggle theme"
    >
      {dark ? <Sun size={13} /> : <Moon size={13} />}
    </button>
  );
}

function NotificationBell() {
  return (
    <button className="relative w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:border-neutral-400 dark:hover:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-200">
      <Bell size={13} />
      <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-neutral-900 dark:bg-white" />
    </button>
  );
}

function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-150 outline-none">
          <Avatar className="w-7 h-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="User" />
            <AvatarFallback className="bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[11px] font-semibold">
              JD
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-[12px] font-semibold text-neutral-900 dark:text-white leading-tight">
              Jamie Dev
            </p>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono leading-tight">
              @jamiedev
            </p>
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-52 rounded-xl border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-xl shadow-black/5 dark:shadow-black/30 p-1"
      >
        <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-900 mb-1">
          <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
            Jamie Dev
          </p>
          <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono mt-0.5">
            jamie@devdock.io
          </p>
        </div>
        <DropdownMenuItem className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-neutral-700 dark:text-neutral-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <User size={13} className="text-neutral-400" />
          My Profile
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-neutral-700 dark:text-neutral-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <Code2 size={13} className="text-neutral-400" />
          My Projects
          <Badge
            variant="outline"
            className="ml-auto text-[9px] px-1.5 py-0 h-4 border-neutral-300 dark:border-neutral-700 text-neutral-500 font-mono"
          >
            12
          </Badge>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-neutral-700 dark:text-neutral-300 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900">
          <Settings size={13} className="text-neutral-400" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-1 border-neutral-100 dark:border-neutral-900" />
        <DropdownMenuItem className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] text-red-500 dark:text-red-400 cursor-pointer hover:bg-red-50 dark:hover:bg-red-950/30">
          <LogOut size={13} />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// ─── Mobile Menu ──────────────────────────────────────────────────────────────

function MobileMenu({
  open,
  onClose,
  isLoggedIn,
}: {
  open: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}) {
  const sections = [
    { label: "Explore", items: EXPLORE_ITEMS },
    { label: "Community", items: COMMUNITY_ITEMS },
  ];

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 flex flex-col bg-white dark:bg-black transition-all duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Mobile nav top */}
      <div className="flex items-center justify-between px-5 h-14 border-b border-neutral-100 dark:border-neutral-900">
        <Logo />
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
        {/* Search */}
        <div className="relative flex items-center gap-2 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 px-3">
          <Search size={13} className="text-neutral-400" />
          <input
            type="text"
            placeholder="Search projects…"
            className="flex-1 bg-transparent text-[13px] text-neutral-700 dark:text-neutral-300 placeholder:text-neutral-400 outline-none font-mono"
          />
        </div>

        {/* Sections */}
        {sections.map((sec) => (
          <div key={sec.label}>
            <p className="text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-mono mb-2 px-1">
              {sec.label}
            </p>
            <div className="space-y-0.5">
              {sec.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-500">
                      {item.desc}
                    </p>
                  </div>
                  {item.badge && (
                    <Badge
                      variant="outline"
                      className="ml-auto text-[9px] border-neutral-300 dark:border-neutral-700 text-neutral-500 font-mono"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Simple links */}
        <div>
          <p className="text-[10px] text-neutral-400 dark:text-neutral-600 uppercase tracking-widest font-mono mb-2 px-1">
            More
          </p>
          {SIMPLE_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-[13px] font-medium text-neutral-700 dark:text-neutral-300"
            >
              {item.label}
              <ChevronRight size={13} className="text-neutral-400" />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile CTA footer */}
      <div className="px-5 py-4 border-t border-neutral-100 dark:border-neutral-900 space-y-2">
        {isLoggedIn ? (
          <Button className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 h-11 text-[13px] font-semibold">
            Upload project
          </Button>
        ) : (
          <>
            <Button className="w-full rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 h-11 text-[13px] font-semibold">
              Start for free
            </Button>
            <Button
              variant="outline"
              className="w-full rounded-xl border-neutral-200 dark:border-neutral-800 h-11 text-[13px] font-medium"
            >
              Sign in
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

interface HeaderProps {
  isLoggedIn?: boolean;
  defaultDark?: boolean;
}

export default function Header({
  isLoggedIn = false,
  defaultDark = false,
}: HeaderProps) {
  const [dark, setDark] = useState(defaultDark);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 h-14 transition-all duration-300",
          scrolled
            ? "bg-white/90 dark:bg-black/90 backdrop-blur-xl border-b border-neutral-200/80 dark:border-neutral-800/80 shadow-sm shadow-black/[0.03] dark:shadow-black/20"
            : "bg-white/60 dark:bg-black/60 backdrop-blur-md border-b border-transparent"
        )}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        <div className="max-w-[1200px] mx-auto h-full px-5 flex items-center gap-4">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center flex-1">
            <NavigationMenu>
              <NavigationMenuList className="gap-0.5">
                <NavDropdown
                  group={{ label: "Explore", items: EXPLORE_ITEMS }}
                />
                <NavDropdown
                  group={{ label: "Community", items: COMMUNITY_ITEMS }}
                />
                {SIMPLE_NAV.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <a
                      href={item.href}
                      className="flex items-center h-8 px-3 rounded-lg text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-150"
                    >
                      {item.label}
                      {item.badge && (
                        <Badge
                          variant="outline"
                          className="ml-1.5 text-[9px] px-1.5 py-0 h-4 border-neutral-300 dark:border-neutral-700 text-neutral-500 font-mono"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </a>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Search — hide on mobile */}
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <ThemeToggle dark={dark} onToggle={() => setDark((d) => !d)} />

            {isLoggedIn ? (
              <>
                <NotificationBell />
                <div className="w-px h-5 bg-neutral-200 dark:bg-neutral-800 mx-0.5" />
                <UserMenu />
                <Button
                  size="sm"
                  className="hidden md:flex rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 h-8 px-4 text-[12px] font-semibold transition-all duration-200"
                >
                  Upload project
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" >
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hidden md:flex h-8 px-3 text-[13px] font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-lg"
                  >
                    Sign in
                  </Button>
                </Link>
                <Button
                  size="sm"
                  className="hidden md:flex rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 h-8 px-4 text-[12px] font-semibold shadow-sm shadow-black/10 dark:shadow-white/5 transition-all duration-200 group"
                >
                  Get started
                  <ChevronRight
                    size={12}
                    className="ml-0.5 opacity-60 group-hover:translate-x-0.5 transition-transform"
                  />
                </Button>
              </>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden w-8 h-8 rounded-lg border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
            >
              <Menu size={14} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isLoggedIn={isLoggedIn}
      />

      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}