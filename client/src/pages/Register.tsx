// app/register/page.tsx (or app/register.jsx)
"use client";

import { useState } from "react";
import AuthForm, { RegisterFields } from "@/components/forms/AuthForm";
import axiosInstance from "@/lib/axios";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    username?: string;
    email?: string;
    password?: string;
    general?: string;
  }>({});

  const handleRegister = async (data: RegisterFields) => {
    setIsLoading(true);
    setErrors({});

    try {
      // Using axios with cookie-based authentication
      await axiosInstance.post("/auth/register", {
        name: data.name,
        username: data.username,
        email: data.email,
        bio: data.bio,
        password: data.password,
      });

      // Registration successful
      // The server might automatically log the user in and set cookies
      // or you might need to redirect to login

      setIsSuccess(true);

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login?registered=true");
      }, 1500);

    } catch (error: any) {
      // Handle different error scenarios
      if (error.response) {
        const { status, data } = error.response;

        if (status === 409) {
          // Conflict - user already exists
          if (data.field === "email") {
            setErrors({ email: "Email already registered" });
          } else if (data.field === "username") {
            setErrors({ username: "Username already taken" });
          } else {
            setErrors({ general: data.message || "Account already exists" });
          }
        } else if (status === 422) {
          // Validation errors
          if (data.field === "email") {
            setErrors({ email: data.message });
          } else if (data.field === "username") {
            setErrors({ username: data.message });
          } else if (data.field === "password") {
            setErrors({ password: data.message });
          } else if (data.field === "name") {
            setErrors({ name: data.message });
          } else {
            setErrors({ general: data.message || "Validation failed" });
          }
        } else if (status === 429) {
          setErrors({ general: "Too many attempts. Please try again later." });
        } else {
          setErrors({ general: data.message || "Registration failed. Please try again." });
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
            Create your developer workspace
          </p>
        </div>
        <AuthForm
          defaultMode="register"
          isLoading={isLoading}
          isSuccess={isSuccess}
          onSubmit={handleRegister}
          onResetSuccess={handleResetSuccess}
          externalErrors={errors}
        />
      </div>
    </div>
  );
}