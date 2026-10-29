import React, { useEffect, useState } from "react";
import { loginWithEmail, loginWithGoogle } from "../services/auth.services";
import type { ChangeEvent, FormEvent } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { validateForm, type ErrorType } from "../lib/validateForm";
import { FcGoogle } from "react-icons/fc";
import { FieldError } from "../components/FormErrors";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<ErrorType>({});
  const navigate = useNavigate();
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setFormData((p) => ({ ...p, [name]: value.trim() }));
    setError((p) => ({ ...p, [name]: "" }));
  }
  useEffect(() => {
    if (!googleLoading) return;

    const handleFocus = () => {
      // small delay so a successful login can finish and navigate first
      setTimeout(() => setGoogleLoading(false), 1500);
    };

    window.addEventListener("focus", handleFocus, { once: true });
    return () => window.removeEventListener("focus", handleFocus);
  }, [googleLoading]);
  async function handleGoogleLogin() {
    setError({});
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: any) {
      console.dir(err);

      const cancelled =
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/cancelled-popup-request";

      if (!cancelled) {
        setError({ message: "Google sign-in failed. Please try again." });
      } else {
        setError({ message: "Server Error: try again later" });
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError({});
      const { isValid, errors } = validateForm(formData);
      if (!isValid) {
        setError(errors);
        setLoading(false);
        return;
      }
      await loginWithEmail(formData);
      navigate("/");
    } catch (err: any) {
      if (err?.code == "auth/invalid-credential") {
        setError({ message: "Invalid credentials" });
      } else {
        setError({ message: "Server Error: try again later" });
      }
    }
    setLoading(false);
  };

  const handleForgotPassword = () => {
    // TODO: navigate to reset page or call sendPasswordResetEmail
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-4 py-6 font-[Inter,sans-serif] text-charcoal">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-5 flex items-center justify-center gap-2">
          <div className="flex h-9 w-9 ">
            <img src="/logo.png" alt="" />
          </div>
          <span className="font-[Fraunces,serif] text-xl font-semibold text-forest">
            Cook Vise
          </span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h1 className="font-[Fraunces,serif] text-2xl font-semibold text-forest">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted">
            Log in to see your saved recipes.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={handleChange}
                value={formData.email}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-line bg-white px-3.5 py-2 text-sm outline-none transition placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/20"
              />
              <FieldError message={error?.email} />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  onClick={handleForgotPassword}
                  className="text-sm font-medium text-orange-deep hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  value={formData.password}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-line bg-white py-2 pl-3.5 pr-11 text-sm outline-none transition placeholder:text-muted/60 focus:border-forest focus:ring-2 focus:ring-forest/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label="Show or hide password"
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-forest focus-visible:outline-2 focus-visible:outline-forest"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <FieldError message={error?.password} />
            </div>

            <FieldError message={error?.message} />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-4 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-forest-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <FcGoogle size={18} />
            {googleLoading ? "Waiting for Google..." : "Continue with Google"}
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          New to Cook Vise?{" "}
          <Link
            to="/signup"
            className="font-semibold text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
