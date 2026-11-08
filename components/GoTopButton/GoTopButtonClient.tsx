"use client";

import { FaArrowUp } from "react-icons/fa6";
import styles from "./GoTopButton.module.scss";
import { useEffect, useState } from "react";

type GoTopButtonTranslations = {
  label: string;
};

type Props = {
  translations: GoTopButtonTranslations;
};

export default function GoTopButtonClient({ translations }: Props) {
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {isActive && (
        <button
          className={`${styles.goTopButton}`}
          onClick={handleClick}
          aria-label={translations.label}
        >
          <FaArrowUp />{" "}
          <span className={styles.text}>{translations.label}</span>
        </button>
      )}
    </>
  );
}
