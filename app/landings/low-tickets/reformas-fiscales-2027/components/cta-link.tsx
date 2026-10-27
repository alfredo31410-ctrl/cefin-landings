"use client";

import type { ReactNode } from "react";
import {
  trackMetaCustomEventImmediate,
  trackMetaEvent,
} from "@/lib/meta-pixel";
import { productConfig, productTracking } from "../config";
import styles from "../reformas.module.css";

type CtaLinkProps = {
  children?: ReactNode;
  className?: string;
  fallbackHref?: string;
  placement: string;
};

export function CtaLink({
  children,
  className = "",
  fallbackHref = "#oferta",
  placement,
}: CtaLinkProps) {
  const href = productConfig.checkoutUrl ?? fallbackHref;

  const handleClick = () => {
    trackMetaCustomEventImmediate("CTAButtonClick", {
      content_name: productTracking.contentName,
      content_category: productTracking.contentCategory,
      button_name: productConfig.cta,
      placement,
      checkout_ready: Boolean(productConfig.checkoutUrl),
    });

    if (!productConfig.checkoutUrl) return;

    const payload: Record<string, string | number> = {
      content_name: productTracking.contentName,
      content_category: productTracking.contentCategory,
      placement,
    };

    if (productConfig.trackingValue !== null) {
      payload.value = productConfig.trackingValue;
      payload.currency = "MXN";
    }

    trackMetaEvent("InitiateCheckout", payload);
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`${styles.cta} ${className}`}
    >
      {children ?? productConfig.cta}
    </a>
  );
}
