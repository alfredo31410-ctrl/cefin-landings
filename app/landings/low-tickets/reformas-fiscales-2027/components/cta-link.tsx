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
  fallbackChildren?: ReactNode;
  fallbackHref?: string;
  placement: string;
};

export function CtaLink({
  children,
  className = "",
  fallbackChildren,
  fallbackHref = "#oferta",
  placement,
}: CtaLinkProps) {
  const href = productConfig.checkoutUrl ?? fallbackHref;
  const label = productConfig.checkoutUrl
    ? (children ?? productConfig.cta)
    : (fallbackChildren ?? productConfig.fallbackCta);

  const handleClick = () => {
    trackMetaCustomEventImmediate("CTAButtonClick", {
      content_name: productTracking.contentName,
      content_category: productTracking.contentCategory,
      button_name: productConfig.checkoutUrl
        ? productConfig.cta
        : productConfig.fallbackCta,
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
      {label}
    </a>
  );
}
