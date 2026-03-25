// app/login/page.tsx (or app/login.jsx)
"use client";

import { useState } from "react";
import AuthForm, { LoginFields } from "@/components/forms/AuthForm";
import axiosInstance from "@/lib/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleLogin = async (data: LoginFields) => {
    setIsLoading(true);
    setErrors({});

    try {
      // Using axios with cookie-based authentication
      await axiosInstance.post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      // The authentication cookie is automatically set by the server
      // No need to manually store tokens in localStorage

      setIsSuccess(true);

      // Redirect after showing success state
      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (error: any) {
      // Handle different error scenarios
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          setErrors({ general: "Invalid email or password" });
        } else if (status === 422) {
          // Validation errors from server
          if (data.field === "email") {
            setErrors({ email: data.message });
          } else if (data.field === "password") {
            setErrors({ password: data.message });
          } else {
            setErrors({ general: data.message || "Validation failed" });
          }
        } else if (status === 429) {
          setErrors({ general: "Too many attempts. Please try again later." });
        } else {
          setErrors({ general: data.message || "Login failed. Please try again." });
        }
      } else if (error.request) {
        setErrors({ general: "Network error. Please check your connection." });
      } else {
        setErrors({ general: "An unexpected error occurred." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
            DevDock
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
            Sign in to your workspace
          </p>
        </div>
        <AuthForm
          defaultMode="login"
          isLoading={isLoading}
          isSuccess={isSuccess}
          onSubmit={handleLogin}
          onResetSuccess={handleResetSuccess}
          externalErrors={errors}
        />
      </div>
    </div>
  );
}