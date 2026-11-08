"use client";

import { useEffect, useState } from "react";
import breakpoints from "./useBreakpoints";
type Device = "mobile" | "tablet" | "desktop";

function getDevice(): Device {
  if (typeof window === "undefined") {
    return "desktop";
  }

  const width = window.innerWidth;

  if (width <= breakpoints.tablet) {
    return "mobile";
  } else if (width <= breakpoints.desktop) {
    return "tablet";
  } else {
    return "desktop";
  }
}

export function useMediaFormat() {
  const [device, setDevice] = useState<Device>(getDevice());

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      if (width <= breakpoints.tablet) {
        setDevice("mobile");
      } else if (width <= breakpoints.desktop) {
        setDevice("tablet");
      } else if (width >= breakpoints.desktop) {
        setDevice("desktop");
      } else {
        setDevice("mobile");
      }
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, [device]);

  return {
    device,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
