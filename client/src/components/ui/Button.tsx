import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  isLoading = false,
  className = "",
  disabled,
  ...rest
}: ButtonProps) {
  const baseStyles = "px-5 py-2.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-accent-600 text-white hover:opacity-90",
    outline: "border border-primary-600 text-primary-600 hover:bg-primary-50 dark:hover:bg-white/5",
    ghost: "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading ? "Please wait..." : children}
    </button>
  );
}
