// components/auth/auth-form.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Eye,
  EyeOff,
  User,
  AtSign,
  Mail,
  Lock,
  FileText,
  ArrowRight,
  CheckCircle2,
  Github,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ─── Types ─────────────────────────────────────────────────────────────────

export type Mode = "login" | "register";

export interface LoginFields {
  email: string;
  password: string;
}

export interface RegisterFields {
  name: string;
  username: string;
  email: string;
  bio: string;
  password: string;
}

export type FormFields = LoginFields & Partial<Omit<RegisterFields, keyof LoginFields>>;

export interface AuthFormProps {
  defaultMode?: Mode;
  isLoading?: boolean;
  isSuccess?: boolean;
  onSubmit?: (data: FormFields, mode: Mode) => Promise<void> | void;
  onModeChange?: (mode: Mode) => void;
  onResetSuccess?: () => void;
  externalErrors?: {
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    general?: string;
  };
}

// ─── Password strength ─────────────────────────────────────────────────────

function getStrength(password: string): { score: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const map = [
    { label: "Too short", color: "bg-red-400 dark:bg-red-500" },
    { label: "Weak", color: "bg-orange-400 dark:bg-orange-500" },
    { label: "Fair", color: "bg-yellow-400 dark:bg-yellow-500" },
    { label: "Good", color: "bg-emerald-400 dark:bg-emerald-500" },
    { label: "Strong", color: "bg-emerald-500 dark:bg-emerald-400" },
  ];

  return { score, ...map[score] };
}

// ─── Field wrapper ─────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[12px] font-semibold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider font-mono">
        {label}
      </Label>
      {children}
      {error ? (
        <p className="flex items-center gap-1.5 text-[11px] text-red-500 dark:text-red-400 font-mono">
          <AlertCircle size={10} />
          {error}
        </p>
      ) : hint ? (
        <p className="text-[11px] text-neutral-400 dark:text-neutral-600 font-mono">{hint}</p>
      ) : null}
    </div>
  );
}

// ─── Input with icon ───────────────────────────────────────────────────────

