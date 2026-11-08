"use client";

import { login } from "@/actions/auth/login";
import styles from "./LoginForm.module.scss";
import "@/styles/globals.scss";
import Button from "@/components/Button/Button";

type LoginFormProps = {
  emailLabel: string;
  passwordLabel: string;
  loginLabel: string;
  resetFieldsLabel: string;
};

export function LoginForm({
  emailLabel,
  passwordLabel,
  loginLabel,
  resetFieldsLabel,
}: LoginFormProps) {
  return (
    <form action={login} className={styles.form}>
      <div className={styles.inputs}>
        <label htmlFor="email">{emailLabel}</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">{passwordLabel}</label>
        <input id="password" name="password" type="password" required />
      </div>
      <Button variant="primary" ariaLabel={loginLabel} type="submit">
        {loginLabel}
      </Button>
      <Button variant="secondary" ariaLabel={resetFieldsLabel} type="reset">
        {resetFieldsLabel}
      </Button>
    </form>
  );
}
