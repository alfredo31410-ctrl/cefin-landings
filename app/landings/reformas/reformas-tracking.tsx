"use client";

import { useEffect } from "react";
import { initializeMetaPixel } from "@/lib/meta-pixel";

export function ReformasPageViewTracking() {
  useEffect(() => {
    initializeMetaPixel();
  }, []);

  return null;
}