function IconInput({
  icon,
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  icon: React.ReactNode;
  error?: boolean;
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 pointer-events-none">
        {icon}
      </span>
      <Input
        className={cn(
          "pl-9 h-10 rounded-xl border text-[13px] font-mono bg-white dark:bg-neutral-950 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-all duration-150",
          error
            ? "border-red-300 dark:border-red-800 focus-visible:ring-red-200 dark:focus-visible:ring-red-900"
            : "border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-200 dark:focus-visible:ring-neutral-800",
          className
        )}
        {...props}
      />
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function AuthForm({
  defaultMode = "login",
  isLoading = false,
  isSuccess = false,
  onSubmit,
  onModeChange,
  onResetSuccess,
  externalErrors = {},
}: AuthFormProps) {
  const [mode, setMode] = useState<Mode>(defaultMode);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");

  const isRegister = mode === "register";

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormFields>({ mode: "onBlur" });

  const watchedPassword = watch("password", "");
  const strength = getStrength(watchedPassword || "");

  // Fake username availability check
  const checkUsername = (val: string) => {
    if (!val || val.length < 3) { setUsernameAvailable(null); return; }
    setCheckingUsername(true);
    setTimeout(() => {
      setUsernameAvailable(!["admin", "devdock", "root", "test"].includes(val.toLowerCase()));
      setCheckingUsername(false);
    }, 600);
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setUsernameAvailable(null);
    setPasswordValue("");
    reset();
    onModeChange?.(m);
  };

  const handleFormSubmit = async (data: FormFields) => {
    if (onSubmit) {
      await onSubmit(data, mode);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────
  if (isSuccess) {
    return (
      <div className="flex flex-col max-w-4xl mx-auto items-center justify-center gap-4 py-10 px-6 text-center animate-fade-in">
        <div className="w-14 h-14 rounded-2xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
          <CheckCircle2 size={24} className="text-neutral-700 dark:text-neutral-300" />
        </div>
        <div>
          <h3 className="font-bold text-lg tracking-tight text-neutral-900 dark:text-white mb-1">
            {isRegister ? "Welcome to DevDock!" : "You're back."}
          </h3>
          <p className="text-[13px] text-neutral-500 dark:text-neutral-500 font-light">
            {isRegister
              ? "Your account is ready. Start showcasing your work."
              : "Redirecting you to your dock…"}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-xl border-neutral-200 dark:border-neutral-800 text-[12px] font-mono mt-2"
          onClick={() => onResetSuccess?.()}
        >
          ← Back to form
        </Button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Mode tabs */}
      <div className="flex rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-1 mb-7">
        {(["login", "register"] as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => switchMode(m)}
            className={cn(
              "flex-1 h-8 rounded-lg text-[12.5px] font-semibold capitalize transition-all duration-200",
              mode === m
                ? "bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white shadow-sm shadow-black/5 dark:shadow-black/20 border border-neutral-200 dark:border-neutral-800"
                : "text-neutral-500 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* General error message */}
      {externalErrors.general && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-[12px] font-mono flex items-center gap-2">
          <AlertCircle size={14} />
          {externalErrors.general}
        </div>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>

        {/* ── Register-only fields ── */}
        {isRegister && (
          <>
            {/* Name */}
            <Field label="Full Name" error={errors.name?.message || externalErrors.name}>
              <IconInput
                icon={<User size={13} />}
                placeholder="Jamie Developer"
                error={!!errors.name || !!externalErrors.name}
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 2, message: "At least 2 characters" },
                })}
              />
            </Field>

            {/* Username */}
            <Field
              label="Username"
              error={errors.username?.message || externalErrors.username}
              hint={
                usernameAvailable === true
                  ? "✓ Username is available"
                  : usernameAvailable === false
                    ? undefined
                    : "This will be your public handle"
              }
            >
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 pointer-events-none">
                  <AtSign size={13} />
                </span>
                <Input
                  placeholder="jamiedev"
                  className={cn(
                    "pl-9 pr-9 h-10 rounded-xl border text-[13px] font-mono bg-white dark:bg-neutral-950 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-all duration-150",
                    errors.username || externalErrors.username
                      ? "border-red-300 dark:border-red-800"
                      : usernameAvailable === true
                        ? "border-emerald-300 dark:border-emerald-800"
                        : usernameAvailable === false
                          ? "border-red-300 dark:border-red-800"
                          : "border-neutral-200 dark:border-neutral-800"
                  )}
                  {...register("username", {
                    required: "Username is required",
                    minLength: { value: 3, message: "At least 3 characters" },
                    maxLength: { value: 20, message: "Max 20 characters" },
                    pattern: {
                      value: /^[a-z0-9_]+$/,
                      message: "Only lowercase letters, numbers, underscores",
                    },
                    onChange: (e) => checkUsername(e.target.value),
                  })}
                />
                {/* Status indicator */}
                <span className="absolute right-3 top-1/2 -translate-y-1/2">
                  {checkingUsername ? (
                    <Loader2 size={12} className="animate-spin text-neutral-400" />
                  ) : usernameAvailable === true ? (
                    <CheckCircle2 size={12} className="text-emerald-500" />
                  ) : usernameAvailable === false ? (
                    <AlertCircle size={12} className="text-red-400" />
                  ) : null}
                </span>
              </div>
              {usernameAvailable === false && !errors.username && !externalErrors.username && (
                <p className="flex items-center gap-1.5 text-[11px] text-red-500 dark:text-red-400 font-mono">
                  <AlertCircle size={10} />
                  Username already taken
                </p>
              )}
              {usernameAvailable === true && !errors.username && !externalErrors.username && (
                <p className="text-[11px] text-emerald-600 dark:text-emerald-500 font-mono">
                  ✓ Username is available
                </p>
              )}
            </Field>
          </>
        )}

        {/* Email */}
        <Field label="Email" error={errors.email?.message || externalErrors.email}>
          <IconInput
            icon={<Mail size={13} />}
            type="email"
            placeholder="you@example.com"
            error={!!errors.email || !!externalErrors.email}
            autoComplete="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
          />
        </Field>

        {/* Bio — register only */}
        {isRegister && (
          <Field
            label="Bio"
            error={errors.bio?.message}
            hint="Tell the community what you build"
          >
            <div className="relative">
              <span className="absolute left-3 top-3 text-neutral-400 dark:text-neutral-600 pointer-events-none">
                <FileText size={13} />
              </span>
              <Textarea
                placeholder="Full-stack dev obsessed with devtools and open source…"
                rows={3}
                className={cn(
                  "pl-9 pt-2.5 rounded-xl border text-[13px] font-mono bg-white dark:bg-neutral-950 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 resize-none transition-all duration-150 leading-relaxed",
                  errors.bio
                    ? "border-red-300 dark:border-red-800"
                    : "border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-200 dark:focus-visible:ring-neutral-800"
                )}
                {...register("bio", {
                  maxLength: { value: 160, message: "Max 160 characters" },
                })}
              />
            </div>
          </Field>
        )}

        {/* Password */}
        <Field
          label="Password"
          error={errors.password?.message || externalErrors.password}
        >
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 pointer-events-none">
              <Lock size={13} />
            </span>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={isRegister ? "Create a strong password" : "Enter your password"}
              autoComplete={isRegister ? "new-password" : "current-password"}
              className={cn(
                "pl-9 pr-10 h-10 rounded-xl border text-[13px] font-mono bg-white dark:bg-neutral-950 placeholder:text-neutral-400 dark:placeholder:text-neutral-600 transition-all duration-150",
                errors.password || externalErrors.password
                  ? "border-red-300 dark:border-red-800"
                  : "border-neutral-200 dark:border-neutral-800 focus-visible:ring-neutral-200 dark:focus-visible:ring-neutral-800"
              )}
              {...register("password", {
                required: "Password is required",
                minLength: isRegister
                  ? { value: 8, message: "At least 8 characters" }
                  : undefined,
                onChange: (e) => setPasswordValue(e.target.value),
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-600 hover:text-neutral-600 dark:hover:text-neutral-400 transition-colors"
            >
              {showPassword ? <EyeOff size={13} /> : <Eye size={13} />}
            </button>
          </div>

          {/* Password strength — register only */}
          {isRegister && watchedPassword && (
            <div className="mt-2 space-y-1.5">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full transition-all duration-300",
                      i < strength.score
                        ? strength.color
                        : "bg-neutral-100 dark:bg-neutral-800"
                    )}
                  />
                ))}
              </div>
              <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600">
                Strength: <span className="text-neutral-600 dark:text-neutral-400">{strength.label}</span>
              </p>
            </div>
          )}
        </Field>

        {/* Forgot password — login only */}
        {!isRegister && (
          <div className="flex justify-end -mt-1">
            <a
              href="/forgot-password"
              className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
            >
              Forgot password?
            </a>
          </div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-neutral-800 dark:hover:bg-neutral-100 text-[13px] font-semibold transition-all duration-200 shadow-sm shadow-black/10 dark:shadow-white/5 group mt-2"
        >
          {isLoading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <>
              {isRegister ? "Create account" : "Sign in"}
              <ArrowRight
                size={14}
                className="ml-2 group-hover:translate-x-0.5 transition-transform"
              />
            </>
          )}
        </Button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-1">
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-600">
            or continue with
          </span>
          <div className="flex-1 h-px bg-neutral-100 dark:bg-neutral-900" />
        </div>

        {/* OAuth */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-10 rounded-xl border-neutral-200 dark:border-neutral-800 text-[13px] font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
        >
          <Github size={15} className="mr-2" />
          GitHub
        </Button>

        {/* Switch mode */}
        <p className="text-center text-[12px] text-neutral-400 dark:text-neutral-600 pt-1">
          {isRegister ? "Already have an account?" : "New to DevDock?"}{" "}
          <button
            type="button"
            onClick={() => switchMode(isRegister ? "login" : "register")}
            className="text-neutral-700 dark:text-neutral-300 font-semibold hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            {isRegister ? "Sign in" : "Create account"}
          </button>
        </p>
      </form>
    </div>
  );
}