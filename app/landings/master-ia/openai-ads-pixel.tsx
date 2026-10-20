"use client";

import { useEffect } from "react";
import { initializeOpenAIAdsPixel } from "@/lib/master-ia-openai-ads";

export function OpenAIAdsPixel() {
  useEffect(() => {
    initializeOpenAIAdsPixel();
  }, []);

  return null;
}
