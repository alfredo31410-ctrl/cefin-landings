"use client";

import { useEffect } from "react";
import styles from "./reformas.module.css";

export function LandingMotion() {
  useEffect(() => {
    const root = document.getElementById("reformas-landing");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    root.classList.add(styles.motionReady);

    const revealElements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    if (reducedMotion.matches) {
      revealElements.forEach((element) => element.classList.add(styles.isVisible));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(styles.isVisible);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    revealElements.forEach((element) => observer.observe(element));

    // The content must never remain hidden if an observer is interrupted by a
    // browser extension, a hot reload, or a constrained embedded preview.
    const revealFallback = window.setTimeout(() => {
      revealElements.forEach((element) => element.classList.add(styles.isVisible));
    }, 900);

    const hero = root.querySelector<HTMLElement>("[data-parallax-hero]");
    let animationFrame = 0;
    const updateParallax = () => {
      animationFrame = 0;
      if (!hero) return;
      const progress = Math.min(Math.max(window.scrollY, 0), 900);
      hero.style.setProperty("--parallax-offset", `${progress}`);
    };
    const onScroll = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.clearTimeout(revealFallback);
      window.removeEventListener("scroll", onScroll);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return null;
}
