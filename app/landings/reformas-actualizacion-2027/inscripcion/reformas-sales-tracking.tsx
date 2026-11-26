"use client";

import { useEffect } from "react";
import { initializeMetaPixel } from "@/lib/meta-pixel";

export function ReformasSalesPageViewTracking() {
  useEffect(() => {
    initializeMetaPixel();
  }, []);

  return null;
}
