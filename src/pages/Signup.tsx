import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { FiEye, FiUser, FiMail, FiLock, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FieldError, FormError, inputClass } from "../components/FormErrors";
import { Link, useNavigate } from "react-router-dom";
import { loginWithGoogle, signupWithEmail } from "../services/auth.services";
import { validateForm } from "../lib/validateForm";

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
  message?: string;
};

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<FormErrors>({});
  const navigate = useNavigate();
  useEffect(() => {
    if (!googleLoading) return;

    const handleFocus = () => {
      // small delay so a successful login can finish and navigate first
      setTimeout(() => setGoogleLoading(false), 1500);
    };

    window.addEventListener("focus", handleFocus, { once: true });
    return () => window.removeEventListener("focus", handleFocus);
  }, [googleLoading]);
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { value, name, checked } = e.target;
    if (name == "terms") {
      setFormData((p) => ({ ...p, [name]: checked }));
      setError((p) => ({ ...p, [name]: "" }));
      return;
    }

    setFormData((p) => ({ ...p, [name]: value.trim() }));
    setError((p) => ({ ...p, [name]: "" }));
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
      await signupWithEmail(formData);
      navigate("/");
    } catch (err: any) {
      if (err?.code == "auth/email-already-in-use") {
        setError({ message: "Email already exist" });
      } else {
        setError({ message: "Server Error: try again later" });
      }
    } finally {
      setLoading(false);
    }
  };

  async function handleGoogleSignup() {
    setError({});
    setGoogleLoading(true);
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (err: any) {
      const cancelled =
        err?.code === "auth/popup-closed-by-user" ||
        err?.code === "auth/cancelled-popup-request";

      if (!cancelled) {
        setError({ message: "Google sign-in failed. Please try again." });
      }
      setError({ message: "Server Error: try again later" });
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-cream px-4 py-6 font-[Inter,sans-serif] text-charcoal">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-5 flex items-center justify-center gap-2.5">
          <div className="flex h-9 w-9 ">
            <img src="/logo.png" alt="" />
          </div>
          <span className="font-[Fraunces,serif] text-xl font-semibold text-forest">
            Cook Vise
          </span>
        </div>

        <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h1 className="font-[Fraunces,serif] text-2xl font-semibold text-forest">
            Create your account
          </h1>
          <p className="mt-1 text-sm text-muted">
            It takes less than a minute.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Full name */}
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Full name
              </label>
              <div className="relative">
                <FiUser
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  value={formData.name}
                  autoComplete="name"
                  placeholder="Your name"
                  aria-invalid={!!error?.name}
                  className={`${inputClass(!!error?.name)} pl-10`}
                />
              </div>
              <FieldError message={error?.name} />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Email
              </label>
              <div className="relative">
                <FiMail
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
                  aria-hidden="true"
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={handleChange}
                  value={formData.email}
                  autoComplete="email"
                  placeholder="you@example.com"
                  aria-invalid={!!error?.email}
                  className={`${inputClass(!!error?.email)} pl-10`}
                />
              </div>
              <FieldError message={error?.email} />
            </div>

            {/* Password + Confirm: side by side on sm and up */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={formData.password}
                    autoComplete="new-password"
                    placeholder="8+ characters"
                    aria-invalid={!!error?.password}
                    className={`${inputClass(!!error?.password)} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label="Show or hide password"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-forest focus-visible:outline-2 focus-visible:outline-forest"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <FieldError message={error?.password} />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block text-sm font-medium"
                >
                  Confirm
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    autoComplete="new-password"
                    placeholder="Repeat it"
                    aria-invalid={!!error?.confirmPassword}
                    className={`${inputClass(!!error?.confirmPassword)} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    aria-label="Show or hide confirm password"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-forest focus-visible:outline-2 focus-visible:outline-forest"
                  >
                    {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
                <FieldError message={error?.confirmPassword} />
              </div>
            </div>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 text-sm text-muted">
                <input
                  type="checkbox"
                  name="terms"
                  onChange={handleChange}
                  checked={formData?.terms}
                  className="mt-0.5 h-4 w-4 rounded border-line accent-forest"
                />
                <span>
                  I agree to the{" "}
                  <Link
                    to="/terms-conditions"
                    className="font-medium text-forest hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="font-medium text-forest hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
              <FieldError message={error?.terms} />
            </div>

            <FormError message={error?.message} />

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-forest px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <div className="my-4 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-line" />
            or
            <span className="h-px flex-1 bg-line" />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-line bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-forest-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            <FcGoogle size={18} />
            {/* {googleLoading ? "Waiting for Google..." : "Sign up with Google"} */}
            Sign up with Google
          </button>
        </div>

        <p className="mt-4 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-forest hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
