"use client";

import type { MouseEvent, ReactNode } from "react";

type RegistrationCtaProps = {
  children: ReactNode;
  className: string;
};

export function RegistrationCta({ children, className }: RegistrationCtaProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const registration = document.getElementById("registro");
    if (!registration) return;

    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.history.pushState(null, "", "#registro");
    registration.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
    registration.focus({ preventScroll: true });

    if (!reduceMotion) {
      registration.animate(
        [
          { opacity: 0.88, transform: "scale(0.992)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        {
          duration: 520,
          delay: 320,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        },
      );
    }
  }

  return (
    <a href="#registro" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
