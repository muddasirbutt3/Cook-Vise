import { FiAlertCircle } from "react-icons/fi";

// Small message under an input
export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      role="alert"
      className="mt-1.5 flex items-center gap-1.5 text-sm text-danger"
    >
      <FiAlertCircle className="shrink-0" aria-hidden="true" />
      {message}
    </p>
  );
}

// Banner above the submit button (wrong password, network error...)
export function FormError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger-tint px-4 py-3 text-sm text-danger"
    >
      <FiAlertCircle className="mt-0.5 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}

// Input classes that switch to a red border when there's an error
export const inputClass = (hasError?: boolean) =>
  `w-full rounded-lg border bg-white px-3.5 py-2 text-sm outline-none transition placeholder:text-muted/60 focus:ring-2 ${
    hasError
      ? "border-danger focus:border-danger focus:ring-danger/20"
      : "border-line focus:border-forest focus:ring-forest/20"
  }`;
