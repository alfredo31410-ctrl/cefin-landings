"use client";

import { useEffect, useRef } from "react";
import { assetUrl } from "./constants";
import styles from "./cefin-experience.module.css";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!video || reduceMotion.matches) return;

    const startPlayback = () => {
      video.muted = true;
      void video.play().catch(() => {
        // The poster remains visible when a browser blocks autoplay.
      });
    };

    startPlayback();
    video.addEventListener("canplay", startPlayback);

    return () => video.removeEventListener("canplay", startPlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      className={styles.heroVideo}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      poster={assetUrl("/cefin-experience/cefin-hero-poster.jpg")}
      aria-hidden="true"
      tabIndex={-1}
    >
      <source
        src={assetUrl("/cefin-experience/cefin-hero-9x16.mp4")}
        type="video/mp4"
        media="(max-width: 767px) and (orientation: portrait)"
      />
      <source
        src={assetUrl("/cefin-experience/cefin-hero-16x9.webm")}
        type="video/webm"
      />
      <source
        src={assetUrl("/cefin-experience/cefin-hero-16x9.mp4")}
        type="video/mp4"
      />
      Tu navegador no puede reproducir este video.
    </video>
  );
}
