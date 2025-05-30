import type { ReactNode } from "react";
import "./Button.css";

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return <button>{children}</button>;
}
