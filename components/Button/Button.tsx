import React from "react";
import styles from "./Button.module.scss";
import { FaPaw } from "react-icons/fa6";
import Link from "next/link";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "tertiary"
  | "cta"
  | "outline"
  | "disabled"
  | "link"
  | "hamburger";

type BaseProps = {
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  isActive?: boolean;
  url?: string;
  ariaLabel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type HamburgerButtonProps = BaseProps & {
  variant: "hamburger";
  children?: never;
};

type DefaultButtonProps = BaseProps & {
  variant?: Exclude<ButtonVariant, "hamburger">;
  children: React.ReactNode;
};

type ButtonProps = HamburgerButtonProps | DefaultButtonProps;

export default function Button(props: ButtonProps) {
  //Default props
  const {
    variant = "primary",
    type = "button",
    disabled = false,
    isActive = false,
    className = "",
    ariaLabel = "",
    url,
    onClick,
  } = props;

  if (url) {
    return (
      <Link
        href={url}
        className={`${styles.button} ${styles[variant]} ${className} ${isActive ? styles.active : ""}`}
        aria-label={ariaLabel}
      >
        {props.children}
      </Link>
    );
  } else if (!url) {
    return (
      <button
        type={type}
        disabled={disabled}
        className={`${styles.button} ${styles[variant]} ${className} ${isActive ? styles.active : ""}`}
        onClick={onClick}
        aria-label={ariaLabel}
      >
        {variant === "hamburger" ? <FaPaw /> : props.children}
      </button>
    );
  }
}
