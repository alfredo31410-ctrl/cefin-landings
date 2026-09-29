import "server-only";

import type { HotmartOfferKey } from "@/config/hotmart-offers";
import { getHotmartPrice } from "@/lib/hotmart/server";

export async function HotmartPrice({ offer }: { offer: HotmartOfferKey }) {
  const price = await getHotmartPrice(offer);
  return <>{price.formatted}</>;
}
