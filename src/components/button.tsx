import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
}

function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-600 text-white border border-blue-600 hover:bg-blue-700 disabled:hover:bg-blue-600",
    secondary:
      "bg-white text-gray-700 border border-gray-400 hover:bg-gray-100 disabled:hover:bg-white",
    danger:
      "bg-red-600 text-white border border-red-600 hover:bg-red-700 disabled:hover:bg-red-600",
  };

  return (
    <button
      className={`
        rounded-md px-3 py-1
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
